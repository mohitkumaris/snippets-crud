"use client";
import * as actions from "@/actions";
import { useFormState } from "react-dom";

/*
import { useActionState } from "react";



Change the hook name from this:

  const [formState, action] = useFormState(actions.createSnippet, {

to this:

  const [formState, action] = useActionState(actions.createSnippet, 
*/

export default function SnippetCreatePage() {
  const [formState, action] = useFormState(actions.createSnippet, {
    message: "",
  });
  return (
    <div>
      <form action={action}>
        <h3 className="font-bold m-3">Create a Snippet</h3>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <label className="w-12" htmlFor="title">
              {" "}
              Title
            </label>
            <input
              name="title"
              id="title"
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="flex gap-4">
            <label className="w-12" htmlFor="code">
              {" "}
              Code
            </label>
            <textarea
              name="code"
              id="code"
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            {formState.message ? (
              <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
                {formState.message}{" "}
              </div>
            ) : null}
          </div>
          <button type="submit" className="rounded-full p-2 bg-blue-200">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
