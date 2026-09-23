"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ProductForm } from "./product-form";
import { ValidatedProduct } from "@/lib/validation/product";

interface ProductDialogProps {
  onSubmit: (product: ValidatedProduct) => void;
}

export function ProductDialog({ onSubmit }: ProductDialogProps) {
  const [open, setOpen] = useState(false);

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
  }

  function handleSubmit(product: ValidatedProduct) {
    onSubmit(product);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button className="h-9 rounded-full bg-blue-600 px-4 text-md font-medium text-white hover:bg-blue-700" />
        }
      >
        <Plus className="size-4" />
        Dodaj produkt
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="flex max-h-[calc(100dvh-32px)] w-180 max-w-[calc(100vw-32px)] flex-col gap-0 overflow-hidden rounded-xl border-neutral-200 bg-white p-0 shadow-xl sm:max-w-none md:max-w-180 max-md:inset-0 max-md:h-dvh max-md:max-h-none max-md:w-screen max-md:max-w-none max-md:translate-x-0 max-md:translate-y-0 max-md:rounded-none max-md:border-0 max-md:ring-0"
      >
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-neutral-200 px-4 max-md:mx-4 max-md:h-14 max-md:px-0">
          <DialogTitle className="text-base font-medium">Dodaj nowy produkt</DialogTitle>

          <DialogClose
            render={
              <button
                type="button"
                className="flex size-4 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100"
                aria-label="Zamknij"
              />
            }
          >
            <X className="size-4" />
          </DialogClose>
        </header>

        <ProductForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
