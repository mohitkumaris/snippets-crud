"use client";

interface ErrorsProps {
  error: Error;
  reset: () => void;
}

export default function ErrorCreateSnippet({ error }: ErrorsProps) {
  return <div>{error.message}</div>;
}
