import { notFound } from "next/navigation";
import { db } from "@/app/db";
import Link from "next/link";
import * as actions from "@/actions";

interface ShowSnippetProps {
  params: {
    id: string;
  };
}

export default async function SnippetShowPage(props: ShowSnippetProps) {
  await new Promise((r) => setTimeout(r, 2000));
  const { id } = props.params;
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id) },
  });

  if (!snippet) {
    return notFound();
  }
  const deleteSnippetAction = actions.deleteSnippet.bind(null, parseInt(id));
  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded">
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button type="submit" className="p-2 border rounded">
              Delete
            </button>
          </form>
        </div>
      </div>
      <div>
        <pre className="p-3 border rounded bg-gray-200 border-gray-200">
          <code>{snippet?.code}</code>
        </pre>
      </div>
    </div>
  );
}
