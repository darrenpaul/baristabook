import { currencies } from "@/constants/currencies";

export function currencyList() {
  return currencies.map((currency) => ({
    value: currency.code,
    label: currency.symbol,
  }));
}

export function formatCurrency(currency: string, value: number) {
  let euro = Intl.NumberFormat("en-DE", {
    style: "currency",
    currency: currency,
    useGrouping: false,
  });

  return euro.format(Number(value));
}
