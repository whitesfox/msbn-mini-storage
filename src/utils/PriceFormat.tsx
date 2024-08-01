export function formatPrice(number: number) {
  if (number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return "0";
}
