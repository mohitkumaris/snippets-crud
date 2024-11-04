"use server";

import { db } from "@/app/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/*
Creating a new Snippet
*/
export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  // get user data and Validate
  try {
    const title = formData.get("title");
    const code = formData.get("code");

    if (typeof title !== "string" || title.length < 3) {
      return { message: "Title should be 3 charaters long" };
    }
    if (typeof code !== "string" || code.length < 10) {
      return { message: "Code should be 10 charaters long" };
    }

    // save the snippet in DB
    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    } else {
      return {
        message: "Something went wrong...",
      };
    }
  }
  // re render the home page by using revalidatePath
  revalidatePath("/");
  redirect("/");
}
/*
Editing an existing snippet
*/

export async function updateSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });
  redirect(`/snippets/${id}`);
}
/*
Deleting a Snippet 
*/
export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });
  redirect("/");
}
