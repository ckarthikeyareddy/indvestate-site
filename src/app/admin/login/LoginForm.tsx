"use client";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button, TextField } from "@/components/ds";

const MESSAGES: Record<string, string> = {
  "wrong-password": "That is not the password.",
  "rate-limited": "Too many attempts. Wait a minute.",
  "not-configured": "ADMIN_PASSWORD is not set on this deployment.",
};

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Required.");
      return;
    }
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password }) });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(MESSAGES[data.error ?? ""] ?? "Could not sign in.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Could not sign in.");
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="adm__panel adm__login" onSubmit={submit} noValidate>
      <div className="adm__head">
        <span className="iv-label signal">Admin</span>
        <h1 className="iv-h3" style={{ margin: 0 }}>
          Sign in
        </h1>
      </div>
      <TextField
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={error ?? undefined}
        required
      />
      <Button type="submit" block size="lg" disabled={pending}>
        {pending ? "Signing in" : "Sign in"}
      </Button>
    </form>
  );
}
