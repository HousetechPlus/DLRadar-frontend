import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "DLRadar · Public Records & Deal Radar",
  description:
    "DLRadar is an auto-pass-through public records radar for real estate and business listings. All data is sourced automatically from public records and external datasets without manual edits.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        {/* Top nav */}
        <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 border border-sky-500/40">
                <span className="text-xs font-bold text-sky-400">DL</span>
              </div>
              <div>
                <div className="text-sm font-semibold tracking-wide">
                  DLRadar
                </div>
                <div className="text-[11px] text-slate-400">
                  Auto pass-through public records
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-3 text-xs">
              <a
                href="/"
                className="rounded-full px-3 py-1 text-slate-200 hover:bg-slate-800/70"
              >
                Home
              </a>

              <a
                href="/states"
                className="rounded-full px-3 py-1 text-slate-200 hover:bg-slate-800/70"
              >
                Browse
              </a>

              <a
                href="/login"
                className="rounded-full px-3 py-1 text-slate-200 hover:bg-slate-800/70"
              >
                Login
              </a>

              <a
                href="/example/property"
                className="rounded-full px-3 py-1 text-slate-200 hover:bg-slate-800/70"
              >
                Example Property
              </a>

              <a
                href="/fl/dashboard"
                className="rounded-full px-3 py-1 text-slate-200 hover:bg-slate-800/70"
              >
                FL Coverage
              </a>
            </nav>
          </div>
        </header>

        {/* Page content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
