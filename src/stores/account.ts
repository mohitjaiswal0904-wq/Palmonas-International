import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AccountUser = {
  email: string;
  name: string;
  phone?: string;
  memberSince?: string;
};

type AccountMode = "signin" | "register";

type AccountState = {
  user: AccountUser | null;
  pendingMode: AccountMode;
  setPendingMode: (mode: AccountMode) => void;
  updateProfile: (patch: Partial<Pick<AccountUser, "name" | "phone">>) => void;
  signIn: (email: string, password: string) => { ok: true } | { ok: false; error: string };
  register: (
    name: string,
    email: string,
    password: string,
  ) => { ok: true } | { ok: false; error: string };
  signOut: () => void;
};

/** Known demo credentials for walking the full account UI. */
export const DEMO_ACCOUNT = {
  email: "ava@palmonas.com",
  password: "palmonas",
  profile: {
    email: "ava@palmonas.com",
    name: "Ava Sharma",
    phone: "+1 (212) 555-0148",
    memberSince: "2025-11-14",
  } satisfies AccountUser,
} as const;

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function validateCredentials(email: string, password: string) {
  const normalized = normalizeEmail(email);
  if (!normalized || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return "Enter a valid email address.";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters.";
  }
  return null;
}

function displayNameFromEmail(email: string) {
  const local = email.split("@")[0] ?? "Guest";
  return local
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function profileFor(email: string, name?: string): AccountUser {
  if (email === DEMO_ACCOUNT.email) {
    return { ...DEMO_ACCOUNT.profile };
  }
  return {
    email,
    name: name?.trim() || displayNameFromEmail(email),
    memberSince: new Date().toISOString().slice(0, 10),
  };
}

export const useAccount = create<AccountState>()(
  persist(
    (set, get) => ({
      user: null,
      pendingMode: "signin",
      setPendingMode: (mode) => set({ pendingMode: mode }),
      updateProfile: (patch) => {
        const current = get().user;
        if (!current) return;
        set({
          user: {
            ...current,
            ...patch,
            name: patch.name?.trim() || current.name,
            phone: patch.phone?.trim() || current.phone,
          },
        });
      },
      signIn: (email, password) => {
        const error = validateCredentials(email, password);
        if (error) return { ok: false, error };
        const normalized = normalizeEmail(email);
        if (normalized === DEMO_ACCOUNT.email && password !== DEMO_ACCOUNT.password) {
          return { ok: false, error: "Incorrect password for the demo account." };
        }
        set({
          user: profileFor(normalized),
          pendingMode: "signin",
        });
        return { ok: true };
      },
      register: (name, email, password) => {
        const error = validateCredentials(email, password);
        if (error) return { ok: false, error };
        const trimmedName = name.trim();
        if (trimmedName.length < 2) {
          return { ok: false, error: "Enter your name." };
        }
        const normalized = normalizeEmail(email);
        set({
          user: profileFor(normalized, trimmedName),
          pendingMode: "signin",
        });
        return { ok: true };
      },
      signOut: () => set({ user: null, pendingMode: "signin" }),
    }),
    {
      name: "palmonas-account",
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
