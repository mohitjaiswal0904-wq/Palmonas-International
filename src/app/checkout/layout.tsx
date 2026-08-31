import { CheckoutUiProvider } from "@/components/checkout/CheckoutUiContext";

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <CheckoutUiProvider>{children}</CheckoutUiProvider>;
}
