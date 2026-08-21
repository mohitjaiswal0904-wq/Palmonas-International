"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Heart, MapPin, Package, UserRound } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useUi } from "@/stores/ui";
import { useAccount, DEMO_ACCOUNT } from "@/stores/account";
import { useHydrated } from "@/hooks/useHydrated";
import { demoOrders } from "@/data";
import { cn } from "@/lib/cn";

type Mode = "signin" | "register";

export function AccountDrawer() {
  const open = useUi((s) => s.overlay === "account");
  const close = useUi((s) => s.close);
  const openOverlay = useUi((s) => s.open);
  const router = useRouter();
  const hydrated = useHydrated();

  const user = useAccount((s) => s.user);
  const pendingMode = useAccount((s) => s.pendingMode);
  const setPendingMode = useAccount((s) => s.setPendingMode);
  const signIn = useAccount((s) => s.signIn);
  const register = useAccount((s) => s.register);
  const signOut = useAccount((s) => s.signOut);

  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) return;
    setMode(pendingMode);
    setError(null);
    setPassword("");
    if (!user) {
      setName(pendingMode === "signin" ? DEMO_ACCOUNT.profile.name : "");
      setEmail(pendingMode === "signin" ? DEMO_ACCOUNT.email : "");
    }
  }, [open, pendingMode, user]);

  function switchMode(next: Mode) {
    setMode(next);
    setPendingMode(next);
    setError(null);
    setPassword("");
  }

  function go(href: string) {
    close();
    router.push(href);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const result =
      mode === "signin" ? signIn(email, password) : register(name, email, password);
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setPassword("");
    close();
    router.push("/account");
  }

  const signedIn = hydrated && !!user;
  const openOrders = demoOrders.filter(
    (o) => o.status === "shipped" || o.status === "processing",
  ).length;

  return (
    <Drawer
      open={open}
      onClose={close}
      title={signedIn ? "Account" : mode === "signin" ? "Sign in" : "Create account"}
    >
      {!hydrated ? null : signedIn ? (
        <div className="flex h-full flex-col">
          <div className="flex-1 px-6 py-8">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-stone text-ink">
                <UserRound size={22} strokeWidth={1.3} />
              </div>
              <div>
                <p className="font-serif text-2xl text-ink">{user!.name}</p>
                <p className="mt-1 font-sans text-[0.85rem] text-ink-muted">{user!.email}</p>
              </div>
            </div>

            <div className="mt-10 space-y-1 border-t border-line pt-4">
              {(
                [
                  {
                    label: "Account overview",
                    href: "/account",
                    icon: UserRound,
                    hint: "Orders, profile & addresses",
                  },
                  {
                    label: "Orders",
                    href: "/account/orders",
                    icon: Package,
                    hint:
                      openOrders > 0
                        ? `${openOrders} in transit · ${demoOrders.length} total`
                        : `${demoOrders.length} orders`,
                  },
                  {
                    label: "Addresses",
                    href: "/account/addresses",
                    icon: MapPin,
                    hint: "Shipping & billing",
                  },
                  {
                    label: "Profile",
                    href: "/account/profile",
                    icon: UserRound,
                    hint: "Name & contact",
                  },
                ] as const
              ).map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => go(item.href)}
                  className="flex w-full items-center gap-3 py-3.5 text-left transition-colors hover:text-accent-deep"
                >
                  <item.icon size={18} strokeWidth={1.3} className="shrink-0 text-ink-muted" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-sans text-[0.95rem] text-ink">{item.label}</span>
                    <span className="mt-0.5 block font-sans text-[0.74rem] text-ink-muted">
                      {item.hint}
                    </span>
                  </span>
                  <ChevronRight size={16} strokeWidth={1.4} className="text-ink-faint" />
                </button>
              ))}

              <button
                type="button"
                onClick={() => openOverlay("wishlist")}
                className="flex w-full items-center gap-3 py-3.5 text-left transition-colors hover:text-accent-deep"
              >
                <Heart size={18} strokeWidth={1.3} className="shrink-0 text-ink-muted" />
                <span className="min-w-0 flex-1">
                  <span className="block font-sans text-[0.95rem] text-ink">Wishlist</span>
                  <span className="mt-0.5 block font-sans text-[0.74rem] text-ink-muted">
                    Saved pieces
                  </span>
                </span>
                <ChevronRight size={16} strokeWidth={1.4} className="text-ink-faint" />
              </button>
            </div>
          </div>

          <div className="border-t border-line bg-surface px-6 py-6 pb-safe-bar">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                signOut();
                setPendingMode("signin");
              }}
            >
              Sign out
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <div className="flex-1 px-6 py-8">
            <p className="font-serif text-2xl text-ink">
              {mode === "signin" ? "Welcome back" : "Join Palmonas"}
            </p>
            <p className="mt-2 max-w-[34ch] font-sans text-[0.85rem] leading-relaxed text-ink-muted">
              {mode === "signin"
                ? "Sign in to review orders, addresses and your profile."
                : "Create an account to save pieces, track orders, and share your wishlist."}
            </p>

            <div className="mt-6 flex gap-6 border-b border-line">
              {(
                [
                  ["signin", "Sign in"],
                  ["register", "Create account"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => switchMode(id)}
                  className={cn(
                    "-mb-px border-b-2 pb-3 font-sans text-[0.74rem] uppercase tracking-wide-sm transition-colors",
                    mode === id
                      ? "border-ink text-ink"
                      : "border-transparent text-ink-muted hover:text-ink",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            <form onSubmit={onSubmit} className="mt-8 space-y-6">
              {mode === "register" && (
                <Input
                  id="account-name"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              )}
              <Input
                id="account-email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
              <Input
                id="account-password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                required
                minLength={6}
              />

              {error && (
                <p className="font-sans text-[0.8rem] text-accent-deep" role="alert">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={busy}>
                {mode === "signin" ? "Sign in" : "Create account"}
              </Button>
            </form>

            <div className="mt-6 border border-line px-4 py-4">
              <p className="eyebrow mb-2">Demo account</p>
              <p className="font-sans text-[0.8rem] text-ink">
                {DEMO_ACCOUNT.email}
                <br />
                Password: {DEMO_ACCOUNT.password}
              </p>
              <button
                type="button"
                className="mt-3 link-underline font-sans text-[0.72rem] uppercase tracking-wide-sm text-ink"
                onClick={() => {
                  setMode("signin");
                  setPendingMode("signin");
                  setEmail(DEMO_ACCOUNT.email);
                  setPassword(DEMO_ACCOUNT.password);
                  setName(DEMO_ACCOUNT.profile.name);
                  setError(null);
                }}
              >
                Fill demo credentials
              </button>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}
