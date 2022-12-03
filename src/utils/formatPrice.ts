export function formatPrice(value: number): string {
  return Intl.NumberFormat("pt-br", { currency: "BRL", style: "currency" }).format(value);
}