export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="space-y-1">
          <h1 className="text-3xl font-semibold">Iodetect Dashboard</h1>
          <p className="text-sm text-gray-600">
            Mock data for now — Firebase live feed later.
          </p>
        </header>

        {/* Metric cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Readings", value: "—" },
            { label: "Average UIC (µg/L)", value: "—" },
            { label: "Users", value: "—" },
            { label: "Countries", value: "—" },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-xl border bg-white p-4 shadow-sm"
            >
              <div className="text-sm text-gray-600">{card.label}</div>
              <div className="mt-2 text-2xl font-semibold">{card.value}</div>
            </div>
          ))}
        </section>

        {/* Main content placeholders */}
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-xl border bg-white p-4 shadow-sm">
            <div className="text-sm font-medium">Map (coming next)</div>
            <div className="mt-3 h-[420px] rounded-lg bg-gray-50" />
          </div>

          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="text-sm font-medium">Filters (coming next)</div>
            <div className="mt-3 space-y-2">
              <div className="h-10 rounded-lg bg-gray-50" />
              <div className="h-10 rounded-lg bg-gray-50" />
              <div className="h-10 rounded-lg bg-gray-50" />
            </div>
          </div>
        </section>

        <section className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="text-sm font-medium">
            Live Readings Feed (coming next)
          </div>
          <div className="mt-3 h-[320px] rounded-lg bg-gray-50" />
        </section>
      </div>
    </main>
  );
}
