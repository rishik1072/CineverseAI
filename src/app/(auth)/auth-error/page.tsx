import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthErrorPage() {
  return (
    <main className="cinema-container grid min-h-[70vh] place-items-center text-center">
      <div>
        <h1 className="text-5xl font-black">Authentication failed</h1>
        <p className="mt-4 text-slate-400">Please try another provider or contact support.</p>
        <Button asChild className="mt-8"><Link href="/login">Back to sign in</Link></Button>
      </div>
    </main>
  );
}
