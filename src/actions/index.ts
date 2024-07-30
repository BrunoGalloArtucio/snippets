"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createSnippet(
    formState: { message: string },
    formData: FormData
) {
    const title = formData.get("title");
    const code = formData.get("code");

    if (typeof title !== "string" || title.length < 3) {
        return {
            message: "Title must be longer",
        };
    }

    if (typeof code !== "string" || code.length < 10) {
        return {
            message: "Code must be longer",
        };
    }

    try {
        await db.snippet.create({
            data: {
                code,
                title,
            },
        });
    } catch (error) {
        return {
            message:
                error instanceof Error ? error.message : "Something went wrong",
        };
    }

    revalidatePath("/");
    redirect("/");
}

export async function updateSnippet(id: number, code: string) {
    const snippet = await db.snippet.update({
        where: {
            id,
        },
        data: {
            code,
        },
    });

    revalidatePath(`/snippets/${id}`);
    redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
    await db.snippet.delete({
        where: {
            id,
        },
    });

    revalidatePath("/");
    redirect("/");
}
