import Link from "next/link";
import propertiesData from "@/data/properties_demo.json";

type DemoProperty = {
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

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export default function PropertiesListPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const state = (searchParams?.state as string) || "FL";
  const counties = (searchParams?.counties as string) || "All counties";
  const hasTaxLien = searchParams?.hasTaxLien === "true";
  const hasForeclosure = searchParams?.hasForeclosure === "true";
  const minAssessed = searchParams?.minAssessed
    ? parseInt(searchParams.minAssessed as string, 10)
    : undefined;

  let filtered = propertiesData as DemoProperty[];

  if (counties !== "All counties") {
    const countyList = counties.split(",").map((c) => c.trim());
    filtered = filtered.filter((p) => countyList.includes(p.county_name));
  }

  if (hasTaxLien) {
    filtered = filtered.filter((p) => p.has_tax_lien);
  }

  if (hasForeclosure) {
    filtered = filtered.filter(
      (p) => p.foreclosure_stage && p.foreclosure_stage !== "none",
    );
  }

  if (!Number.isNaN(minAssessed) && minAssessed !== undefined) {
    filtered = filtered.filter(
      (p) => (p.valuation?.market_value_estimate ?? 0) >= (minAssessed ?? 0),
    );
  }

  return (
    <main className="min-h-[calc(100vh-3rem)] bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
        <header>
          <h1 className="text-2xl font-semibold">Property list</h1>
          <p className="mt-2 text-sm text-slate-300">
            Demo representation of the step where, after you pick your state,
            counties, and filters, DLRadar returns a list of matching
            properties. Clicking a row takes you to a detailed property view.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            State: <span className="font-mono">{state}</span> · Counties:{" "}
            <span className="font-mono">{counties}</span>
          </p>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm">
          {filtered.length === 0 ? (
            <p className="text-slate-400">No properties match these filters.</p>
          ) : (
            <div className="space-y-2">
              {filtered.map((p) => (
                <Link
                  key={p.id}
                  href="/example/property"
                  className="flex flex-col gap-1 rounded-lg border border-slate-800 bg-slate-950 px-3 py-3 hover:border-sky-500/60 hover:bg-slate-900"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="text-sm font-semibold">{p.address}</div>
                      <div className="text-xs text-slate-400">
                        {p.county_name} · {p.city}, {p.state_abbr} {p.zip}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 text-[11px]">
                      <span className="rounded-full border border-slate-700 px-2 py-1">
                        Status: {p.dlradar_status}
                      </span>
                      {p.has_tax_lien && (
                        <span className="rounded-full border border-amber-500/60 bg-amber-500/10 px-2 py-1 text-amber-100">
                          Tax lien
                        </span>
                      )}
                      {p.foreclosure_stage &&
                        p.foreclosure_stage !== "none" && (
                          <span className="rounded-full border border-red-500/60 bg-red-500/10 px-2 py-1 text-red-100">
                            Foreclosure: {p.foreclosure_stage}
                          </span>
                        )}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                    <span>
                      Market value:{" "}
                      <span className="font-semibold">
                        {p.valuation?.market_value_estimate
                          ? `$${p.valuation.market_value_estimate.toLocaleString()}`
                          : "—"}
                      </span>
                    </span>
                    <span>
                      Foreclosure score:{" "}
                      <span className="font-semibold text-emerald-200">
                        {p.foreclosure_dd?.overall_score ?? "—"}/100
                      </span>
                    </span>
                    <span className="text-slate-500">
                      ID: <span className="font-mono">{p.id}</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
