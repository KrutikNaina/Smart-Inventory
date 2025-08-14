import React from "react";
import LoginCard from "../components/auth/LoginCard";

export default function Login() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* sticky header like your site */}
      <header className="sticky top-0 z-40 backdrop-blur border-b border-white/10 bg-neutral-950/60">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600" />
            <span className="text-white font-bold tracking-tight">
              SmartInventory
            </span>
          </div>
          <div className="text-sm text-neutral-300">Need an account?</div>
        </nav>
      </header>

      {/* center area */}
      <section className="max-w-7xl mx-auto px-6 py-16 flex items-center justify-center">
        <div className="w-full grid lg:grid-cols-2 gap-10 items-center">
          {/* left: pitch */}
          <div className="hidden lg:block">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 text-xs text-neutral-300">
              Secure • Fast • Role-based
            </div>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight">
              Log in to manage <br /> your inventory.
            </h1>
            <p className="mt-4 text-neutral-300">
              One click with Google. Real-time stock. Error-free billing.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-neutral-300">
              <li>• SSO with Google Workspace</li>
              <li>• Role-based access: Admin, Staff, Auditor</li>
              <li>• Audit logs & session security</li>
            </ul>
          </div>

          {/* right: card */}
          <LoginCard onGoogle={() => Promise.resolve()} />
        </div>
      </section>
    </main>
  );
}
