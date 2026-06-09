"use client";

import { signIn } from "next-auth/react";
import { Github, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (result?.error) toast.error("Invalid credentials");
    else window.location.href = "/dashboard";
  }

  return (
    <div className="space-y-4">
      <Button className="w-full" variant="glass" onClick={() => void signIn("google", { callbackUrl: "/dashboard" })}>Continue with Google</Button>
      <Button className="w-full" variant="glass" onClick={() => void signIn("github", { callbackUrl: "/dashboard" })}>
        <Github className="h-4 w-4" /> Continue with GitHub
      </Button>
      <form onSubmit={onSubmit} className="space-y-4 pt-4">
        <Input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <Input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        <Button className="w-full" disabled={loading}>
          <Mail className="h-4 w-4" /> {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
