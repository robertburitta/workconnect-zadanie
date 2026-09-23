"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductPaginationProps {
  page: number;
  pageCount: number;
  totalProducts: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const ProductPagination = ({
  page,
  pageCount,
  totalProducts,
  onPageChange,
  className,
}: ProductPaginationProps) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <p className="text-xs text-neutral-500">
        Strona {page} z {pageCount} · {totalProducts} produktów
      </p>

      <nav aria-label="Paginacja produktów" className="flex items-center gap-1">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="flex h-8 items-center gap-1 rounded-md px-2 text-sm text-neutral-950 transition-colors hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-50"
        >
          <ChevronLeft className="size-4" />
          Wstecz
        </button>

        {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange(pageNumber)}
            aria-current={pageNumber === page ? "page" : undefined}
            className={cn(
              "flex size-8 items-center justify-center rounded-md text-sm",
              pageNumber === page ? "bg-blue-600 text-white" : "text-neutral-950 hover:bg-neutral-100",
            )}
          >
            {pageNumber}
          </button>
        ))}

        <button
          type="button"
          disabled={page === pageCount}
          onClick={() => onPageChange(page + 1)}
          className="flex h-8 items-center gap-1 rounded-md px-2 text-sm text-neutral-950 transition-colors hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-50"
        >
          Dalej
          <ChevronRight className="size-4" />
        </button>
      </nav>
    </div>
  );
};
