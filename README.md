# WorkConnect - katalog produktów

Zadanie rekrutacyjne: responsywna lista produktów i trzyetapowy formularz dodawania produktu w dialogu, zgodnie z przesłanymi materiałami.

Repozytorium: [robertburitta/workconnect-zadanie](https://github.com/robertburitta/workconnect-zadanie)

Demo online: [workconnect-zadanie.vercel.app](https://workconnect-zadanie.vercel.app).

## Uruchomienie

```bash
npm run dev
```

Aplikacja jest dostępna pod `http://localhost:3000`. Nie wymaga zmiennych środowiskowych ani backendu.

## Technologie i struktura

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn/ui oparty na Base UI, TanStack Form, Zod 4 i nuqs 2. Dokładne wersje znajdują się w `package-lock.json`.

- `app/` — strona, layout, fonty i style globalne.
- `components/products/` — lista, paginacja, dialog i kroki formularza.
- `components/ui/` — komponenty shadcn/Base UI dostosowane do projektu.
- `hooks/use-product-form.ts` — jedna instancja TanStack Form dla całego formularza.
- `lib/` — dane przykładowe, opcje, wartości domyślne, obliczenia cen i schematy Zod.
- `types/` — typy produktu i tymczasowych wartości formularza.
