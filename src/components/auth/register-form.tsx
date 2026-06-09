"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const response = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, password }) });
    if (!response.ok) {
      setLoading(false);
      toast.error("Registration failed");
      return;
    }
    await signIn("credentials", { email, password, callbackUrl: "/dashboard" });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} required />
      <Input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      <Input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} />
      <Button className="w-full" disabled={loading}>{loading ? "Creating account..." : "Create account"}</Button>
    </form>
  );
}
