"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AccountShell } from "@/components/account/AccountShell";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAccount } from "@/stores/account";
import { formatOrderDate } from "@/data";

export default function AccountProfilePage() {
  const user = useAccount((s) => s.user);
  const updateProfile = useAccount((s) => s.updateProfile);
  const signOut = useAccount((s) => s.signOut);
  const setPendingMode = useAccount((s) => s.setPendingMode);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setPhone(user.phone ?? "");
  }, [user]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    updateProfile({ name, phone });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  }

  return (
    <AccountShell title="Profile">
      <p className="mb-8 font-sans text-[0.9rem] text-ink-muted">
        Update how we address you. Email stays tied to this demo sign-in.
      </p>

      <form onSubmit={onSubmit} className="w-full max-w-md space-y-6">
        <Input
          id="profile-name"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          required
        />
        <Input
          id="profile-email"
          label="Email"
          value={user?.email ?? ""}
          readOnly
          className="opacity-70"
        />
        <Input
          id="profile-phone"
          label="Phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
        />

        {user?.memberSince && (
          <p className="font-sans text-[0.78rem] text-ink-faint">
            Member since {formatOrderDate(user.memberSince)}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Button type="submit">Save changes</Button>
          {saved && (
            <p className="font-sans text-[0.8rem] text-ink-muted" role="status">
              Saved
            </p>
          )}
        </div>
      </form>

      <div className="mt-14 border-t border-line pt-10">
        <p className="eyebrow mb-3">Session</p>
        <p className="mb-5 max-w-[40ch] font-sans text-[0.85rem] text-ink-muted">
          Sign out clears this device session. Demo orders and addresses remain available next
          time you sign in as Ava.
        </p>
        <Button
          variant="outline"
          type="button"
          onClick={() => {
            signOut();
            setPendingMode("signin");
          }}
        >
          Sign out
        </Button>
      </div>
    </AccountShell>
  );
}
