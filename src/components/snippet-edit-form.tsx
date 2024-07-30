"use client";

import { updateSnippet } from "@/actions";
import { Editor } from "@monaco-editor/react";
import type { Snippet } from "@prisma/client";
import { useCallback, useState } from "react";

interface SnippetEditFormProps {
    snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
    const [code, setCode] = useState<string>(snippet.code);

    const handleEditorChanged = useCallback((value: string = "") => {
        console.log(value);
        setCode(value);
    }, []);

    const updateSnippetAction = updateSnippet.bind(null, snippet.id, code);

    return (
        <div>
            <Editor
                defaultLanguage="typescript"
                height="40vh"
                theme="vs-dark"
                defaultValue={code}
                options={{ minimap: { enabled: false } }}
                onChange={handleEditorChanged}
            />
            <form action={updateSnippetAction}>
                <button type="submit" className="p-2 border rounded">
                    Save
                </button>
            </form>
        </div>
    );
}
