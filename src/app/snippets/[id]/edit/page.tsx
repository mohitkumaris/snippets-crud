import EditSnippetForm from "@/app/components/EditSnippetForm";
import { db } from "@/app/db";
import { notFound } from "next/navigation";

interface ShowSnippetProps {
  params: {
    id: string;
  };
}

export default async function ShowEditSnippet(props: ShowSnippetProps) {
  const { id } = await props.params;

  const snippetId = parseInt(id);
  const snippet = await db.snippet.findFirst({
    where: { id: snippetId },
  });

  if (!snippet) {
    return notFound();
  }

  return (
    <div>
      <div>
        <EditSnippetForm snippet={snippet} />
      </div>
    </div>
  );
}
