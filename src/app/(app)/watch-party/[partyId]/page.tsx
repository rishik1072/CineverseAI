import { PageHeader } from "@/components/shared/page-header";

type PageProps = { params: Promise<{ partyId: string }> };

export default async function WatchPartyRoomPage({ params }: PageProps) {
  const { partyId } = await params;
  return <main className="cinema-container py-16"><PageHeader eyebrow="Party room" title={`Watch Party ${partyId}`} description="Live room shell with participants, chat, invites, and movie preview." /></main>;
}
