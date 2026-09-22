import { ProductDialog } from "@/components/products/product-form/product-dialog";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-310 px-4 py-14 sm:px-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold">Produkty</h1>
          <p className="mt-1 text-sm text-neutral-500">7 produktów w katalogu</p>
        </div>

        <ProductDialog />
      </div>
    </main>
  );
}
