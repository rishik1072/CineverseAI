import { SearchClient } from "@/components/search/search-client";

type PageProps = { searchParams: Promise<{ q?: string }> };

export const metadata = { title: "Search" };

export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams;
  return <SearchClient initialQuery={params.q ?? ""} />;
}
