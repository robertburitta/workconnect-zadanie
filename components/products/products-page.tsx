"use client";

import { Suspense, useState } from "react";
import { INITIAL_PRODUCTS } from "@/lib/mock-products";
import type { ValidatedProduct } from "@/lib/validation/product";
import type { Product } from "@/types/product";
import { ProductDialog } from "./product-form/product-dialog";
import { ProductTable } from "./product-table";
import { toast } from "../ui/toast";
import { getProductCountLabel } from "@/lib/pluralization";

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  const handleProductAdd = (values: ValidatedProduct) => {
    const product: Product = {
      id: crypto.randomUUID(),
      ...values,
    };

    setProducts((currentProducts) => [...currentProducts, product]);

    toast.add({
      title: "Produkt został dodany",
      type: "success",
    });
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-322 px-4 py-6 md:px-6 md:py-12">
      <div className="mb-4 flex items-center justify-between gap-4 md:mb-6">
        <div>
          <h1 className="text-xl font-semibold">Produkty</h1>
          <p className="mt-1 text-sm text-neutral-500">
            {products.length} {getProductCountLabel(products.length)} w katalogu
          </p>
        </div>

        <ProductDialog onSubmit={handleProductAdd} />
      </div>

      <Suspense
        fallback={
          <p role="status" className="text-sm text-neutral-500">
            Ładowanie produktów...
          </p>
        }
      >
        <ProductTable products={products} />
      </Suspense>
    </main>
  );
};
