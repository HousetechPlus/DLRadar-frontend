"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleLogin() {
    setError(null);

    const trimmedEmail = email.trim().toLowerCase();

    // Very simple demo logic:
    const isAdmin =
      trimmedEmail === "admin@dlradar.com" && password === "admin123";

    if (isAdmin) {
      if (typeof window !== "undefined") {
        localStorage.setItem("dlradar_role", "admin");
      }
      router.push("/admin");
      return;
    }

    // Non-admin user
    if (!trimmedEmail || !password) {
      setError("Please enter email and password.");
      return;
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("dlradar_role", "user");
    }
    router.push("/states");
  }

  return (
    <main className="min-h-[calc(100vh-3rem)] bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-10">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Log in to DLRadar
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Access public-record data, filters, and property details. Use the
            demo admin credentials to access the admin dashboard.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Demo admin: <span className="font-mono">admin@dlradar.com</span> /
            <span className="font-mono"> admin123</span>
          </p>
        </div>

        <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-sm">
          <div className="space-y-1">
            <label className="text-xs text-slate-400">Email</label>
            <input
              type="email"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400">Password</label>
            <input
              type="password"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 mt-1">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleLogin}
            className="w-full rounded-full border border-sky-500 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-200 hover:bg-sky-500/20"
          >
            Log in (demo)
          </button>

          <p className="mt-2 text-[11px] text-slate-500">
            In a production system, this would be backed by a real auth provider
            and role-based access control. For now, this demo stores your role
            in <span className="font-mono">localStorage</span>.
          </p>
        </div>
      </div>
    </main>
  );
}
