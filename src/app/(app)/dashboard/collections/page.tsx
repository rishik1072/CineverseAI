import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";

export default function CollectionsPage() {
  return (
    <DashboardShell>
      <PageHeader eyebrow="Public curation" title="Collections" description="Curate shareable movie collections with likes and creator profiles." />
      <div className="grid gap-4 md:grid-cols-3">
        {["Neon Noir", "Mind-Bending Sci-Fi", "Awards Season"].map((title) => <Card key={title}><CardContent className="p-6"><h2 className="text-2xl font-black">{title}</h2><p className="mt-3 text-slate-400">Public collection template</p></CardContent></Card>)}
      </div>
    </DashboardShell>
  );
}
