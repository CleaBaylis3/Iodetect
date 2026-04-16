"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom_right,_#f8fbff,_#eaf3ff,_#f8fbff)] px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-[0_25px_80px_rgba(59,130,246,0.12)] ring-1 ring-sky-100 lg:grid-cols-2">
          <section className="hidden bg-[linear-gradient(to_bottom_right,_#dff1ff,_#bfdbfe,_#e0f2fe)] p-10 lg:flex lg:flex-col lg:justify-between">
            <div className="space-y-6">
<div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-white/60">
  <Image
    src="/qbit_icon.png"
    alt="QBiT Logo"
    width={56}
    height={56}
    className="h-full w-full object-cover"
  />
</div>

              <div className="space-y-3">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-700">
                  Iodetect
                </p>
                <h1 className="max-w-md text-4xl font-bold leading-tight text-slate-800">
                  Global iodine monitoring dashboard
                </h1>
                <p className="max-w-md text-base leading-7 text-slate-600">
                  Secure access for healthcare professionals to review iodine readings,
                  geographic trends, and live dashboard data.
                </p>
              </div>
            </div>

          </section>

          <section className="flex items-center justify-center px-6 py-10 sm:px-10">
            <div className="w-full max-w-md space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 lg:hidden">
<div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-200">
  <Image
    src="/qbit-logo.png"
    alt="QBiT Logo"
    width={48}
    height={48}
    className="h-full w-full object-cover"
  />
</div>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-800">
                      Iodetect
                    </h1>
                    <p className="text-sm text-slate-500">
                      Global iodine monitoring dashboard
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight text-slate-800">
                    Welcome back
                  </h2>
                  <p className="text-sm leading-6 text-slate-500">
                    Sign in to access the Iodetect dashboard.
                  </p>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer w-full rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:from-sky-600 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>

            </div>
          </section>
        </div>
      </div>
    </main>
  );
}