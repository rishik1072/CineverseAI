import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Watch Party Planner" };

export default function WatchPartyPage() {
  return (
    <main className="cinema-container py-16">
      <PageHeader eyebrow="Social viewing" title="Watch Party Planner" description="Create rooms, invite friends, schedule movies, and share cinematic plans." />
      <Card><CardContent className="p-8"><h2 className="text-3xl font-black">Friday Sci-Fi Night</h2><p className="mt-3 text-slate-400">Invite panel, guest list, and room chat are API-ready.</p><Button className="mt-6">Create party</Button></CardContent></Card>
    </main>
  );
}
