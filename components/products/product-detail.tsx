interface ProductDetailProps {
  label: string;
  value: string;
  emphasized?: boolean;
}

export const ProductDetail = ({ label, value, emphasized = false }: ProductDetailProps) => {
  return (
    <div className="min-w-0">
      <p className="text-xs text-neutral-500">{label}</p>
      <p className={emphasized ? "mt-1 truncate text-sm font-medium" : "mt-1 truncate text-sm"}>{value}</p>
    </div>
  );
};
