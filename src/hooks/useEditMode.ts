"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

const useEditMode = (recipeId: string | undefined) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const isEditMode = useMemo(() => searchParams.get("edit") === "true", [searchParams]);

    const openEditMode = () => {
        params.set("edit", "true");
        router.replace(
        `/dashboard/recipes/${recipeId}?${params.toString()}`
        );
    };

    const closeEditMode = () => {
        params.delete("edit");
        router.replace(
            `/dashboard/recipes/${recipeId}?${params.toString()}`
        );
    };

  return {isEditMode, openEditMode, closeEditMode};
}

export default useEditMode;