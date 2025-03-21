"use client";

import IconButton from "@/components/ui/buttons/IconButton";
import { useRecipes } from "@/context/RecipesContext";
import { useRouter, useSearchParams } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const Pagination = () => {
  const { isModal } = useRecipes();
  const { page, totalPages, setPage } = useRecipes();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    if (isModal) {
      setPage?.(newPage);
    } else {
      const params = new URLSearchParams(searchParams);
      params.set("page", newPage.toString());
      router.push(`/dashboard/recipes?${params.toString()}`);
    }
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="flex items-center justify-center mt-4 space-x-4">
      <IconButton
        onClick={() => handlePageChange(page - 1)}
        variant="invisible"
        disabled={page === 1}
        icon={<IoIosArrowBack />}
      />

      <div className="flex gap-2">
        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`px-3 py-1 rounded-full text-sm ${
              pageNum === page ? "font-bold" : "text-neutral-600"
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>

      <IconButton
        onClick={() => handlePageChange(page + 1)}
        variant="invisible"
        disabled={page === totalPages}
        icon={<IoIosArrowForward />}
      />
    </div>
  );
};

export default Pagination;
