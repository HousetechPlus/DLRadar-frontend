"use client";

import { useEffect, useState } from "react";

type ExampleProperty = {
  id: string;
  country: string;
  state_abbr: string;
  county_name: string;
  county_fips?: string;
  city: string;
  zip: string;
  full_address: string;
  latitude?: number | null;
  longitude?: number | null;
  property_type?: string;
  beds?: number | null;
  baths?: number | null;
  sq_ft?: number | null;
  lot_size_sq_ft?: number | null;
  year_built?: number | null;
  zoning?: string | null;
  occupancy_status?: string | null;
  owner_name?: string | null;
  owner_mailing_address?: string | null;
  owner_mailing_city?: string | null;
  owner_mailing_state?: string | null;
  owner_mailing_zip?: string | null;
  contact_unlock_price_usd?: number | null;
  assessed_value?: number | null;
  assessed_value_year?: number | null;
  last_sale_date?: string | null;
  last_sale_price?: number | null;
  has_tax_lien?: boolean;
  tax_lien_details?: string | null;
  has_code_violation?: boolean;
  code_violation_details?: string | null;
  foreclosure_stage?: string | null;
  foreclosure_case_number?: string | null;
  foreclosure_record_url?: string | null;
  delinquent_taxes_amount?: number | null;
  delinquent_taxes_years?: string | null;
  dlradar_status: string;
  quarantine_start_at?: string | null;
  quarantine_end_at?: string | null;
  locked_by_member_id?: string | null;
  locked_at?: string | null;
  source_id: string;
  source_record_id: string;
  source_url?: string | null;
  source_last_checked_at: string;
  source_status: string;
  map_snapshot_url?: string | null;
  photo_urls?: string[];
  short_description?: string | null;
  tags?: string[];
  created_at: string;
  updated_at: string;
};

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">
      {children}
    </span>
  );
}

