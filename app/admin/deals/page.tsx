"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type DealProperty = {
  id: string;
  address: string;
  city: string;
  state_abbr: string;
  zip: string;
  county_name: string;
  dlradar_status: string;
  has_tax_lien?: boolean;
  foreclosure_stage?: string | null;
  valuation?: {
    market_value_estimate?: number;
    bank_appraisal_estimate?: number;
  };
  tax_lien_dd?: {
    total_delinquent_amount?: number;
    lien_burden_score?: number;
  };
  foreclosure_dd?: {
    overall_score?: number;
  };
};

export default function AdminDealsPage() {
  const router = useRouter();
  const [roleChecked, setRoleChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [deals, setDeals] = useState<DealProperty[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Simple role check (same model as /admin)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedRole = localStorage.getItem("dlradar_role");
    if (storedRole === "admin") {
      setIsAdmin(true);
    } else {
      router.push("/login");
    }
    setRoleChecked(true);
  }, [router]);

  // Fetch deals from API
  useEffect(() => {
    if (!isAdmin) return;

    let cancelled = false;

    async function loadDeals() {
      try {
        const res = await fetch("/api/properties-demo");
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = (await res.json()) as DealProperty[];
        if (!cancelled) {
          // Sort by foreclosure overall score desc, then lien burden, then market value
          const sorted = [...data].sort((a, b) => {
            const aScore = a.foreclosure_dd?.overall_score ?? 0;
            const bScore = b.foreclosure_dd?.overall_score ?? 0;
            return bScore - aScore;
          });
          setDeals(sorted);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err?.message ?? "Failed to load deals");
        }
      }
    }

    loadDeals();

    return () => {
      cancelled = true;
    };
  }, [isAdmin]);

  if (!roleChecked) {
    return (
      <main className="min-h-[calc(100vh-3rem)] bg-slate-950 text-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <h1 className="text-xl font-semibold mb-3">Admin Deals</h1>
          <p className="text-sm text-slate-300">Checking admin access…</p>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-[calc(100vh-3rem)] bg-slate-950 text-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <h1 className="text-xl font-semibold mb-3">Admin Deals</h1>
          <p className="text-sm text-red-400">
            Access denied. Admin role required. Please log in as admin.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-3rem)] bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">DLRadar Deals Dashboard</h1>
            <p className="mt-2 text-sm text-slate-300">
              Admin view of current demo properties, ranked by foreclosure
              score. This simulates how DLRadar can surface the best opportunities.
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 hover:bg-slate-800"
          >
            Back to Admin
          </button>
        </header>

        {error && (
          <p className="text-sm text-red-400">
            Error loading deals: {error}
          </p>
        )}

        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-xs sm:text-sm">
          {deals.length === 0 ? (
            <p className="text-slate-400">No deals found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] uppercase tracking-wide text-slate-400">
                    <th className="py-2 pr-3">Property</th>
                    <th className="py-2 pr-3">County</th>
                    <th className="py-2 pr-3">Status</th>
                    <th className="py-2 pr-3">Foreclosure</th>
                    <th className="py-2 pr-3">DLR Foreclosure Score</th>
                    <th className="py-2 pr-3">Tax Lien</th>
                    <th className="py-2 pr-3">DLR Lien Score</th>
                    <th className="py-2 pr-3">Market Value</th>
                    <th className="py-2 pr-3">Bank Est.</th>
                    <th className="py-2 pr-3">View</th>
                  </tr>
                </thead>
                <tbody>
                  {deals.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-slate-900/80 hover:bg-slate-900"
                    >
                      <td className="py-2 pr-3">
                        <div className="font-medium text-slate-100">
                          {p.address}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {p.city}, {p.state_abbr} {p.zip}
                        </div>
                      </td>
                      <td className="py-2 pr-3 text-slate-300">
                        {p.county_name}
                      </td>
                      <td className="py-2 pr-3">
                        <span className="rounded-full border border-slate-700 px-2 py-1 text-[11px] text-slate-200">
                          {p.dlradar_status}
                        </span>
                      </td>
                      <td className="py-2 pr-3 text-slate-300">
                        {p.foreclosure_stage && p.foreclosure_stage !== "none"
                          ? p.foreclosure_stage
                          : "None"}
                      </td>
                      <td className="py-2 pr-3 text-emerald-200 font-semibold">
                        {p.foreclosure_dd?.overall_score ?? "—"}/100
                      </td>
                      <td className="py-2 pr-3 text-slate-300">
                        {p.tax_lien_dd?.total_delinquent_amount
                          ? `$${p.tax_lien_dd.total_delinquent_amount.toLocaleString()}`
                          : "None"}
                      </td>
                      <td className="py-2 pr-3 text-amber-200 font-semibold">
                        {p.tax_lien_dd?.lien_burden_score ?? "—"}/100
                      </td>
                      <td className="py-2 pr-3 text-slate-200">
                        {p.valuation?.market_value_estimate
                          ? `$${p.valuation.market_value_estimate.toLocaleString()}`
                          : "—"}
                      </td>
                      <td className="py-2 pr-3 text-slate-200">
                        {p.valuation?.bank_appraisal_estimate
                          ? `$${p.valuation.bank_appraisal_estimate.toLocaleString()}`
                          : "—"}
                      </td>
                      <td className="py-2 pr-3">
                        <button
                          type="button"
                          onClick={() => router.push("/example/property")}
                          className="rounded-full border border-sky-500 px-2 py-1 text-[11px] text-sky-200 hover:bg-sky-500/10"
                        >
                          Open
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
