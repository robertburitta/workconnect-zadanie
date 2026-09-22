"use client";

import { useState } from "react";
import { INITIAL_PRODUCTS } from "@/lib/mock-products";
import type { ValidatedProduct } from "@/lib/validation/product";
import type { Product } from "@/types/product";
import { ProductDialog } from "./product-form/product-dialog";
import { ProductTable } from "./product-table";
import { toast } from "../ui/toast";

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  function handleProductAdd(values: ValidatedProduct) {
    const product: Product = {
      id: crypto.randomUUID(),
      ...values,
    };

    setProducts((currentProducts) => [...currentProducts, product]);

    toast.add({
      title: "Produkt został dodany",
      type: "success",
    });
  }

  return (
    <main className="mx-auto min-h-screen max-w-310 px-4 py-8 md:px-6 md:py-14">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Produkty</h1>
          <p className="mt-1 text-sm text-neutral-500">
            {products.length} {getProductCountLabel(products.length)} w katalogu
          </p>
        </div>

        <ProductDialog onSubmit={handleProductAdd} />
      </div>

      <ProductTable products={products} />
    </main>
  );
}

function getProductCountLabel(count: number): string {
  if (count === 1) {
    return "produkt";
  }

  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;

  if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) {
    return "produkty";
  }

  return "produktów";
}
