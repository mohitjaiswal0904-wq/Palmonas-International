"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { MapPin, Package, UserRound, Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useAccount, DEMO_ACCOUNT } from "@/stores/account";
import { useUi } from "@/stores/ui";
import { useHydrated } from "@/hooks/useHydrated";
import { cn } from "@/lib/cn";

const NAV: { href: string; label: string; exact?: boolean }[] = [
  { href: "/account", label: "Overview", exact: true },
  { href: "/account/orders", label: "Orders" },
  { href: "/account/addresses", label: "Addresses" },
  { href: "/account/profile", label: "Profile" },
];

export function AccountShell({
  title,
  eyebrow = "Account",
  children,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const hydrated = useHydrated();
  const user = useAccount((s) => s.user);
  const setPendingMode = useAccount((s) => s.setPendingMode);
  const openOverlay = useUi((s) => s.open);

  useEffect(() => {
    if (!hydrated) return;
    if (!user) {
      setPendingMode("signin");
      openOverlay("account");
    }
  }, [hydrated, user, setPendingMode, openOverlay]);

  if (!hydrated) {
    return (
      <Container className="py-16">
        <p className="font-sans text-[0.85rem] text-ink-muted">Loading account…</p>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
        <UserRound size={28} strokeWidth={1.2} className="text-ink-faint" />
        <h1 className="mt-5 font-display text-3xl text-ink">Sign in to continue</h1>
        <p className="mt-3 max-w-[36ch] font-sans text-[0.9rem] text-ink-muted">
          Open your account drawer to sign in. Demo: {DEMO_ACCOUNT.email} / {DEMO_ACCOUNT.password}
        </p>
        <Button
          className="mt-7"
          onClick={() => {
            setPendingMode("signin");
            openOverlay("account");
          }}
        >
          Sign in
        </Button>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="mt-4 font-sans text-[0.78rem] text-ink-muted underline"
        >
          Back to home
        </button>
      </Container>
    );
  }

  return (
    <Container className="w-full max-w-full overflow-x-clip pt-10 pb-24">
      <header className="mb-8 max-w-full sm:mb-10 sm:max-w-[52ch]">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h1 className="break-words font-display text-[1.75rem] leading-none text-ink sm:text-4xl lg:text-5xl">
          {title}
        </h1>
      </header>

      <div className="grid w-full min-w-0 gap-8 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-14">
        <aside className="min-w-0">
          <nav
            aria-label="Account"
            className="scroll-thin -mx-5 flex max-w-[100vw] gap-4 overflow-x-auto overscroll-x-contain border-b border-line px-5 pb-3 sm:-mx-8 sm:px-8 lg:mx-0 lg:max-w-none lg:flex-col lg:gap-0 lg:overflow-visible lg:border-b-0 lg:px-0 lg:pb-0"
          >
            {NAV.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "shrink-0 whitespace-nowrap py-2.5 font-sans text-[0.74rem] uppercase tracking-wide-sm transition-colors sm:text-[0.82rem] lg:border-l-2 lg:pl-4",
                    active
                      ? "text-ink lg:border-ink"
                      : "text-ink-muted hover:text-ink lg:border-transparent",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => openOverlay("wishlist")}
              className="flex shrink-0 items-center gap-2 whitespace-nowrap py-2.5 font-sans text-[0.74rem] uppercase tracking-wide-sm text-ink-muted transition-colors hover:text-ink sm:text-[0.82rem] lg:mt-4 lg:border-l-2 lg:border-transparent lg:pl-4"
            >
              <Heart size={14} strokeWidth={1.4} />
              Wishlist
            </button>
          </nav>

          <div className="mt-8 hidden border-t border-line pt-6 lg:block">
            <p className="break-all font-sans text-[0.78rem] text-ink-muted">{user.email}</p>
            {user.memberSince && (
              <p className="mt-1 font-sans text-[0.72rem] text-ink-faint">
                Member since{" "}
                {new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  year: "numeric",
                }).format(new Date(user.memberSince))}
              </p>
            )}
          </div>
        </aside>

        <div className="min-w-0 w-full max-w-full">{children}</div>
      </div>
    </Container>
  );
}

export function AccountQuickStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 border border-line px-4 py-4 sm:px-5 sm:py-5">
      <div className="flex items-center gap-2 text-ink-muted">
        {icon}
        <p className="eyebrow !mb-0">{label}</p>
      </div>
      <p className="mt-3 font-serif text-2xl text-ink">{value}</p>
    </div>
  );
}

export { MapPin, Package, UserRound };
