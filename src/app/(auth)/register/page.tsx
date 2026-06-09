import Link from "next/link";

import { RegisterForm } from "@/components/auth/register-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <main className="cinema-container grid min-h-[calc(100vh-5rem)] place-items-center py-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl">Create your profile</CardTitle>
          <CardDescription>Start building your cinematic fingerprint.</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account? <Link href="/login" className="text-cyan-200 hover:underline">Sign in</Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
