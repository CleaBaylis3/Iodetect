"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Droplets,
  FlaskConical,
  Users,
  Globe,
  Search,
  MapPin,
  CalendarRange,
  UserRound,
  RotateCcw,
  BarChart3
} from "lucide-react";

import LogoutButton from "@/components/LogoutButton";
import MapSection from "@/components/MapSection";
import { mockReadings } from "@/lib/mockReadings";

function formatNumber(value: number) {
  return new Intl.NumberFormat().format(value);
}

function getStatusStyles(status: string) {
  switch (status) {
    case "LOW":
      return "bg-red-100 text-red-700 ring-1 ring-red-200";
    case "NORMAL":
      return "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200";
    case "HIGH":
      return "bg-green-100 text-green-700 ring-1 ring-green-200";
    default:
      return "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
  }
}

export default function DashboardClient() {
  const [countryFilter, setCountryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [genderFilter, setGenderFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const countries = useMemo(() => {
    return Array.from(
      new Set(mockReadings.map((reading) => reading.location.country))
    ).sort();
  }, []);

  const filteredReadings = useMemo(() => {
    return mockReadings.filter((reading) => {
      const matchesCountry =
        countryFilter === "ALL" ||
        reading.location.country === countryFilter;

      const matchesStatus =
        statusFilter === "ALL" ||
        reading.status === statusFilter;

      const matchesGender =
        genderFilter === "ALL" ||
        reading.user.gender === genderFilter;

      const query = searchTerm.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        reading.location.city.toLowerCase().includes(query) ||
        reading.location.country.toLowerCase().includes(query) ||
        reading.user.id.toLowerCase().includes(query);

      return (
        matchesCountry &&
        matchesStatus &&
        matchesGender &&
        matchesSearch
      );
    });
  }, [countryFilter, statusFilter, genderFilter, searchTerm]);

  const totalReadings = filteredReadings.length;

  const averageIodine =
    totalReadings === 0
      ? 0
      : Math.round(
          filteredReadings.reduce(
            (sum, reading) => sum + reading.iodine_ug_L,
            0
          ) / totalReadings
        );

  const uniqueUsers = new Set(
    filteredReadings.map((reading) => reading.user.id)
  ).size;

  const uniqueCountries = new Set(
    filteredReadings.map((reading) => reading.location.country)
  ).size;

  const recentReadings = [...filteredReadings]
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .slice(0, 8);

  const selectedCountryReadings =
    countryFilter === "ALL"
      ? []
      : filteredReadings.filter(
          (reading) => reading.location.country === countryFilter
        );

  const countryAverageIodine =
    selectedCountryReadings.length === 0
      ? 0
      : Math.round(
          selectedCountryReadings.reduce(
            (sum, reading) => sum + reading.iodine_ug_L,
            0
          ) / selectedCountryReadings.length
        );

  const countryUniqueUsers = new Set(
    selectedCountryReadings.map((reading) => reading.user.id)
  ).size;

  const countryLowCount = selectedCountryReadings.filter(
    (reading) => reading.status === "LOW"
  ).length;

  const countryNormalCount = selectedCountryReadings.filter(
    (reading) => reading.status === "NORMAL"
  ).length;

  const countryHighCount = selectedCountryReadings.filter(
    (reading) => reading.status === "HIGH"
  ).length;

  const metricCards = [
    {
      label: "Total Readings",
      value: formatNumber(totalReadings),
      icon: Droplets,
      iconBg: "bg-sky-100",
      iconColor: "text-sky-700",
    },
    {
      label: "Average Iodine",
      value: `${formatNumber(averageIodine)} µg/L`,
      icon: FlaskConical,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-700",
    },
    {
      label: "Users",
      value: formatNumber(uniqueUsers),
      icon: Users,
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-700",
    },
    {
      label: "Countries",
      value: formatNumber(uniqueCountries),
      icon: Globe,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-700",
    },
  ];

  const resetFilters = () => {
    setCountryFilter("ALL");
    setStatusFilter("ALL");
    setGenderFilter("ALL");
    setSearchTerm("");
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#dbeafe_0%,_#eff6ff_30%,_#f8fbff_65%,_#edf5ff_100%)] px-4 py-6 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-[32px] border border-white/60 bg-white/75 px-5 py-5 shadow-[0_20px_60px_rgba(37,99,235,0.12)] backdrop-blur xl:px-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                <Image
                  src="/qbit_icon.png"
                  alt="QBiT Logo"
                  width={64}
                  height={64}
                  className="h-16 w-16 object-contain p-1"
                />
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                  Iodetect
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-slate-800 md:text-4xl">
                  Global Dashboard
                </h1>
                <p className="text-sm text-slate-500">
                  Monitor iodine readings, trends, and geographic distribution
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">

              <LogoutButton />
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metricCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.label}
                className="rounded-[28px] border border-white/60 bg-white/80 p-5 shadow-[0_16px_40px_rgba(59,130,246,0.1)] backdrop-blur"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-500">
                      {card.label}
                    </p>
                    <p className="text-3xl font-bold tracking-tight text-slate-800">
                      {card.value}
                    </p>
                  </div>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.iconBg} ${card.iconColor} shadow-inner`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <section className="rounded-[30px] border border-white/60 bg-white/78 p-5 shadow-[0_18px_45px_rgba(59,130,246,0.1)] backdrop-blur">
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Filters
              </h2>
              <p className="text-sm text-slate-500">
                Refine what appears across the map, summary cards, and readings table
              </p>
            </div>

            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              <RotateCcw className="h-4 w-4" />
              Reset filters
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <label className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <Search className="h-3.5 w-3.5" />
                Search
              </label>
              <input
                type="text"
                placeholder="City, country, or user ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <label className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <MapPin className="h-3.5 w-3.5" />
                Country
              </label>
              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-700 outline-none"
              >
                <option value="ALL">All countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <label className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <Droplets className="h-3.5 w-3.5" />
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-700 outline-none"
              >
                <option value="ALL">All statuses</option>
                <option value="LOW">Low</option>
                <option value="NORMAL">Normal</option>
                <option value="HIGH">High</option>
              </select>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <label className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <UserRound className="h-3.5 w-3.5" />
                Gender
              </label>
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-700 outline-none"
              >
                <option value="ALL">All genders</option>
                <option value="M">M</option>
                <option value="F">F</option>
                <option value="X">X</option>
                <option value="U">U</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-[30px] border border-white/60 bg-white/78 p-5 shadow-[0_18px_45px_rgba(59,130,246,0.1)] backdrop-blur">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Country Insights
              </h2>
              <p className="text-sm text-slate-500">
                Summary statistics for the selected country
              </p>
            </div>
          </div>

          {countryFilter === "ALL" ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-center text-sm text-slate-500">
              Select a country in the filters above to view country-level iodine insights.
            </div>
          ) : (<div className="space-y-4">
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
    <div className="rounded-2xl bg-slate-50 px-4 py-4 ring-1 ring-slate-100">
      <p className="text-sm font-medium text-slate-500">Country</p>
      <p className="mt-2 text-2xl font-bold text-slate-800">
        {countryFilter}
      </p>
    </div>

    <div className="rounded-2xl bg-slate-50 px-4 py-4 ring-1 ring-slate-100">
      <p className="text-sm font-medium text-slate-500">Average Iodine</p>
      <p className="mt-2 text-2xl font-bold text-slate-800">
        {countryAverageIodine} µg/L
      </p>
    </div>

    <div className="rounded-2xl bg-slate-50 px-4 py-4 ring-1 ring-slate-100">
      <p className="text-sm font-medium text-slate-500">Readings</p>
      <p className="mt-2 text-2xl font-bold text-slate-800">
        {selectedCountryReadings.length}
      </p>
    </div>

    <div className="rounded-2xl bg-slate-50 px-4 py-4 ring-1 ring-slate-100">
      <p className="text-sm font-medium text-slate-500">Users</p>
      <p className="mt-2 text-2xl font-bold text-slate-800">
        {countryUniqueUsers}
      </p>
    </div>
  </div>

  <div>
    <p className="mb-3 text-sm font-medium text-slate-500">
      Status Breakdown
    </p>

    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="rounded-2xl bg-red-50 px-4 py-4 ring-1 ring-red-100">
        <p className="text-sm font-medium text-red-600">Low</p>
        <p className="mt-2 text-2xl font-bold text-red-700">
          {countryLowCount}
        </p>
      </div>

      <div className="rounded-2xl bg-yellow-50 px-4 py-4 ring-1 ring-yellow-100">
        <p className="text-sm font-medium text-yellow-700">Normal</p>
        <p className="mt-2 text-2xl font-bold text-yellow-700">
          {countryNormalCount}
        </p>
      </div>

      <div className="rounded-2xl bg-green-50 px-4 py-4 ring-1 ring-green-100">
        <p className="text-sm font-medium text-green-700">High</p>
        <p className="mt-2 text-2xl font-bold text-green-700">
          {countryHighCount}
        </p>
      </div>
    </div>
  </div>
</div>
          )}
        </section>

        <section className="rounded-[30px] border border-white/60 bg-white/82 p-5 shadow-[0_18px_45px_rgba(59,130,246,0.1)] backdrop-blur">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Global Readings Map
              </h2>
              <p className="text-sm text-slate-500">
                Geographic distribution of filtered iodine readings
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
              <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-red-700 ring-1 ring-red-100">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                Low
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-yellow-50 px-3 py-1.5 text-yellow-700 ring-1 ring-yellow-100">
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                Normal
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-green-700 ring-1 ring-green-100">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                High
              </span>
            </div>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-sky-100 bg-sky-50/60">
            <MapSection readings={filteredReadings} />
          </div>
        </section>

        <section className="rounded-[30px] border border-white/60 bg-white/82 p-5 shadow-[0_18px_45px_rgba(59,130,246,0.1)] backdrop-blur">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Recent Readings
              </h2>
              <p className="text-sm text-slate-500">
                Latest filtered iodine measurements
              </p>
            </div>

            <div className="rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 ring-1 ring-sky-100">
              {formatNumber(filteredReadings.length)} matching results
            </div>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-slate-100">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-sky-50/80 text-slate-600">
                  <tr>
                    <th className="px-5 py-4 text-left font-semibold">Date</th>
                    <th className="px-5 py-4 text-left font-semibold">Location</th>
                    <th className="px-5 py-4 text-left font-semibold">Age</th>
                    <th className="px-5 py-4 text-left font-semibold">Gender</th>
                    <th className="px-5 py-4 text-left font-semibold">Status</th>
                    <th className="px-5 py-4 text-left font-semibold">
                      Iodine Level
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 bg-white">
                  {recentReadings.map((reading) => (
                    <tr
                      key={reading.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4 text-slate-700">
                        {new Date(reading.timestamp).toLocaleDateString("en-CA", {
                          month: "short",
                          day: "numeric",
                        })}
                      </td>

                      <td className="px-5 py-4">
                        <div className="font-medium text-slate-800">
                          {reading.location.city}
                        </div>
                        <div className="text-slate-500">
                          {reading.location.country}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-slate-700">
                        {reading.user.age ?? "—"}
                      </td>

                      <td className="px-5 py-4 text-slate-700">
                        {reading.user.gender}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyles(
                            reading.status
                          )}`}
                        >
                          {reading.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 font-medium text-slate-800">
                        {reading.iodine_ug_L} µg/L
                      </td>
                    </tr>
                  ))}

                  {recentReadings.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-5 py-10 text-center text-slate-500"
                      >
                        No readings match the current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}