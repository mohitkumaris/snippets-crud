"use client";

import type { Snippet } from "@prisma/client";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import * as actions from "@/actions";

interface SnippetCode {
  snippet: Snippet;
}

export default function EditSnippetForm({ snippet }: SnippetCode) {
  const [code, setCode] = useState<string>(snippet.code);
  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };
  const updateSnippetAction = actions.updateSnippet.bind(
    null,
    snippet.id,
    code
  );
  return (
    <div>
      Title: {snippet.title}
      <Editor
        height="40vh"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue={snippet.code}
        onChange={handleEditorChange}
      />
      <form action={updateSnippetAction}>
        <button type="submit" className="rounded-full p-2 bg-blue-200">
          Update
        </button>
      </form>
    </div>
  );
}
