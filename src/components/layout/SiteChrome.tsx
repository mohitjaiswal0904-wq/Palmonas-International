"use client";

import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";
import { SearchOverlay } from "@/components/navigation/SearchOverlay";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { WishlistDrawer } from "@/components/commerce/WishlistDrawer";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:font-sans focus:text-[0.72rem] focus:uppercase focus:tracking-wide-sm focus:text-surface"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <MobileNav />
      <SearchOverlay />
      <CartDrawer />
      <WishlistDrawer />
    </>
  );
}
