
export default function StatesPage() {
  const demoStates = [
    {
      code: "FL",
      name: "Florida",
      status: "Demo wired",
      note: "Orange + Miami-Dade example data",
    },
  ];

  return (
    <main className="min-h-[calc(100vh-3rem)] bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-10 space-y-6">
        <header>
          <h1 className="text-2xl font-semibold">Choose your state</h1>
          <p className="mt-2 text-sm text-slate-300">
            After logging in, you select which state you want to scan. This demo
            currently focuses on Florida (FL) with example foreclosure and tax
            lien data.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2">
          {demoStates.map((s) => (
            <a
              key={s.code}
              href={`/states/${s.code.toLowerCase()}/counties`}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm hover:border-sky-500/60"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">
                    {s.name}{" "}
                    <span className="text-xs text-slate-400">({s.code})</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-400">{s.note}</div>
                </div>
                <span className="rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-[11px] text-sky-200">
                  {s.status}
                </span>
              </div>
            </a>
          ))}
        </section>
      </div>
    </main>
  );
}
