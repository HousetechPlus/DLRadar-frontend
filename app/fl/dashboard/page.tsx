const TOTAL_FL_COUNTIES = 67;
const TOTAL_FL_SOURCES = 8;
// For now, we know we have sources for: statewide, Orange, Miami-Dade, Hillsborough.
// We'll just show simple stats.
const COUNTIES_WITH_SOURCES = ["(statewide)", "Orange County", "Miami-Dade County", "Hillsborough County"];

export default function FloridaDashboardPage() {
  const countiesWithoutSources = TOTAL_FL_COUNTIES - (COUNTIES_WITH_SOURCES.length - 1); // minus "(statewide)"

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-10 space-y-8">
        <header>
          <h1 className="text-2xl font-semibold">Florida Coverage Overview</h1>
          <p className="mt-1 text-sm text-slate-300">
            Snapshot of DLRadar public record source coverage for Florida.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="text-xs text-slate-400 uppercase">Total Counties</div>
            <div className="mt-1 text-2xl font-semibold">{TOTAL_FL_COUNTIES}</div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="text-xs text-slate-400 uppercase">Total Sources (FL)</div>
            <div className="mt-1 text-2xl font-semibold">{TOTAL_FL_SOURCES}</div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="text-xs text-slate-400 uppercase">Counties w/o Sources</div>
            <div className="mt-1 text-2xl font-semibold">{countiesWithoutSources}</div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Counties with Sources (So Far)
          </h2>
          <ul className="mt-3 space-y-1 text-sm text-slate-200">
            {COUNTIES_WITH_SOURCES.map((name) => (
              <li key={name}>• {name}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-slate-400">
            This view will later be driven by live data from{" "}
            <code className="rounded bg-slate-800 px-1 py-0.5 text-[10px]">
              fl_public_records_sources.csv
            </code>{" "}
            and inspection scripts in the DLRadar backend.
          </p>
        </section>
      </div>
    </main>
  );
}
