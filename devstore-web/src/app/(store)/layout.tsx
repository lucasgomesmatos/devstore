import { Header } from "@/components/header";
import { CartProvider } from "@/context/cart-context";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="mx-auto grid min-h-screen w-full max-w-[1400px] grid-rows-app gap-5 p-8">
        <Header />
        {children}
      </div>
    </CartProvider>
  );
}
