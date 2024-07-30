import * as actions from "@/actions";
import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface SnippetPageProps {
    params: {
        // Param is called id after the folder's name [id]
        id: string;
    };
}

export default async function SnippetPage(props: SnippetPageProps) {
    const snippet = await db.snippet.findFirst({
        where: { id: +props.params.id },
    });

    if (!snippet) {
        return notFound();
    }

    return (
        <div>
            <div className="flex m-4 justify-between items-center">
                <h1 className="text-xl font-bold">{snippet.title}</h1>
                <div className="flex gap-4">
                    <Link
                        className="p-2 border rounded"
                        href={`/snippets/${snippet.id}/edit`}
                    >
                        Edit
                    </Link>
                    <form action={actions.deleteSnippet.bind(null, snippet.id)}>
                        <button className="p-2 border rounded">Delete</button>
                    </form>
                </div>
            </div>
            <pre className="p-3 border rounded bg-gray-200 border-gray-200">
                <code>{snippet.code}</code>
            </pre>
        </div>
    );
}

/**
 * This function is used to cache each of the singular routes
 *
 */
export async function generateStaticParams() {
    const snippets = await db.snippet.findMany();

    return snippets.map((snippet) => ({
        id: String(snippet.id),
    }));
}
