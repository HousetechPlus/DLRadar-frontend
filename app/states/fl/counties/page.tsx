"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const flCounties = [
  "All counties",
  "Alachua County",
  "Baker County",
  "Bay County",
  "Bradford County",
  "Brevard County",
  "Broward County",
  "Calhoun County",
  "Charlotte County",
  "Citrus County",
  "Clay County",
  "Collier County",
  "Columbia County",
  "DeSoto County",
  "Dixie County",
  "Duval County",
  "Escambia County",
  "Flagler County",
  "Franklin County",
  "Gadsden County",
  "Gilchrist County",
  "Glades County",
  "Gulf County",
  "Hamilton County",
  "Hardee County",
  "Hendry County",
  "Hernando County",
  "Highlands County",
  "Hillsborough County",
  "Holmes County",
  "Indian River County",
  "Jackson County",
  "Jefferson County",
  "Lafayette County",
  "Lake County",
  "Lee County",
  "Leon County",
  "Levy County",
  "Liberty County",
  "Madison County",
  "Manatee County",
  "Marion County",
  "Martin County",
  "Miami-Dade County",
  "Monroe County",
  "Nassau County",
  "Okaloosa County",
  "Okeechobee County",
  "Orange County",
  "Osceola County",
  "Palm Beach County",
  "Pasco County",
  "Pinellas County",
  "Polk County",
  "Putnam County",
  "Santa Rosa County",
  "Sarasota County",
  "Seminole County",
  "St. Johns County",
  "St. Lucie County",
  "Sumter County",
  "Suwannee County",
  "Taylor County",
  "Union County",
  "Volusia County",
  "Wakulla County",
  "Walton County",
  "Washington County",
];

export default function FlCountiesPage() {
  const router = useRouter();
  const [selectedCounties, setSelectedCounties] = useState<string[]>([
    "All counties",
  ]);
  const [hasTaxLien, setHasTaxLien] = useState(false);
  const [hasForeclosure, setHasForeclosure] = useState(false);
  const [minAssessed, setMinAssessed] = useState<string>("");

  function toggleCounty(name: string) {
    if (name === "All counties") {
      setSelectedCounties(["All counties"]);
      return;
    }

    setSelectedCounties((prev) => {
      const withoutAll = prev.filter((c) => c !== "All counties");
      if (withoutAll.includes(name)) {
        const next = withoutAll.filter((c) => c !== name);
        return next.length === 0 ? ["All counties"] : next;
      }
      return [...withoutAll, name];
    });
  }

  function handleSearch() {
    const params = new URLSearchParams();
    params.set("state", "FL");
    params.set("counties", selectedCounties.join(","));
    if (hasTaxLien) params.set("hasTaxLien", "true");
    if (hasForeclosure) params.set("hasForeclosure", "true");
    if (minAssessed.trim() !== "") params.set("minAssessed", minAssessed.trim());

    router.push(`/properties?${params.toString()}`);
  }

  return (
    <main className="min-h-[calc(100vh-3rem)] bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-10 space-y-6">
        <header>
          <h1 className="text-2xl font-semibold">Choose counties & filters</h1>
          <p className="mt-2 text-sm text-slate-300">
            After selecting Florida, choose whether to scan all counties or
            specific ones, then add filters before getting your property list.
            This demo wires into your current example records, and the county
            names match DLRadar&apos;s backend naming.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2 text-sm">
          {/* County selection */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 max-h-[480px] overflow-y-auto">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Florida counties
            </h2>
            <p className="mt-1 text-[11px] text-slate-500">
              Select &quot;All counties&quot; or one or more specific counties.
            </p>
            <div className="mt-3 space-y-2">
              {flCounties.map((name) => {
                const selected = selectedCounties.includes(name);
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => toggleCounty(name)}
                    className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left ${
                      selected
                        ? "border-sky-500 bg-sky-500/10 text-sky-100"
                        : "border-slate-700 bg-slate-950 text-slate-200 hover:bg-slate-900"
                    }`}
                  >
                    <span>{name}</span>
                    {selected && (
                      <span className="text-[10px] uppercase tracking-wide">
                        Selected
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filters */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Filters (demo)
            </h2>
            <div className="mt-3 space-y-3">
              <label className="flex items-center justify-between text-xs text-slate-300">
                <span>Has tax lien</span>
                <input
                  type="checkbox"
                  checked={hasTaxLien}
                  onChange={(e) => setHasTaxLien(e.target.checked)}
                />
              </label>
              <label className="flex items-center justify-between text-xs text-slate-300">
                <span>Has foreclosure activity</span>
                <input
                  type="checkbox"
                  checked={hasForeclosure}
                  onChange={(e) => setHasForeclosure(e.target.checked)}
                />
              </label>
              <div className="space-y-1">
                <label className="text-xs text-slate-300">
                  Minimum assessed value (USD)
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-sky-500"
                  value={minAssessed}
                  onChange={(e) => setMinAssessed(e.target.value)}
                  placeholder="e.g. 200000"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleSearch}
                className="rounded-full border border-sky-500 bg-sky-500/10 px-5 py-2 text-sm font-medium text-sky-200 hover:bg-sky-500/20"
              >
                Get property list
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
