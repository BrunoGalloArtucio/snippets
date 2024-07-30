import SnippetEditForm from "@/components/snippet-edit-form";
import { db } from "@/db";
import { notFound, redirect } from "next/navigation";

interface EditSnippetPageProps {
    params: {
        // Param is called id after the folder's name [id]
        id: string;
    };
}

export default async function EditSnippetPage(props: EditSnippetPageProps) {
    const snippet = await db.snippet.findFirst({
        where: { id: +props.params.id },
    });

    if (!snippet) {
        return notFound();
    }

    return (
        <div>
            <SnippetEditForm snippet={snippet} />
        </div>
    );
}
