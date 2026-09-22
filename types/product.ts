export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  manufacturer: string;
  category: string;
  features: string[];
  netPrice: number;
  grossPrice: number;
  vat: number;
  currency: string;
  available: boolean;
  limited: boolean;
  stock: number | null;
  minQuantity: number;
  maxQuantity: number;
}

export interface ProductFormValues {
  name: string;
  sku: string;
  description: string;
  manufacturer: string;
  category: string;
  features: string[];
  netPrice: number | null;
  grossPrice: number | null;
  vat: number;
  currency: string;
  available: boolean;
  limited: boolean;
  stock: number | null;
  minQuantity: number;
  maxQuantity: number;
}
