import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Clapperboard, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => ({
    mode: search.mode === "signup" ? "signup" : "signin",
  }),
  head: () => ({
    meta: [
      { title: "Sign in or sign up — Studvi" },
      { name: "description", content: "Sign in or create your Studvi account to manage your video workflow." },
      { property: "og:title", content: "Sign in or sign up — Studvi" },
      { property: "og:description", content: "Access your Studvi creator workspace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { mode: initialMode } = Route.useSearch();
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setNotice("");
    setError("");
    try {
      if (mode === "signup") {
        const { data, error: signupError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: displayName.trim() },
          },
        });
        if (signupError) throw signupError;
        if (!data.session) {
          setNotice("Check your email for a confirmation link. Your account will be ready after you confirm your address.");
          return;
        }
        await navigate({ to: "/", replace: true });
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (signInError) throw signInError;
      await navigate({ to: "/", replace: true });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We couldn’t complete that request. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const signInWithProvider = async (provider: "google" | "apple") => {
    setBusy(true);
    setError("");
    try {
      const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin });
      if (result.error) throw result.error;
      if (!result.redirected) await navigate({ to: "/", replace: true });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We couldn’t start sign-in. Please try again.");
      setBusy(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 studio-grid opacity-20" aria-hidden="true" />
      <header className="relative z-10 mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link to="/" aria-label="Studvi home" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center border border-primary/25 bg-primary/10 text-primary"><Clapperboard className="size-4" /></span>
          <span className="font-display text-[15px] font-semibold">Studvi</span>
        </Link>
        <Link to="/" className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"><ArrowLeft className="size-3.5" /> Back to home</Link>
      </header>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-68px)] max-w-7xl items-center gap-12 px-5 pb-14 pt-6 sm:px-8 lg:grid-cols-[1fr_0.85fr] lg:gap-20 lg:px-12 lg:pb-20 lg:pt-8">
        <section className="max-w-xl py-8 lg:py-14">
          <span className="inline-flex size-11 items-center justify-center border border-neon/20 bg-neon/10 text-neon"><ShieldCheck className="size-5" /></span>
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-neon">YOUR CHANNEL, IN GOOD HANDS</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">A clearer path from idea to published.</h1>
          <p className="mt-5 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">Pick up where your next video begins. Your scripts, production queue, and channel plans are ready when you are.</p>
          <div className="mt-8 hidden space-y-3 text-sm text-faint sm:block">
            <p className="flex items-center gap-2.5"><CheckCircle2 className="size-4 text-neon" /> Your production workflow in one place</p>
            <p className="flex items-center gap-2.5"><CheckCircle2 className="size-4 text-neon" /> Built around your channel and brand</p>
            <p className="flex items-center gap-2.5"><CheckCircle2 className="size-4 text-neon" /> You stay in control before publishing</p>
          </div>
        </section>

        <section className="w-full max-w-md justify-self-center border-y border-border/70 bg-panel/55 px-5 py-7 sm:border sm:px-8 sm:py-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neon">STUDVI ACCOUNT</p>
          <h2 className="mt-3 font-display text-2xl font-semibold">{mode === "signin" ? "Welcome back." : "Start your channel."}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{mode === "signin" ? "Sign in to continue to your workspace." : "Create an account to build your workspace."}</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button type="button" variant="outline" disabled={busy} onClick={() => void signInWithProvider("google")} className="h-11 rounded-sm border-border bg-foreground px-2 text-[11px] text-background hover:bg-foreground/90 sm:px-3 sm:text-xs">
              <GoogleGlyph /> Continue with Google
            </Button>
            <Button type="button" disabled={busy} onClick={() => void signInWithProvider("apple")} className="h-11 rounded-sm bg-foreground px-2 text-[11px] text-background hover:bg-foreground/90 sm:px-3 sm:text-xs">
              Continue with Apple
            </Button>
          </div>

          <div className="my-6 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground"><span className="h-px flex-1 bg-border" /> or use email <span className="h-px flex-1 bg-border" /></div>

          <form onSubmit={submit} className="space-y-4">
            {mode === "signup" && <div className="space-y-2"><Label htmlFor="display-name" className="text-xs text-faint">Display name</Label><Input id="display-name" autoComplete="name" required value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder="Your name" disabled={busy} className="h-11 rounded-sm border-border bg-background text-sm" /></div>}
            <div className="space-y-2"><Label htmlFor="email" className="text-xs text-faint">Email address</Label><div className="relative"><Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" disabled={busy} className="h-11 rounded-sm border-border bg-background pl-10 text-sm" /></div></div>
            <div className="space-y-2"><Label htmlFor="password" className="text-xs text-faint">Password</Label><div className="relative"><LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input id="password" type={showPassword ? "text" : "password"} autoComplete={mode === "signin" ? "current-password" : "new-password"} required minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" disabled={busy} className="h-11 rounded-sm border-border bg-background pl-10 pr-10 text-sm" /><Button type="button" variant="ghost" size="icon" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((shown) => !shown)} className="absolute right-1 top-1/2 size-9 -translate-y-1/2 text-muted-foreground">{showPassword ? <EyeOff /> : <Eye />}</Button></div></div>
            {error && <p role="alert" className="text-xs leading-5 text-destructive">{error}</p>}
            {notice && <p role="status" className="border border-neon/20 bg-neon/5 p-3 text-xs leading-5 text-faint">{notice}</p>}
            <Button type="submit" disabled={busy} className="h-11 w-full rounded-sm bg-primary text-primary-foreground">{busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}</Button>
          </form>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            {mode === "signin" ? "New to Studvi?" : "Already have an account?"}{" "}
            <button type="button" onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(""); setNotice(""); }} className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-neon">{mode === "signin" ? "Create an account" : "Sign in"}</button>
          </p>
          <p className="mt-5 flex items-start justify-center gap-2 text-center text-[10px] leading-4 text-muted-foreground"><LockKeyhole className="mt-0.5 size-3 shrink-0" /> Your account details are protected and used only for your Studvi workspace.</p>
        </section>
      </div>
    </main>
  );
}

function GoogleGlyph() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px] shrink-0"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>;
}
