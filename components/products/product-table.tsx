"use client";

import { useEffect } from "react";
import { parseAsInteger, useQueryState } from "nuqs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Product } from "@/types/product";
import { ProductPagination } from "./product-pagination";
import { formatPrice } from "@/lib/price";

interface ProductTableProps {
  products: Product[];
}

const PAGE_SIZE = 5;

export function ProductTable({ products }: ProductTableProps) {
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({
      clearOnDefault: false,
      history: "push",
    }),
  );

  const pageCount = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(page, 1), pageCount);

  useEffect(() => {
    if (page !== currentPage) {
      void setPage(currentPage, {
        history: "replace",
      });
    }
  }, [currentPage, page, setPage]);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageProducts = products.slice(startIndex, startIndex + PAGE_SIZE);

  function handlePageChange(nextPage: number) {
    if (nextPage < 1 || nextPage > pageCount) {
      return;
    }

    void setPage(nextPage);
  }

  return (
    <>
      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm md:block">
        <Table className="table-fixed" aria-label="Produkty w katalogu">
          <colgroup>
            <col className="w-[28.75%]" />
            <col className="w-[14.25%]" span={5} />
          </colgroup>
          <TableHeader>
            <TableRow className="bg-neutral-50 [&>th]:font-normal [&>th]:text-neutral-500">
              <TableHead className="px-4">Nazwa</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Kategoria</TableHead>
              <TableHead>Cena Brutto</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pr-4">Magazyn</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {pageProducts.map((product) => (
              <TableRow key={product.id} className="h-12">
                <TableCell className="truncate px-4 font-medium" title={product.name}>
                  {product.name}
                </TableCell>
                <TableCell className="truncate text-xs text-neutral-500" title={product.sku}>
                  {product.sku}
                </TableCell>
                <TableCell className="truncate text-neutral-500">{product.category}</TableCell>
                <TableCell className="font-medium">{formatPrice(product.grossPrice, product.currency)}</TableCell>
                <TableCell>
                  <AvailabilityBadge available={product.available} />
                </TableCell>
                <TableCell className="pr-4">{product.limited ? product.stock : "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="border-t border-neutral-200 bg-neutral-50 px-4 py-4">
          <ProductPagination
            page={currentPage}
            pageCount={pageCount}
            totalProducts={products.length}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="space-y-2">
          {pageProducts.map((product) => (
            <article key={product.id} className="rounded-xl border border-neutral-200 bg-white p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="truncate text-base font-medium">{product.name}</h2>
                  <p className="mt-1 text-xs text-neutral-500">{product.sku}</p>
                </div>

                <AvailabilityBadge available={product.available} />
              </div>

              <div className="mt-2 grid grid-cols-3 gap-2 rounded-lg bg-neutral-100 p-3">
                <ProductDetail label="Kategoria" value={product.category} />
                <ProductDetail
                  label="Cena brutto"
                  value={formatPrice(product.grossPrice, product.currency)}
                  emphasized
                />
                <ProductDetail label="Magazyn" value={product.limited ? String(product.stock) : "—"} />
              </div>
            </article>
          ))}
        </div>

        <ProductPagination
          page={currentPage}
          pageCount={pageCount}
          totalProducts={products.length}
          onPageChange={handlePageChange}
          className="mt-6 flex-col gap-4 [&>nav]:justify-center"
        />
      </div>
    </>
  );
}

interface AvailabilityBadgeProps {
  available: boolean;
}

function AvailabilityBadge({ available }: AvailabilityBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={
        available
          ? "border-0 bg-green-600/10 font-normal text-green-600"
          : "border-0 bg-red-600/10 font-normal text-red-600"
      }
    >
      {available ? "Dostępny" : "Niedostępny"}
    </Badge>
  );
}

interface ProductDetailProps {
  label: string;
  value: string;
  emphasized?: boolean;
}

function ProductDetail({ label, value, emphasized = false }: ProductDetailProps) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-neutral-500">{label}</p>
      <p className={emphasized ? "mt-1 truncate text-sm font-medium" : "mt-1 truncate text-sm"}>{value}</p>
    </div>
  );
}
