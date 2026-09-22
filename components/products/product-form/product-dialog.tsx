"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ProductForm } from "./product-form";

export function ProductDialog() {
  const [open, setOpen] = useState(false);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button className="h-9 rounded-full bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700" />
        }
      >
        <Plus className="size-4" />
        Dodaj produkt
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="flex max-h-[calc(100vh-32px)] w-180 max-w-[calc(100vw-32px)] flex-col gap-0 overflow-hidden rounded-2xl border-neutral-200 bg-white p-0 shadow-xl max-sm:inset-0 max-sm:h-dvh max-sm:max-h-none max-sm:w-screen max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-none max-sm:border-0"
      >
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-neutral-200 px-4">
          <DialogTitle className="text-base font-medium">Dodaj nowy produkt</DialogTitle>

          <DialogClose
            render={
              <button
                type="button"
                className="flex size-8 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100"
                aria-label="Zamknij"
              />
            }
          >
            <X className="size-4" />
          </DialogClose>
        </header>

        <ProductForm onCancel={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
