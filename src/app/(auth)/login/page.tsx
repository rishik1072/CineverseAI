import Link from "next/link";

import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <main className="cinema-container grid min-h-[calc(100vh-5rem)] place-items-center py-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl">Welcome back</CardTitle>
          <CardDescription>Sign in to sync watchlists, ratings, mood profile, and release radar.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <p className="mt-6 text-center text-sm text-slate-400">
            New to CineVerse? <Link href="/register" className="text-cyan-200 hover:underline">Create an account</Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
