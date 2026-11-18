"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, LogIn } from "lucide-react";
import AuthAside from "@/components/AuthAside";
import { ThemeToggle } from "@/components/Theme";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [notice, setNotice] = useState(false);
  return (
    <div className="grid min-h-screen bg-background min-[980px]:grid-cols-[1.02fr_0.98fr]">
      <AuthAside />

      <div className="flex flex-col gap-5 px-10 py-7 max-[980px]:px-5">
        <div className="flex items-center justify-between gap-3">
          <Button asChild variant="link" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground">
            <Link href="/"><ArrowLeft />Back to dashboard</Link>
          </Button>
          <ThemeToggle />
        </div>

        <Card className="m-auto w-full max-w-[420px] p-7 shadow-lift">
          <h1 className="text-2xl">Welcome back</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Sign in to pick up where your batches left off.</p>

          <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setNotice(true); }}>
            <Label htmlFor="email">Email
              <Input id="email" type="email" name="email" placeholder="you@creativeit.com" autoComplete="email" required />
            </Label>
            <Label htmlFor="password">Password
              <Input id="password" type="password" name="password" placeholder="••••••••" autoComplete="current-password" required />
            </Label>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <label htmlFor="remember" className="flex cursor-pointer items-center gap-2 text-xs font-medium text-muted-foreground">
                <Checkbox id="remember" name="remember" defaultChecked />
                Remember me
              </label>
              <Link href="/login" className="text-xs font-semibold text-success hover:underline">Forgot password?</Link>
            </div>
            <Button className="w-full"><LogIn />Sign in</Button>
            {notice && (
              <p className="rounded-lg border border-primary/25 bg-primary/10 px-3 py-2.5 text-xs font-medium text-primary">
                Design preview — connect your login endpoint to make this work.
              </p>
            )}
          </form>

          <p className="mt-5 border-t border-border pt-4 text-center text-sm text-muted-foreground">
            New here? <Link href="/signup" className="font-semibold text-success hover:underline">Create an account</Link>
          </p>
        </Card>

        <p className="mx-auto max-w-[420px] text-center text-xs text-muted-foreground">
          Interface only · no authentication is wired up yet
        </p>
      </div>
    </div>
  );
}