export default function ExamplePropertyPage() {
  const [property, setProperty] = useState<ExampleProperty | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/example-property");
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = (await res.json()) as ExampleProperty;
        if (!cancelled) {
          setProperty(data);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err?.message ?? "Failed to load property");
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <h1 className="text-xl font-semibold mb-3">Example Property</h1>
          <p className="text-sm text-red-400">
            Error loading property data: {error}
          </p>
        </div>
      </main>
    );
  }

  if (!property) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <h1 className="text-xl font-semibold mb-3">Example Property</h1>
          <p className="text-sm text-slate-300">Loading property data…</p>
        </div>
      </main>
    );
  }

  const p = property;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">{p.full_address}</h1>
            <p className="text-sm text-slate-300">
              {p.city}, {p.state_abbr} {p.zip} · {p.county_name}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {p.property_type && <Badge>{p.property_type}</Badge>}
            <Badge>Status: {p.dlradar_status}</Badge>
            {p.has_tax_lien && <Badge>Tax Lien</Badge>}
            {p.foreclosure_stage &&
              p.foreclosure_stage !== "none" &&
              p.foreclosure_stage !== "" && (
                <Badge>Foreclosure: {p.foreclosure_stage}</Badge>
              )}
          </div>
        </div>

        {/* Top grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Left: property summary */}
          <section className="md:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Property Overview
            </h2>
            <div className="grid gap-4 sm:grid-cols-3 text-sm">
              <div>
                <div className="text-slate-400">Beds / Baths</div>
                <div className="font-medium">
                  {p.beds ?? "–"} / {p.baths ?? "–"}
                </div>
              </div>
              <div>
                <div className="text-slate-400">Living Area</div>
                <div className="font-medium">
                  {p.sq_ft ? `${p.sq_ft.toLocaleString()} sq ft` : "–"}
                </div>
              </div>
              <div>
                <div className="text-slate-400">Lot Size</div>
                <div className="font-medium">
                  {p.lot_size_sq_ft
                    ? `${p.lot_size_sq_ft.toLocaleString()} sq ft`
                    : "–"}
                </div>
              </div>
              <div>
                <div className="text-slate-400">Year Built</div>
                <div className="font-medium">{p.year_built ?? "–"}</div>
              </div>
              <div>
                <div className="text-slate-400">Zoning</div>
                <div className="font-medium">{p.zoning ?? "–"}</div>
              </div>
              <div>
                <div className="text-slate-400">Occupancy</div>
                <div className="font-medium capitalize">
                  {p.occupancy_status ?? "unknown"}
                </div>
              </div>
            </div>
          </section>

          {/* Right: valuation */}
          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Valuation & Taxes
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Assessed Value</span>
                <span className="font-semibold">
                  {p.assessed_value
                    ? `$${p.assessed_value.toLocaleString()}`
                    : "–"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Last Sale</span>
                <span className="text-right">
                  {p.last_sale_price
                    ? `$${p.last_sale_price.toLocaleString()}`
                    : "–"}
                  <br />
                  <span className="text-xs text-slate-400">
                    {p.last_sale_date ?? ""}
                  </span>
                </span>
              </div>
              <div className="border-t border-slate-800 pt-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Delinquent Taxes</span>
                  <span className="font-semibold">
                    {p.delinquent_taxes_amount
                      ? `$${p.delinquent_taxes_amount.toLocaleString()}`
                      : "None"}
                  </span>
                </div>
                {p.delinquent_taxes_years && (
                  <div className="mt-1 text-xs text-slate-400">
                    Years: {p.delinquent_taxes_years}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Risk section */}
        <section className="mt-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-yellow-300">
            Distress Signals
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <span className="font-medium">Tax Lien: </span>
              {p.has_tax_lien
                ? p.tax_lien_details ?? "Yes (details unavailable)"
                : "No tax lien detected"}
            </li>
            <li>
              <span className="font-medium">Foreclosure Stage: </span>
              {p.foreclosure_stage && p.foreclosure_stage !== "none"
                ? p.foreclosure_stage
                : "None recorded"}
            </li>
            {p.foreclosure_case_number && (
              <li>
                <span className="font-medium">Case #: </span>
                {p.foreclosure_case_number}
              </li>
            )}
            {p.foreclosure_record_url && (
              <li>
                <a
                  href={p.foreclosure_record_url}
                  className="text-xs text-yellow-300 underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  View foreclosure record
                </a>
              </li>
            )}
          </ul>
        </section>

        {/* Owner & source row */}
        <section className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 text-sm">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Owner (Public Record)
            </h2>
            <div className="space-y-1">
              <div className="font-medium">{p.owner_name ?? "Unknown"}</div>
              {p.owner_mailing_address && (
                <div className="text-slate-300">
                  {p.owner_mailing_address}
                  <br />
                  {p.owner_mailing_city}, {p.owner_mailing_state}{" "}
                  {p.owner_mailing_zip}
                </div>
              )}
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Contact details may be locked and only visible after paid unlock.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 text-sm">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Record Source
            </h2>
            <div className="space-y-1">
              <div>
                <span className="text-slate-400">Source ID: </span>
                <span className="font-mono text-xs">{p.source_id}</span>
              </div>
              <div>
                <span className="text-slate-400">Record ID: </span>
                <span className="font-mono text-xs">{p.source_record_id}</span>
              </div>
              {p.source_url && (
                <div className="mt-2">
                  <a
                    href={p.source_url}
                    className="text-xs text-sky-400 underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open county record
                  </a>
                </div>
              )}
              <div className="mt-2 text-xs text-slate-400">
                Last checked: {p.source_last_checked_at}
              </div>
            </div>
          </div>
        </section>

        {/* Tags */}
        {p.tags && p.tags.length > 0 && (
          <section className="mt-6">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Tags
            </h2>
            <div className="flex flex-wrap gap-2 text-xs">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-800 px-3 py-1 text-slate-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
