export default function Home() {
  return (
    <main className="min-h-[calc(100vh-3rem)] bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10">
        {/* Hero */}
        <section className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] items-start">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              DLRadar · Public Records & Deal Radar
            </h1>
            <p className="mt-3 max-w-xl text-sm text-slate-300">
              DLRadar automatically ingests public-record data, keeps it
              pass-through and unedited, and layers in context like ZIP-level
              demographics so investors can see real-world signals without
              guessing.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <a
                href="/example/property"
                className="inline-flex items-center rounded-full border border-sky-500 bg-sky-500/10 px-4 py-2 font-medium text-sky-200 hover:bg-sky-500/20"
              >
                View Example Property
              </a>
              <a
                href="/fl/dashboard"
                className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 font-medium text-slate-100 hover:bg-slate-800/80"
              >
                Florida Coverage Snapshot
              </a>
            </div>
            <p className="mt-4 text-[11px] text-slate-500">
              All property data is auto pass-through from public records and
              external datasets. DLRadar does not manually edit, fix, or
              fabricate any factual fields.
            </p>
          </div>

          {/* Quick stats card (static for now, wired to your current examples) */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 text-sm">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Current Demo Snapshot
            </h2>
            <div className="mt-3 grid gap-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Example properties</span>
                <span className="font-semibold">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">
                  Counties represented (demo)
                </span>
                <span className="font-semibold">Orange, Miami-Dade</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Enriched with ZIP data</span>
                <span className="font-semibold">Yes</span>
              </div>
            </div>
            <p className="mt-4 text-[11px] text-slate-500">
              This is a working demo wired to your DLRadar backend spec,
              example records, and us_cities dataset. As you add real scrapers
              and more counties, these numbers and links will reflect live data.
            </p>
          </div>
        </section>

        {/* Sections */}
        <section className="grid gap-6 md:grid-cols-3 text-sm">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Auto Pass-Through
            </h3>
            <p className="mt-2 text-slate-300">
              All public-record data is passed through exactly as retrieved—
              no manual edits, no corrections, no fabrication. Numbers may be
              normalized for format, but meanings are never changed.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Context Layers
            </h3>
            <p className="mt-2 text-slate-300">
              ZIP-level demographics, income, households, and time zone are
              layered on top of raw public records as{" "}
              <span className="font-medium">area_profile</span>—always labeled,
              never overriding the source data.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Provenance First
            </h3>
            <p className="mt-2 text-slate-300">
              Every record tracks{" "}
              <span className="font-mono text-xs">source_id</span>,{" "}
              <span className="font-mono text-xs">source_record_id</span>, and{" "}
              <span className="font-mono text-xs">source_url</span> so you can
              always click back to the official origin.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
