"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

const groups = [
  {
    title: "Marketplace Policies",
    items: [
      ["Payments & Commission Policy", "payments-and-commission"],
      ["Reviews Policy", "reviews"],
    ],
  },
  {
    title: "Governance",
    items: [
      ["Business Verification Policy", "business-verification"],
      ["Trust Score Policy", "trust-score"],
    ],
  },
  {
    title: "Resources",
    items: [
      ["Business Dashboard Guide", null],
      ["Verification Guide", null],
      ["Trust Score Guide", null],
    ],
  },
];

export default function PoliciesAndResourcesPage() {
  const user = useAuthStore((state) => state.user);
  const business = user?.business;
  const analystEligible = Boolean(
    business?.businessAnalystProgrammeEligible ||
    business?.businessAnalystProgrammeStatus === "eligible" ||
    business?.businessAnalystProgrammeStatus === "enrolled" ||
    business?.isBusinessAnalystProgrammeMember,
  );

  return (
    <div className="p-6 md:p-8">
      <div className="rounded-2xl bg-[#060853] p-8 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#24D19B]">Business portal</p>
        <h1 className="mt-2 text-3xl font-bold">Policies & Resources</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">Review the policies and guidance relevant to operating your Business on Joe Praise Smart Hub.</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {groups.map((group) => (
          <section key={group.title} className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">{group.title}</h2>
            <div className="mt-4 space-y-3">
              {group.items.map(([title, slug]) =>
                slug ? (
                  <Link key={title} href={`/dashboard/policies/${slug}`} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-[#060853] hover:bg-[#E8F1FD]">
                    {title}<span aria-hidden>→</span>
                  </Link>
                ) : (
                  <div key={title} className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-500">{title} <span className="text-xs">(coming soon)</span></div>
                ),
              )}
            </div>
          </section>
        ))}

        {analystEligible && (
          <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Eligible business</p>
            <h2 className="mt-2 text-lg font-bold text-slate-900">Business Analyst Programme</h2>
            <Link href="/dashboard/policies/business-analyst-programme" className="mt-4 inline-flex font-semibold text-emerald-800 underline underline-offset-4">View programme policy</Link>
          </section>
        )}

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">Business Support</h2>
          <Link href="/dashboard/support" className="mt-4 inline-flex font-semibold text-[#060853] underline underline-offset-4">Open Help Centre</Link>
        </section>
      </div>
    </div>
  );
}
