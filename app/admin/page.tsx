"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedRole = localStorage.getItem("dlradar_role");
    setRole(storedRole);
    setChecked(true);

    if (!storedRole || storedRole !== "admin") {
      // Not an admin: redirect to login
      router.push("/login");
    }
  }, [router]);

  if (!checked) {
    // Still checking role
    return (
      <main className="min-h-[calc(100vh-3rem)] bg-slate-950 text-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <h1 className="text-xl font-semibold mb-3">Admin</h1>
          <p className="text-sm text-slate-300">Checking access…</p>
        </div>
      </main>
    );
  }

  if (role !== "admin") {
    // Brief fallback in case redirect doesn't fire quickly
    return (
      <main className="min-h-[calc(100vh-3rem)] bg-slate-950 text-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <h1 className="text-xl font-semibold mb-3">Admin</h1>
          <p className="text-sm text-red-400">
            Access denied. Admin role required. Please log in as admin.
          </p>
        </div>
      </main>
    );
  }

  // Admin dashboard content
  return (
    <main className="min-h-[calc(100vh-3rem)] bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">
        <header>
          <h1 className="text-2xl font-semibold">DLRadar Admin Dashboard</h1>
          <p className="mt-2 text-sm text-slate-300">
            You are logged in as <span className="font-mono">admin</span>. From
            here you can inspect system state, example data, deals, and future
            scraper / risk controls.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3 text-sm">
          {/* Example property data */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Example Data
            </h2>
            <p className="mt-2 text-slate-300">
              View example properties and raw JSON outputs coming from the
              DLRadar backend spec and scripts.
            </p>
            <a
              href="/example/property"
              className="mt-3 inline-flex text-xs text-sky-300 underline"
            >
              Open example property
            </a>
          </div>

          {/* FL coverage */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              FL Coverage
            </h2>
            <p className="mt-2 text-slate-300">
              Inspect current Florida coverage based on your{" "}
              <span className="font-mono">fl_public_records_sources.csv</span>{" "}
              and inspector scripts.
            </p>
            <a
              href="/fl/dashboard"
              className="mt-3 inline-flex text-xs text-sky-300 underline"
            >
              Open FL coverage snapshot
            </a>
          </div>

          {/* Demo logout */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Logout (demo)
            </h2>
            <p className="mt-2 text-slate-300">
              Clear admin role and return to public login state.
            </p>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  localStorage.removeItem("dlradar_role");
                }
                router.push("/login");
              }}
              className="mt-3 inline-flex rounded-full border border-slate-600 px-3 py-1 text-xs text-slate-200 hover:bg-slate-800"
            >
              Log out
            </button>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3 text-sm">
          {/* Deals dashboard */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Deals Dashboard
            </h2>
            <p className="mt-2 text-slate-300">
              View the current demo properties ranked by DLRadar foreclosure and
              tax lien scores, similar to an institutional deal screen.
            </p>
            <a
              href="/admin/deals"
              className="mt-3 inline-flex text-xs text-sky-300 underline"
            >
              Open deals dashboard
            </a>
          </div>

          {/* User-flow explorer */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Browse Flow
            </h2>
            <p className="mt-2 text-slate-300">
              Jump into the user-facing flow starting from state selection to
              see what regular users experience.
            </p>
            <a
              href="/states"
              className="mt-3 inline-flex text-xs text-sky-300 underline"
            >
              Go to state selection
            </a>
          </div>

          {/* Placeholder for future scraper / risk controls */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Scraper & Risk Controls
            </h2>
            <p className="mt-2 text-slate-300">
              This area can later host controls for scraper health, task
              triggers, and tuning DLRadar risk weights (valuation, tax liens,
              foreclosure, market risk, etc.).
            </p>
            <span className="mt-3 inline-flex text-[11px] text-slate-500">
              Coming soon
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
