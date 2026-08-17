import { adminPolicyDocuments } from "@/data/policyCatalog";

export default function AdminPoliciesPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="rounded-2xl bg-[#060853] p-8 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#24D19B]">Admin only</p>
        <h1 className="mt-2 text-3xl font-bold">Policy Governance</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">Internal governance documents are intentionally excluded from the public website and Business portal.</p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {Object.entries(adminPolicyDocuments).map(([slug, policy]) => (
          <article key={slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Effective {policy.effectiveDate}</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">{policy.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{policy.description}</p>
            <div className="mt-5 rounded-lg bg-amber-50 px-4 py-3 text-xs font-medium text-amber-800">Restricted to authorised administrators and governance personnel.</div>
          </article>
        ))}
      </div>
    </div>
  );
}
