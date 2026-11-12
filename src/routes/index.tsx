import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  BadgeCheck,
  BarChart3,
  Bell,
  Check,
  ChevronDown,
  CircleHelp,
  Clapperboard,
  Clock3,
  Film,
  Globe2,
  Layers3,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  Radio,
  Scissors,
  Settings2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Upload,
  WandSparkles,
  X,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { marketingPlans } from "@/lib/marketing-plans";
import studioImage from "@/assets/creator-studio-campaign.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Studvi — Your channel, on autopilot" },
      { name: "description", content: "Script, produce, and publish short-form video across every channel. Your faceless content operation, finally running itself." },
      { property: "og:title", content: "Studvi — Your channel, on autopilot" },
      { property: "og:description", content: "Script, produce, and publish short-form video across every channel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const features = [
  { icon: MessageSquareText, number: "01", title: "Scripts with a pulse.", description: "Scroll-stopping hooks, niche-tuned storytelling, and pacing engineered to keep them watching." },
  { icon: AudioLines, number: "02", title: "Voices that feel human.", description: "Expressive, natural-sounding voiceovers in the tone and accent that fit your brand." },
  { icon: Scissors, number: "03", title: "Every frame, figured out.", description: "Matched footage, kinetic captions, and polished transitions. The edit just happens." },
  { icon: WandSparkles, number: "04", title: "A thumbnail worth stopping for.", description: "On-brand, bold visual hooks designed to make the next scroll a click." },
  { icon: Radio, number: "05", title: "One idea. Everywhere.", description: "Schedule the finished cut across TikTok, Reels, Shorts, and X, all in one place." },
];

const faqs = [
  { q: "What does Studvi do?", a: "It turns your channel strategy into a repeatable video workflow: scripts, voiceovers, edits, captions, thumbnails, and a ready-to-schedule publishing calendar." },
  { q: "Do I need to be on camera?", a: "No. Build faceless videos around your niche using voiceovers, selected footage, and a visual style that belongs to your brand." },
  { q: "Can I review a video before it goes out?", a: "Absolutely. Your workspace gives each video a clear status, preview, and review point before it reaches your publishing schedule." },
  { q: "Which channels can I publish to?", a: "The workflow is designed around TikTok, Instagram Reels, YouTube Shorts, and X, with publishing options shown in the workspace." },
];

const sampleVideos = [
  { title: "The 2-minute habit that changed everything", niche: "Mindset & habits", stage: "Rendering", time: "Today · 4:30 PM", color: "from-violet-soft/40 to-primary/10", progress: 72 },
  { title: "Why your morning coffee hits differently", niche: "Coffee culture", stage: "Voice synthesis", time: "Today · 6:00 PM", color: "from-neon/25 to-secondary", progress: 38 },
  { title: "5 places you have to see once", niche: "Travel stories", stage: "Script drafting", time: "Tomorrow · 9:15 AM", color: "from-chart-3/35 to-primary/10", progress: 17 },
  { title: "Your next big idea starts here", niche: "Creator economy", stage: "Scheduled", time: "Tomorrow · 12:30 PM", color: "from-chart-4/25 to-primary/15", progress: 100 },
];

type WorkspaceTab = "overview" | "channels" | "pipeline" | "agency";

function Index() {
  const navigate = useNavigate();
  const [workspace, setWorkspace] = useState(false);
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("overview");
  const [annual, setAnnual] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [frequency, setFrequency] = useState("Daily");
  const [niche, setNiche] = useState("");
  const [newChannel, setNewChannel] = useState("");
  const [channelCount, setChannelCount] = useState(3);
  const [queueItems, setQueueItems] = useState(sampleVideos);
  const [brand, setBrand] = useState("Studvi");
  const [saved, setSaved] = useState(false);
  const [playing, setPlaying] = useState(false);

  const enterWorkspace = (tab: WorkspaceTab = "overview") => {
    setActiveTab(tab);
    setWorkspace(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addChannel = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newChannel.trim()) return;
    setChannelCount((count) => count + 1);
    setNewChannel("");
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2400);
  };

  const addToQueue = () => {
    const idea = niche.trim() || "A fresh idea for your channel";
    setQueueItems((items) => [{ title: idea, niche: "New video", stage: "Script drafting", time: "Just now", color: "from-violet-soft/40 to-primary/10", progress: 8 }, ...items]);
    setNiche("");
    setActiveTab("pipeline");
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-y-0 left-0 z-0 hidden w-1/2 studio-grid opacity-25 lg:block" aria-hidden="true" />
      <div className="relative z-10">
        {workspace ? (
          <Workspace
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            returnHome={() => setWorkspace(false)}
            queueItems={queueItems}
            addToQueue={addToQueue}
            niche={niche}
            setNiche={setNiche}
            frequency={frequency}
            setFrequency={setFrequency}
            channelCount={channelCount}
            newChannel={newChannel}
            setNewChannel={setNewChannel}
            addChannel={addChannel}
            brand={brand}
            setBrand={setBrand}
            saved={saved}
            setSaved={setSaved}
          />
        ) : (
          <>
            <MarketingNav onStart={() => void navigate({ to: "/auth", search: { mode: "signup" } })} mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
            <section className="relative isolate min-h-[740px] border-b border-border/60 lg:min-h-[800px]" aria-labelledby="hero-heading">
              <div className="absolute inset-0 -z-20 bg-background" />
              <img src={studioImage} alt="A creator studio set up for producing faceless short-form videos" width={1536} height={1024} fetchPriority="high" className="studio-image absolute inset-0 -z-10 h-full w-full object-cover object-[62%_center] opacity-90" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/80 to-transparent" />
              <div className="mx-auto flex min-h-[740px] max-w-7xl items-center px-5 pb-20 pt-24 sm:px-8 lg:min-h-[800px] lg:px-12">
                <div className="max-w-[690px]">
                  <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border/80 bg-panel/70 px-3 py-1.5 text-xs font-medium text-faint backdrop-blur-md">
                    <span className="relative flex size-2"><span className="live-pulse absolute inline-flex size-full rounded-full bg-neon opacity-70" /><span className="relative inline-flex size-2 rounded-full bg-neon" /></span>
                    THE CONTENT ENGINE FOR YOUR NEXT CHAPTER
                    <ArrowUpRight className="size-3.5 text-neon" />
                  </div>
                  <h1 id="hero-heading" className="font-display text-[clamp(2.8rem,6vw,5rem)] font-semibold leading-[1.03] tracking-[-0.045em] text-foreground">
                    Your channel.<br />
                    <span className="bg-gradient-to-r from-violet-soft via-primary to-neon bg-clip-text text-transparent">On autopilot.</span>
                  </h1>
                  <p className="mt-6 max-w-[560px] text-base leading-7 text-faint sm:text-lg sm:leading-8">
                    Faceless video, handled. From the first hook to the final upload, your entire content operation runs on one beautifully simple workflow.
                  </p>
                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <Button onClick={() => void navigate({ to: "/auth", search: { mode: "signup" } })} size="lg" className="h-12 rounded-sm bg-primary px-6 text-primary-foreground shadow-[0_0_36px_color-mix(in_oklab,var(--primary)_28%,transparent)] hover:bg-primary/90">
                      Start your channel <ArrowRight className="size-4" />
                    </Button>
                    <Button onClick={() => setDemoOpen(true)} variant="outline" size="lg" className="h-12 rounded-sm border-border/80 bg-panel/45 px-5 text-foreground backdrop-blur-md hover:bg-accent">
                      <span className="flex size-6 items-center justify-center rounded-full border border-border/80"><Play className="ml-0.5 size-3 fill-current" /></span>
                      Watch the 2-min demo
                    </Button>
                  </div>
                  <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Check className="size-3.5 text-neon" /> No camera needed</span>
                    <span className="flex items-center gap-1.5"><Check className="size-3.5 text-neon" /> Start with 30 videos / month</span>
                    <span className="flex items-center gap-1.5"><Check className="size-3.5 text-neon" /> You stay in control</span>
                  </div>
                </div>
                <div className="float-soft absolute bottom-16 right-[7%] hidden w-[310px] lg:block xl:right-[12%]">
                  <div className="rounded-md border border-border/80 bg-panel/80 p-4 shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center justify-between border-b border-border/70 pb-3">
                      <div className="flex items-center gap-2"><span className="flex size-7 items-center justify-center rounded-sm bg-primary/15 text-primary"><Clapperboard className="size-3.5" /></span><span className="text-xs font-medium">Production queue</span></div>
                      <span className="flex items-center gap-1.5 text-[10px] text-neon"><span className="live-pulse size-1.5 rounded-full bg-neon" /> LIVE</span>
                    </div>
                    <QueuePreview />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px signal-line" />
              </div>
            </section>

            <section className="border-b border-border/60 bg-panel/40" aria-label="Platform coverage">
              <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 py-6 text-sm text-muted-foreground sm:px-8 lg:justify-between lg:px-12">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">ONE WORKFLOW. EVERY FEED.</span>
                <span className="flex items-center gap-2 font-medium"><span className="text-sm font-bold">♪</span> TikTok</span>
                <span className="flex items-center gap-2 font-medium"><span className="flex size-4 items-center justify-center rounded-[4px] border border-current text-[9px]">◎</span> Instagram Reels</span>
                <span className="flex items-center gap-2 font-medium"><Youtube className="size-4" /> YouTube Shorts</span>
                <span className="flex items-center gap-2 font-medium"><X className="size-3.5" /> X</span>
              </div>
            </section>

            <section id="features" className="scroll-mt-20 border-b border-border/60 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
              <div className="mx-auto max-w-7xl">
                <SectionHeading eyebrow="THE WHOLE OPERATION" title={<>Five moving parts.<br /><span className="text-muted-foreground">One calm dashboard.</span></>} description="The production stack that once needed a team now runs together, from first idea to the final frame." />
                <div className="mt-14 grid gap-px overflow-hidden border border-border/65 bg-border/65 sm:grid-cols-2 lg:grid-cols-5">
                  {features.map(({ icon: Icon, number, title, description }) => (
                    <article key={number} className="group min-h-[245px] bg-background p-6 transition-colors hover:bg-panel/90 sm:p-7">
                      <div className="flex items-center justify-between"><span className="flex size-10 items-center justify-center rounded-sm border border-primary/20 bg-primary/10 text-primary transition-transform duration-300 group-hover:-translate-y-1"><Icon className="size-4" /></span><span className="font-mono text-[10px] text-muted-foreground">{number}</span></div>
                      <h3 className="mt-7 font-display text-lg font-medium tracking-[-0.02em]">{title}</h3>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
                    </article>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border border-border/60 bg-panel/35 px-5 py-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground"><BadgeCheck className="size-4 text-neon" /> Built around a human review at every step that matters.</div>
                  <button type="button" onClick={() => enterWorkspace("pipeline")} className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-violet-soft">See the pipeline <ArrowRight className="size-3.5" /></button>
                </div>
              </div>
            </section>

            <section id="how-it-works" className="scroll-mt-20 border-b border-border/60 bg-panel/30 px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
              <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
                <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-neon">HOW IT WORKS</p><h2 className="mt-5 font-display text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">An entire content team.<br /><span className="text-muted-foreground">A few clicks from here.</span></h2><p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">Start with your audience. We shape the storytelling, assemble the edit, then keep your channel moving while you focus on the bigger picture.</p><Button onClick={() => enterWorkspace("channels")} className="mt-8 rounded-sm bg-primary text-primary-foreground">Build your first channel <ArrowRight className="size-4" /></Button></div>
                <div className="space-y-0 border-y border-border/70">
                  {[{ number: "01", title: "Tell us what you’re building", description: "Pick a niche, an audience, and a voice that sounds like your brand.", icon: Settings2 }, { number: "02", title: "Review your production queue", description: "Watch your scripts, voiceovers, and edits move forward in one place.", icon: Layers3 }, { number: "03", title: "Show up everywhere", description: "Schedule the finished cut across the feeds your audience loves.", icon: Globe2 }].map((step) => <div key={step.number} className="flex gap-5 border-b border-border/70 py-6 last:border-b-0"><span className="pt-1 font-mono text-xs text-primary">{step.number}</span><span className="flex min-w-0 flex-1 gap-4"><span className="flex size-10 shrink-0 items-center justify-center border border-border/70 bg-background text-violet-soft"><step.icon className="size-4" /></span><span><span className="block font-display text-lg font-medium">{step.title}</span><span className="mt-1 block text-sm leading-6 text-muted-foreground">{step.description}</span></span></span></div>)}
                </div>
              </div>
            </section>

            <section className="border-b border-border/60 px-5 py-20 sm:px-8 lg:px-12">
              <div className="mx-auto max-w-7xl overflow-hidden border border-border/70 bg-panel/60">
                <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="flex flex-col justify-center p-7 sm:p-11"><span className="flex size-10 items-center justify-center border border-neon/20 bg-neon/10 text-neon"><TrendingUp className="size-4" /></span><p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-neon">THE MATH JUST MAKES SENSE</p><h2 className="mt-3 font-display text-3xl font-medium leading-tight tracking-[-0.03em] sm:text-4xl">Your best idea shouldn’t wait for your calendar.</h2><p className="mt-4 text-sm leading-6 text-muted-foreground">One ready-to-publish short-form video, priced at less than a good lunch. Get back the hours that make your next big move possible.</p><Button onClick={() => enterWorkspace()} variant="outline" className="mt-7 w-fit rounded-sm">Explore your workspace <ArrowRight className="size-4" /></Button></div>
                  <div className="relative flex min-h-[330px] flex-col justify-end overflow-hidden p-7 sm:p-11"><img src={studioImage} alt="A content studio with short-form videos ready to produce" width={1536} height={1024} loading="lazy" className="absolute inset-0 size-full object-cover object-[62%_center] opacity-65" /><div className="absolute inset-0 bg-gradient-to-r from-panel via-panel/75 to-panel/25" /><div className="relative grid grid-cols-2 gap-3 sm:grid-cols-3"><MiniMetric label="Your focus" value="More ideas" /><MiniMetric label="Your hours back" value="~20 / mo" /><MiniMetric label="Videos in motion" value="Every week" /></div></div>
                </div>
              </div>
            </section>

            <section id="pricing" className="scroll-mt-20 border-b border-border/60 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
              <div className="mx-auto max-w-7xl">
                <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end"><SectionHeading eyebrow="SIMPLE, BY DESIGN" title={<>Find your pace.<br /><span className="text-muted-foreground">Keep your edge.</span></>} description="Straightforward plans that grow with your channel, not ahead of it." /><div className="inline-flex w-fit items-center gap-1 rounded-sm border border-border bg-panel p-1"><button type="button" onClick={() => setAnnual(false)} className={`rounded-[3px] px-4 py-2 text-xs transition-colors ${annual ? "text-muted-foreground" : "bg-accent text-foreground"}`}>Monthly</button><button type="button" onClick={() => setAnnual(true)} className={`flex items-center gap-2 rounded-[3px] px-4 py-2 text-xs transition-colors ${annual ? "bg-accent text-foreground" : "text-muted-foreground"}`}>Annual <span className="text-neon">−20%</span></button></div></div>
                <div className="mt-12 grid border border-border/70 md:grid-cols-3">
                  {marketingPlans.map((plan, i) => <article key={plan.name} className={`relative flex flex-col p-6 sm:p-8 ${i > 0 ? "border-t border-border/70 md:border-l md:border-t-0" : ""} ${i === 1 ? "bg-panel/65" : "bg-background"}`}>
                    {i === 1 && <span className="absolute right-5 top-5 flex items-center gap-1.5 border border-primary/25 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-violet-soft"><Sparkles className="size-3" /> MOST POPULAR</span>}
                    <p className="text-sm font-medium">{plan.name}</p><p className="mt-2 min-h-6 text-xs text-muted-foreground">{plan.description}</p>
                    <div className="mt-7 flex items-baseline gap-1"><span className="font-display text-5xl font-medium tracking-[-0.05em]">${annual ? plan.annual : plan.monthly}</span><span className="text-sm text-muted-foreground">/ month</span></div>
                    {annual && <p className="mt-1 text-xs text-muted-foreground">Billed annually</p>}
                    <Button onClick={() => void navigate({ to: "/auth", search: { mode: "signup" } })} className={`mt-7 h-11 rounded-sm ${i === 1 ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border-border text-foreground"}`} variant={i === 1 ? "default" : "outline"}>Get started <ArrowRight className="size-4" /></Button>
                    <div className="my-6 h-px bg-border/70" /><p className="text-xs font-medium text-muted-foreground">WHAT’S INCLUDED</p><ul className="mt-4 space-y-3 text-sm text-faint"><li className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-neon" />{plan.videos}</li><li className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-neon" />{plan.channels}</li>{plan.extras.map((extra) => <li key={extra} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-neon" />{extra}</li>)}</ul>
                  </article>)}
                </div>
                <p className="mt-5 text-center text-xs text-muted-foreground">Every plan starts with your own production workspace. No surprise setup fees.</p>
              </div>
            </section>

            <section className="border-b border-border/60 bg-panel/25 px-5 py-20 sm:px-8 lg:px-12">
              <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-neon">BUILT FOR PEOPLE BUILDING</p><h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-[-0.03em] sm:text-4xl">Room for creators.<br />Ready for agencies.</h2><p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">Bring your clients into the same thoughtful production workflow, with a workspace that keeps your name front and center.</p><Button onClick={() => enterWorkspace("agency")} variant="outline" className="mt-6 rounded-sm">Explore agency workspace <ArrowRight className="size-4" /></Button></div><div className="grid grid-cols-2 gap-px border border-border/70 bg-border/70 sm:grid-cols-4">{[{ label: "CLIENT SPACES", value: "10+", icon: Layers3 }, { label: "BRAND IT YOUR WAY", value: "Yours", icon: WandSparkles }, { label: "CLIENT ACCESS", value: "One link", icon: Globe2 }, { label: "REPORTS", value: "On-brand", icon: BarChart3 }].map(({ label, value, icon: Icon }) => <div key={label} className="flex min-h-[135px] flex-col justify-between bg-background p-4 sm:min-h-[150px] sm:p-5"><Icon className="size-4 text-primary" /><div><p className="font-display text-xl font-medium">{value}</p><p className="mt-1 text-[9px] font-semibold tracking-[0.12em] text-muted-foreground sm:text-[10px]">{label}</p></div></div>)}</div></div>
            </section>

            <section className="border-b border-border/60 px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
              <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]"><SectionHeading eyebrow="A FEW GOOD QUESTIONS" title={<>Good to know<br /><span className="text-muted-foreground">before we begin.</span></>} description="The details that make the difference when choosing how your channel grows." /><div className="divide-y divide-border/70 border-y border-border/70">{faqs.map(({ q, a }, index) => <details key={q} className="group py-5" open={index === 0}><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-medium marker:content-none sm:text-lg"><span>{q}</span><ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" /></summary><p className="mt-3 max-w-xl pr-8 text-sm leading-6 text-muted-foreground">{a}</p></details>)}</div></div>
            </section>

            <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="relative mx-auto max-w-7xl overflow-hidden border border-border/70 bg-panel/60 px-6 py-12 sm:px-12 sm:py-16"><div className="pointer-events-none absolute inset-0 studio-grid opacity-20" /><div className="relative flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-neon">YOUR NEXT VIDEO STARTS HERE</p><h2 className="mt-4 max-w-2xl font-display text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">Let your channel become the one they remember.</h2></div><Button onClick={() => void navigate({ to: "/auth", search: { mode: "signup" } })} size="lg" className="h-12 shrink-0 rounded-sm bg-primary px-6 text-primary-foreground">Start building <ArrowRight className="size-4" /></Button></div></div></section>
            <MarketingFooter onStart={() => enterWorkspace()} />
          </>
        )}
      </div>

      <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
        <DialogContent className="max-w-[min(94vw,800px)] gap-0 overflow-hidden border-border bg-panel p-0 sm:rounded-sm">
          <DialogHeader className="flex-row items-center justify-between border-b border-border/70 px-5 py-4 pr-12 text-left"><div><DialogTitle className="font-display text-base">A calmer way to create</DialogTitle><DialogDescription className="mt-1 text-xs">Your content workflow, start to finish</DialogDescription></div><span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-muted-foreground"><span className="size-1.5 rounded-full bg-neon" /> Product preview</span></DialogHeader>
          <div className="relative aspect-video overflow-hidden"><img src={studioImage} alt="Creator video production studio preview" width={1536} height={1024} className="absolute inset-0 size-full object-cover"/><div className="absolute inset-0 bg-background/45"/><div className="absolute inset-0 flex flex-col items-center justify-center"><button type="button" onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause demo" : "Play demo"} className="play-orbit flex size-16 items-center justify-center rounded-full border border-border/80 bg-panel/75 text-foreground backdrop-blur-md transition-transform hover:scale-105">{playing ? <Pause className="size-5 fill-current"/> : <Play className="ml-1 size-5 fill-current"/>}</button><p className="mt-6 font-display text-xl font-medium">{playing ? "Your production flow is in motion." : "See the whole workflow, in two minutes."}</p><p className="mt-2 text-sm text-faint">A quick look inside Studvi</p></div><div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 bg-background/75 px-4 py-3 backdrop-blur-md"><span className="text-xs text-muted-foreground">{playing ? "0:36" : "0:00"}</span><div className="h-1 flex-1 overflow-hidden rounded-full bg-secondary"><div className={`h-full rounded-full bg-primary transition-all ${playing ? "w-1/3" : "w-0"}`}/></div><span className="text-xs text-muted-foreground">2:00</span></div></div>
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"><div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground"><span className="flex items-center gap-1.5"><Check className="size-3.5 text-neon"/> Script to screen</span><span className="flex items-center gap-1.5"><Check className="size-3.5 text-neon"/> One tidy queue</span></div><Button onClick={() => { setDemoOpen(false); enterWorkspace(); }} className="rounded-sm bg-primary text-primary-foreground">Open the workspace <ArrowRight className="size-4"/></Button></div>
        </DialogContent>
      </Dialog>
    </main>
  );
}

function MarketingNav({ onStart, mobileMenu, setMobileMenu }: { onStart: () => void; mobileMenu: boolean; setMobileMenu: (open: boolean) => void }) {
  return <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl"><div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12"><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2.5"><span className="flex size-8 items-center justify-center border border-primary/25 bg-primary/10 text-primary"><Clapperboard className="size-4"/></span><span className="font-display text-[15px] font-semibold tracking-[-0.03em]">Studvi</span></button><nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation"><a href="#features" className="text-xs text-muted-foreground transition-colors hover:text-foreground">What it does</a><a href="#how-it-works" className="text-xs text-muted-foreground transition-colors hover:text-foreground">How it works</a><a href="#pricing" className="text-xs text-muted-foreground transition-colors hover:text-foreground">Pricing</a><button type="button" onClick={onStart} className="text-xs text-muted-foreground transition-colors hover:text-foreground">Agency portal</button></nav><div className="flex items-center gap-2"><Button asChild variant="ghost" className="hidden text-xs text-muted-foreground sm:inline-flex"><Link to="/auth" search={{ mode: "signin" }}>Log in</Link></Button><Button onClick={onStart} size="sm" className="rounded-sm bg-primary px-4 text-primary-foreground">Get started <ArrowRight className="size-3.5"/></Button><Button aria-label="Toggle navigation" variant="ghost" size="icon" onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden"><Menu className="size-4"/></Button></div></div>{mobileMenu && <nav className="grid gap-1 border-t border-border/70 bg-background px-5 py-3 lg:hidden" aria-label="Mobile navigation"><a onClick={() => setMobileMenu(false)} href="#features" className="py-2.5 text-sm text-faint">What it does</a><a onClick={() => setMobileMenu(false)} href="#how-it-works" className="py-2.5 text-sm text-faint">How it works</a><a onClick={() => setMobileMenu(false)} href="#pricing" className="py-2.5 text-sm text-faint">Pricing</a><button type="button" onClick={onStart} className="py-2.5 text-left text-sm text-faint">Agency portal</button><Link to="/auth" search={{ mode: "signin" }} onClick={() => setMobileMenu(false)} className="py-2.5 text-sm text-faint">Log in</Link></nav>}</header>;
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: React.ReactNode; description: string }) {
  return <div className="max-w-xl"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-neon">{eyebrow}</p><h2 className="mt-4 font-display text-4xl font-medium leading-[1.12] tracking-[-0.04em] sm:text-5xl">{title}</h2><p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">{description}</p></div>;
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return <div className="border border-border/70 bg-panel/80 p-4 backdrop-blur-md"><p className="text-[10px] text-muted-foreground">{label}</p><p className="mt-2 font-display text-lg font-medium">{value}</p></div>;
}

function QueuePreview() {
  const steps = [{ label: "Scripting", icon: MessageSquareText }, { label: "Voice synthesis", icon: AudioLines }, { label: "Rendering", icon: Clapperboard }, { label: "Ready to post", icon: Check }];
  return <div className="pt-3"><p className="text-xs font-medium">How a 30-sec video changed my routine</p><div className="mt-4 space-y-2.5">{steps.map(({ label, icon: Icon }, index) => <div key={label} className={`queue-slide flex items-center justify-between border border-border/70 px-3 py-2.5 ${index < 3 ? "bg-panel-raised/75" : "bg-neon/5"}`} style={{ animationDelay: `${index * 130}ms` }}><span className="flex items-center gap-2.5 text-xs text-faint"><Icon className={`size-3.5 ${index < 3 ? "text-violet-soft" : "text-neon"}`} />{label}</span><span className="text-[10px] text-muted-foreground">{index < 3 ? "Done" : "Next"}</span></div>)}</div><div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3 text-[10px] text-muted-foreground"><span>Across 4 channels</span><span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-neon"/> Production active</span></div></div>;
}

function Workspace({ activeTab, setActiveTab, returnHome, queueItems, addToQueue, niche, setNiche, frequency, setFrequency, channelCount, newChannel, setNewChannel, addChannel, brand, setBrand, saved, setSaved }: {
  activeTab: WorkspaceTab; setActiveTab: (tab: WorkspaceTab) => void; returnHome: () => void;
  queueItems: typeof sampleVideos; addToQueue: () => void; niche: string; setNiche: (value: string) => void;
  frequency: string; setFrequency: (value: string) => void; channelCount: number; newChannel: string;
  setNewChannel: (value: string) => void; addChannel: (event: FormEvent<HTMLFormElement>) => void;
  brand: string; setBrand: (value: string) => void; saved: boolean; setSaved: (value: boolean) => void;
}) {
  const [showComposer, setShowComposer] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [connected, setConnected] = useState<string[]>(["TikTok", "YouTube"]);
  const [logoName, setLogoName] = useState("");
  const navItems: { id: WorkspaceTab; label: string; icon: typeof BarChart3 }[] = [{ id: "overview", label: "Overview", icon: BarChart3 }, { id: "channels", label: "Channels", icon: Radio }, { id: "pipeline", label: "Content pipeline", icon: Layers3 }, { id: "agency", label: "Agency portal", icon: ShieldCheck }];
  const notice = () => { setSaved(true); window.setTimeout(() => setSaved(false), 2600); };

  return <div className="min-h-screen bg-background">
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/70 bg-background/90 px-4 backdrop-blur-xl lg:px-8">
      <div className="flex items-center gap-3"><Button variant="ghost" size="icon" aria-label="Back to Studvi home" onClick={returnHome} className="size-8 text-muted-foreground"><ArrowLeft className="size-4"/></Button><span className="flex size-8 items-center justify-center border border-primary/25 bg-primary/10 text-primary"><Clapperboard className="size-4"/></span><span className="hidden font-display text-sm font-semibold sm:inline">Studvi</span><span className="mx-1 hidden h-5 w-px bg-border sm:block"/><span className="hidden text-xs text-muted-foreground sm:inline">Creator workspace</span></div>
      <div className="flex items-center gap-2 sm:gap-3"><span className="hidden items-center gap-2 border border-border/70 bg-panel px-2.5 py-1.5 text-[10px] text-muted-foreground md:flex"><span className="live-pulse size-1.5 rounded-full bg-neon"/> All systems operational</span><Button variant="ghost" size="icon" aria-label="Notifications" className="size-8 text-muted-foreground"><Bell className="size-4"/></Button><button type="button" onClick={() => setActiveTab("agency")} className="flex size-8 items-center justify-center border border-border/80 bg-accent font-display text-xs font-semibold text-violet-soft" aria-label="Open account settings">ST</button></div>
    </header>
    <div className="mx-auto flex max-w-[1600px]">
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-[235px] shrink-0 flex-col border-r border-border/70 bg-panel/25 p-4 md:flex">
        <div className="px-2 pb-4 pt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">WORKSPACE</div>
        <nav className="space-y-1" aria-label="Workspace navigation">{navItems.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => setActiveTab(id)} className={`flex w-full items-center gap-3 border px-3 py-2.5 text-left text-[13px] transition-colors ${activeTab === id ? "border-primary/20 bg-primary/10 text-foreground" : "border-transparent text-muted-foreground hover:bg-accent/60 hover:text-foreground"}`}><Icon className={`size-4 ${activeTab === id ? "text-violet-soft" : ""}`}/>{label}{id === "pipeline" && <span className="ml-auto border border-border bg-panel px-1.5 py-0.5 text-[9px] text-muted-foreground">{queueItems.length}</span>}</button>)}</nav>
        <div className="mt-8 px-2 pb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">YOUR CHANNELS</div>
        <button type="button" onClick={() => setActiveTab("channels")} className="flex items-center gap-2.5 px-3 py-2 text-left text-xs text-faint hover:text-foreground"><span className="flex size-6 items-center justify-center border border-chart-1/25 bg-chart-1/10 text-[9px] text-violet-soft">MH</span> Mindful Momentum <span className="ml-auto size-1.5 rounded-full bg-neon"/></button>
        <button type="button" onClick={() => setActiveTab("channels")} className="flex items-center gap-2.5 px-3 py-2 text-left text-xs text-faint hover:text-foreground"><span className="flex size-6 items-center justify-center border border-chart-4/25 bg-chart-4/10 text-[9px] text-chart-4">CC</span> Coffee, Actually <span className="ml-auto size-1.5 rounded-full bg-neon"/></button>
        <button type="button" onClick={() => setActiveTab("channels")} className="mt-1 flex items-center gap-2 px-3 py-2 text-left text-xs text-muted-foreground hover:text-foreground"><Plus className="size-3.5"/> Add a channel</button>
        <div className="mt-auto border-t border-border/70 pt-4"><div className="border border-border/70 bg-panel/60 p-3"><div className="flex items-center justify-between text-[10px]"><span className="text-muted-foreground">Monthly videos</span><span className="font-medium text-foreground">18 / 30</span></div><div className="mt-2 h-1 overflow-hidden bg-secondary"><div className="h-full w-3/5 bg-primary"/></div><button type="button" onClick={() => setActiveTab("agency")} className="mt-3 flex items-center gap-1 text-[10px] text-violet-soft">View your plan <ArrowRight className="size-3"/></button></div><div className="mt-3 flex items-center gap-2 px-1 text-[10px] text-muted-foreground"><CircleHelp className="size-3.5"/> Need a hand? <button type="button" onClick={() => setActiveTab("agency")} className="text-faint hover:text-foreground">Contact support</button></div></div>
      </aside>
      <div className="min-w-0 flex-1">
        <div className="sticky top-16 z-20 flex gap-1 overflow-x-auto border-b border-border/70 bg-background/95 px-4 py-2 backdrop-blur md:hidden">{navItems.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => setActiveTab(id)} className={`flex shrink-0 items-center gap-2 px-3 py-2 text-xs ${activeTab === id ? "border-b-2 border-primary text-foreground" : "text-muted-foreground"}`}><Icon className="size-3.5"/>{label}</button>)}</div>
        <div className="mx-auto max-w-[1150px] px-4 py-7 sm:px-7 lg:px-10 lg:py-9">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2 text-xs text-muted-foreground"><span>Workspace</span><span>/</span><span className="text-foreground">{navItems.find((item) => item.id === activeTab)?.label}</span></div><div className="flex items-center gap-2"><Button onClick={() => setShowComposer(true)} variant="outline" size="sm" className="rounded-sm"><Plus className="size-3.5"/> New video</Button><Button onClick={() => setActiveTab("channels")} size="sm" className="rounded-sm bg-primary text-primary-foreground"><Plus className="size-3.5"/> New channel</Button></div></div>
          {activeTab === "overview" && <Overview queueItems={queueItems} setActiveTab={setActiveTab} setSelectedVideo={setSelectedVideo}/>}
          {activeTab === "channels" && <Channels niche={niche} setNiche={setNiche} frequency={frequency} setFrequency={setFrequency} channelCount={channelCount} newChannel={newChannel} setNewChannel={setNewChannel} addChannel={addChannel} saved={saved} connected={connected} setConnected={setConnected} onSave={notice}/>}
          {activeTab === "pipeline" && <Pipeline queueItems={queueItems} setSelectedVideo={setSelectedVideo} onCompose={() => setShowComposer(true)}/>}
          {activeTab === "agency" && <Agency brand={brand} setBrand={setBrand} saved={saved} onSave={notice} logoName={logoName} setLogoName={setLogoName}/>}
        </div>
      </div>
    </div>
    <Dialog open={showComposer} onOpenChange={setShowComposer}><DialogContent className="border-border bg-panel sm:rounded-sm"><DialogHeader className="text-left"><DialogTitle className="font-display text-xl">Create a new video</DialogTitle><DialogDescription>Start with one idea. The production queue takes it from there.</DialogDescription></DialogHeader><form onSubmit={(event) => { event.preventDefault(); addToQueue(); setShowComposer(false); }} className="space-y-4"><label className="block space-y-2 text-sm"><span className="text-faint">What should this video be about?</span><textarea autoFocus value={niche} onChange={(event) => setNiche(event.target.value)} placeholder="e.g. The tiny habit that makes mornings easier" className="min-h-24 w-full resize-y border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"/></label><div className="flex flex-wrap items-center justify-between gap-3"><span className="text-xs text-muted-foreground">Queued to your default channel</span><Button type="submit" className="rounded-sm bg-primary text-primary-foreground"><Sparkles className="size-4"/> Start production</Button></div></form></DialogContent></Dialog>
    <Dialog open={!!selectedVideo} onOpenChange={(open) => { if (!open) setSelectedVideo(null); }}><DialogContent className="max-w-[min(92vw,620px)] border-border bg-panel sm:rounded-sm"><DialogHeader className="pr-8 text-left"><DialogTitle className="font-display text-xl">{selectedVideo}</DialogTitle><DialogDescription>Production details for this video</DialogDescription></DialogHeader><div className="mt-3"><div className="aspect-video overflow-hidden border border-border/70"><img src={studioImage} alt="Video production preview" width={1536} height={1024} className="size-full object-cover"/></div><div className="mt-4 grid grid-cols-2 gap-3"><MiniMetric label="SCRIPT" value="Retention-ready"/><MiniMetric label="PUBLISH TO" value="3 channels"/></div><div className="mt-4 flex items-center gap-2 text-xs text-neon"><span className="live-pulse size-1.5 rounded-full bg-neon"/> Production status up to date</div></div></DialogContent></Dialog>
  </div>;
}

function WorkspaceTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="mb-7"><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-primary">{eyebrow}</p><h1 className="mt-2 font-display text-3xl font-medium tracking-[-0.035em] sm:text-4xl">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p></div>;
}

function Overview({ queueItems, setActiveTab, setSelectedVideo }: { queueItems: typeof sampleVideos; setActiveTab: (tab: WorkspaceTab) => void; setSelectedVideo: (title: string) => void }) {
  const metrics = [{ label: "VIDEOS PRODUCED", value: "18", change: "+6 this week", icon: Film }, { label: "TOTAL VIEWS", value: "284.6K", change: "+18.2% this month", icon: TrendingUp }, { label: "ACTIVE CHANNELS", value: "3", change: "All publishing", icon: Radio }, { label: "ON THE CALENDAR", value: "12", change: "Next 7 days", icon: Clock3 }];
  const bars = [36, 54, 42, 67, 46, 78, 56, 72, 50, 88, 61, 74, 48, 92, 66, 80, 58, 96, 70, 84, 60, 90, 74, 100, 70, 86, 62, 94];
  return <><WorkspaceTitle eyebrow="MONDAY, MAY 18" title="Your content, in motion." description="Here’s how your channels are doing. Everything important, all in one glance."/><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{metrics.map(({ label, value, change, icon: Icon }) => <div key={label} className="border border-border/70 bg-panel/45 p-4 sm:p-5"><div className="flex items-center justify-between"><span className="text-[10px] font-semibold tracking-[0.1em] text-muted-foreground">{label}</span><Icon className="size-4 text-muted-foreground"/></div><div className="mt-4 flex items-end justify-between gap-2"><span className="font-display text-3xl font-medium tracking-[-0.035em]">{value}</span><span className="mb-1 text-[10px] text-neon">{change}</span></div></div>)}</div>
    <div className="mt-4 grid gap-4 xl:grid-cols-[1.55fr_1fr]"><section className="border border-border/70 bg-panel/35 p-5 sm:p-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="font-display text-lg font-medium">Views over time</h2><p className="mt-1 text-xs text-muted-foreground">Your audience is showing up. Keep the rhythm.</p></div><select aria-label="Analytics time period" className="border border-border bg-panel px-3 py-2 text-xs text-faint focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"><option>Last 30 days</option><option>Last 7 days</option><option>This year</option></select></div><div className="mt-6 flex h-40 items-end gap-[3px] border-b border-l border-border/60 px-2 pb-0 sm:gap-1">{bars.map((height, i) => <div key={`${height}-${i}`} title={`${height * 245} views`} className={`group relative min-w-0 flex-1 transition-all hover:bg-violet-soft ${i > 19 ? "bg-primary/75" : "bg-primary/35"}`} style={{ height: `${height}%` }}/>)}</div><div className="mt-2 flex justify-between text-[9px] text-muted-foreground"><span>APR 19</span><span>APR 26</span><span>MAY 3</span><span>MAY 10</span><span>MAY 18</span></div><div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[10px] text-muted-foreground"><span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-primary"/> Total short-form views</span><span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-neon"/> +18.2% from last period</span></div></section>
      <section className="border border-border/70 bg-panel/35 p-5 sm:p-6"><div className="flex items-center justify-between"><div><h2 className="font-display text-lg font-medium">Next on deck</h2><p className="mt-1 text-xs text-muted-foreground">Your content, ready for its moment.</p></div><button type="button" onClick={() => setActiveTab("pipeline")} className="flex size-8 items-center justify-center border border-border text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="View full content pipeline"><ArrowUpRight className="size-4"/></button></div><div className="mt-5 space-y-3">{queueItems.slice(0, 3).map((video, i) => <button type="button" key={video.title} onClick={() => setSelectedVideo(video.title)} className="flex w-full items-center gap-3 border-b border-border/60 pb-3 text-left last:border-0 last:pb-0"><span className={`flex size-10 shrink-0 items-center justify-center bg-gradient-to-br ${video.color} text-violet-soft`}><Film className="size-4"/></span><span className="min-w-0 flex-1"><span className="block truncate text-xs font-medium">{video.title}</span><span className="mt-1 block text-[10px] text-muted-foreground">{video.time}</span></span><span className={`shrink-0 text-[9px] ${i === 3 ? "text-neon" : "text-violet-soft"}`}>{video.stage}</span></button>)}</div><button type="button" onClick={() => setActiveTab("pipeline")} className="mt-4 flex items-center gap-1.5 text-xs text-violet-soft hover:text-foreground">Open the full queue <ArrowRight className="size-3.5"/></button></section></div>
    <section className="mt-4 border border-border/70 bg-panel/35 p-5 sm:p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-display text-lg font-medium">Publishing schedule</h2><p className="mt-1 text-xs text-muted-foreground">A steady beat across your connected channels.</p></div><span className="flex items-center gap-1.5 border border-neon/15 bg-neon/5 px-2.5 py-1.5 text-[10px] text-neon"><span className="live-pulse size-1.5 rounded-full bg-neon"/> AUTO-POSTING ACTIVE</span></div><div className="mt-5 grid gap-2 sm:grid-cols-3">{[{ day: "TODAY · 4:30 PM", title: "A tiny habit with a big effect", platform: "TikTok · Mindful Momentum", icon: Radio }, { day: "TODAY · 6:00 PM", title: "The perfect morning pour", platform: "Shorts · Coffee, Actually", icon: Youtube }, { day: "TOMORROW · 9:15 AM", title: "Somewhere worth getting lost", platform: "Reels · Slow Travel", icon: Globe2 }].map(({ day, title, platform, icon: Icon }) => <div key={title} className="flex gap-3 border border-border/60 bg-background/60 p-3"><span className="flex size-8 shrink-0 items-center justify-center border border-border/70 text-muted-foreground"><Icon className="size-3.5"/></span><span className="min-w-0"><span className="block text-[9px] font-medium tracking-wide text-violet-soft">{day}</span><span className="mt-1 block truncate text-xs font-medium">{title}</span><span className="mt-1 block truncate text-[10px] text-muted-foreground">{platform}</span></span></div>)}</div></section>
  </>;
}

function Channels({ niche, setNiche, frequency, setFrequency, channelCount, newChannel, setNewChannel, addChannel, saved, connected, setConnected, onSave }: { niche: string; setNiche: (value: string) => void; frequency: string; setFrequency: (value: string) => void; channelCount: number; newChannel: string; setNewChannel: (value: string) => void; addChannel: (event: FormEvent<HTMLFormElement>) => void; saved: boolean; connected: string[]; setConnected: (value: string[]) => void; onSave: () => void }) {
  const accounts = [{ name: "TikTok", icon: Radio, detail: "Short-form discovery" }, { name: "Instagram", icon: MessageSquareText, detail: "Reels & your community" }, { name: "YouTube", icon: Youtube, detail: "Shorts & subscribers" }, { name: "X", icon: X, detail: "Ideas in real time" }];
  const [tone, setTone] = useState("Warm & conversational");
  const [audience, setAudience] = useState("People growing healthier habits");
  return <><WorkspaceTitle eyebrow="CHANNEL STUDIO" title="Shape your channel." description="Set the details once. Every video starts with a better sense of who it’s for."/><div className="grid gap-4 xl:grid-cols-[1.35fr_0.85fr]"><section className="space-y-4"><div className="border border-border/70 bg-panel/35 p-5 sm:p-6"><div className="flex items-start justify-between gap-4"><div><h2 className="font-display text-lg font-medium">Channel identity</h2><p className="mt-1 text-xs text-muted-foreground">The foundation for every script and edit.</p></div><span className="flex size-10 items-center justify-center border border-primary/20 bg-primary/10 font-display text-xs font-semibold text-violet-soft">MH</span></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="space-y-2 text-xs"><span className="text-faint">CHANNEL NAME</span><input defaultValue="Mindful Momentum" className="h-10 w-full border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"/></label><label className="space-y-2 text-xs"><span className="text-faint">YOUR NICHE</span><input value={niche} onChange={(event) => setNiche(event.target.value)} placeholder="e.g. Mindful living" className="h-10 w-full border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"/></label><label className="space-y-2 text-xs sm:col-span-2"><span className="text-faint">WHO YOU’RE TALKING TO</span><input value={audience} onChange={(event) => setAudience(event.target.value)} className="h-10 w-full border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"/></label><label className="space-y-2 text-xs"><span className="text-faint">BRAND VOICE</span><select value={tone} onChange={(event) => setTone(event.target.value)} className="h-10 w-full border border-input bg-background px-3 text-sm text-faint focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"><option>Warm & conversational</option><option>Bold & energetic</option><option>Thoughtful & inspiring</option><option>Playful & witty</option></select></label><label className="space-y-2 text-xs"><span className="text-faint">PUBLISHING RHYTHM</span><select value={frequency} onChange={(event) => setFrequency(event.target.value)} className="h-10 w-full border border-input bg-background px-3 text-sm text-faint focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"><option>Daily</option><option>Three times a week</option><option>Weekly</option></select></label></div><div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-4"><span className="text-xs text-muted-foreground">Changes apply to your next video.</span><Button onClick={onSave} className="rounded-sm bg-primary text-primary-foreground"><Check className="size-3.5"/>{saved ? "Settings saved" : "Save channel"}</Button></div></div>
    <div className="border border-border/70 bg-panel/35 p-5 sm:p-6"><div className="flex items-start justify-between"><div><h2 className="font-display text-lg font-medium">Linked accounts</h2><p className="mt-1 text-xs text-muted-foreground">Choose where each video can find its audience.</p></div><span className="text-xs text-muted-foreground">{connected.length} connected</span></div><div className="mt-4 grid gap-2 sm:grid-cols-2">{accounts.map(({ name, icon: Icon, detail }) => { const isConnected = connected.includes(name); return <div key={name} className="flex items-center gap-3 border border-border/60 bg-background/50 p-3"><span className="flex size-9 items-center justify-center border border-border/70 text-faint"><Icon className="size-4"/></span><span className="min-w-0 flex-1"><span className="block text-xs font-medium">{name}</span><span className="mt-0.5 block truncate text-[10px] text-muted-foreground">{isConnected ? "Connected · Ready to publish" : detail}</span></span><Button onClick={() => setConnected(isConnected ? connected.filter((item) => item !== name) : [...connected, name])} variant="outline" size="sm" className="h-7 rounded-sm px-2 text-[10px]">{isConnected ? "Connected" : "Connect"}</Button></div>; })}</div></div></section>
    <aside className="space-y-4"><div className="border border-border/70 bg-panel/35 p-5"><div className="flex items-center justify-between"><div><h2 className="font-display text-base font-medium">Your channels</h2><p className="mt-1 text-xs text-muted-foreground">{channelCount} of 3 slots in use</p></div><span className="font-display text-xl font-medium">{String(channelCount).padStart(2, "0")}<span className="text-muted-foreground"> / 03</span></span></div><div className="mt-4 h-1.5 bg-secondary"><div className="h-full bg-primary transition-all" style={{ width: `${Math.min(100, channelCount / 3 * 100)}%` }}/></div><form onSubmit={addChannel} className="mt-5 flex gap-2"><input value={newChannel} onChange={(event) => setNewChannel(event.target.value)} placeholder="New channel name" aria-label="New channel name" className="h-9 min-w-0 flex-1 border border-input bg-background px-3 text-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"/><Button type="submit" variant="outline" size="sm" className="h-9 rounded-sm px-3"><Plus className="size-3.5"/> Add</Button></form>{saved && <p className="mt-2 text-[10px] text-neon">Your channel was added to this workspace.</p>}</div><div className="border border-primary/15 bg-primary/5 p-5"><span className="flex size-9 items-center justify-center border border-primary/25 bg-primary/10 text-violet-soft"><Sparkles className="size-4"/></span><h3 className="mt-4 font-display text-base font-medium">Make it yours</h3><p className="mt-2 text-xs leading-5 text-muted-foreground">Dial in your audience and brand voice before your next script takes shape.</p><div className="mt-4 border-t border-border/70 pt-3 text-[10px] text-muted-foreground">Voice preset <span className="float-right text-faint">{tone}</span></div></div></aside></div></>;
}

function Pipeline({ queueItems, setSelectedVideo, onCompose }: { queueItems: typeof sampleVideos; setSelectedVideo: (title: string) => void; onCompose: () => void }) {
  const stages = ["All videos", "In production", "Scheduled", "Published"];
  const [filter, setFilter] = useState("All videos");
  const visibleItems = queueItems.filter((video) => filter === "All videos" || (filter === "In production" && !["Scheduled", "Published"].includes(video.stage)) || video.stage === filter);
  return <><WorkspaceTitle eyebrow="THE PRODUCTION FLOOR" title="Your next posts, in the making." description="Every script, every cut, every scheduled post, moving through one tidy queue."/><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div className="flex flex-wrap gap-1 border border-border/70 bg-panel/45 p-1">{stages.map((stage) => <button type="button" key={stage} onClick={() => setFilter(stage)} className={`px-3 py-1.5 text-[10px] transition-colors ${filter === stage ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"}`}>{stage}</button>)}</div><span className="text-[10px] text-muted-foreground">{visibleItems.length} videos shown</span></div><div className="overflow-hidden border border-border/70 bg-panel/25"><div className="hidden grid-cols-[minmax(200px,1.5fr)_minmax(90px,0.7fr)_minmax(100px,0.7fr)_minmax(95px,0.65fr)_40px] gap-3 border-b border-border/70 bg-panel/50 px-4 py-3 text-[9px] font-semibold tracking-[0.1em] text-muted-foreground sm:grid"><span>VIDEO</span><span>STATUS</span><span>PROGRESS</span><span>WHEN</span><span/></div>{visibleItems.length ? visibleItems.map((video) => <button type="button" key={`${video.title}-${video.time}`} onClick={() => setSelectedVideo(video.title)} className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-3 border-b border-border/60 px-4 py-4 text-left transition-colors last:border-b-0 hover:bg-accent/35 sm:grid-cols-[minmax(200px,1.5fr)_minmax(90px,0.7fr)_minmax(100px,0.7fr)_minmax(95px,0.65fr)_40px] sm:gap-3"><span className="flex min-w-0 items-center gap-3"><span className={`flex size-10 shrink-0 items-center justify-center bg-gradient-to-br ${video.color} text-violet-soft`}><Film className="size-4"/></span><span className="min-w-0"><span className="block truncate text-xs font-medium">{video.title}</span><span className="mt-1 block text-[10px] text-muted-foreground">{video.niche}</span></span></span><span className="flex items-center gap-1.5 text-[10px] text-violet-soft"><span className={`size-1.5 rounded-full ${video.stage === "Scheduled" || video.stage === "Published" ? "bg-neon" : "bg-primary"}`}/>{video.stage}</span><span className="col-span-2 flex items-center gap-2 sm:col-span-1"><span className="h-1 flex-1 bg-secondary"><span className="block h-full bg-primary" style={{ width: `${video.progress}%` }}/></span><span className="w-8 text-right text-[9px] text-muted-foreground">{video.progress}%</span></span><span className="text-[10px] text-muted-foreground">{video.time}</span><MoreHorizontal className="hidden size-4 text-muted-foreground sm:block"/></button>) : <div className="p-10 text-center text-sm text-muted-foreground">Nothing here just yet. Choose another view or add a new video.</div>}</div><div className="mt-4 flex flex-wrap items-center justify-between gap-3 border border-border/60 bg-panel/30 px-4 py-3"><span className="flex items-center gap-2 text-xs text-muted-foreground"><span className="live-pulse size-1.5 rounded-full bg-neon"/> Your production workflow is up to date.</span><Button onClick={onCompose} size="sm" className="rounded-sm bg-primary text-primary-foreground"><Plus className="size-3.5"/> Add a video</Button></div></>;
}

function Agency({ brand, setBrand, saved, onSave, logoName, setLogoName }: { brand: string; setBrand: (value: string) => void; saved: boolean; onSave: () => void; logoName: string; setLogoName: (value: string) => void }) {
  const [clientLink, setClientLink] = useState("studio.studvi.com/mindful-momentum");
  const [reports, setReports] = useState(true);
  return <><WorkspaceTitle eyebrow="YOUR AGENCY, YOUR NAME" title="A client experience that feels like yours." description="Make every workspace, report, and handoff feel unmistakably on brand."/><div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]"><section className="space-y-4"><div className="border border-border/70 bg-panel/35 p-5 sm:p-6"><div><h2 className="font-display text-lg font-medium">Brand identity</h2><p className="mt-1 text-xs text-muted-foreground">Set how your agency shows up across the client portal.</p></div><div className="mt-6"><div className="flex flex-wrap items-center gap-4 border border-dashed border-border bg-background/50 p-4"><span className="flex size-14 items-center justify-center border border-primary/20 bg-primary/10 text-primary"><Clapperboard className="size-6"/></span><span className="min-w-0 flex-1"><span className="block text-xs font-medium">Agency logo</span><span className="mt-1 block truncate text-[10px] text-muted-foreground">{logoName || "SVG, PNG or JPG · up to 5 MB"}</span></span><label className="inline-flex h-8 cursor-pointer items-center gap-1.5 border border-border px-3 text-[10px] text-faint transition-colors hover:bg-accent"><Upload className="size-3.5"/> Upload logo<input className="sr-only" type="file" accept="image/png,image/jpeg,image/svg+xml" onChange={(event) => { const file = event.target.files?.[0]; if (file) setLogoName(file.name); }}/></label></div><label className="mt-4 block space-y-2 text-xs"><span className="text-faint">DISPLAY NAME</span><input value={brand} onChange={(event) => setBrand(event.target.value)} className="h-10 w-full border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"/></label><label className="mt-4 block space-y-2 text-xs"><span className="text-faint">CLIENT PORTAL ADDRESS</span><div className="flex min-w-0 items-center border border-input bg-background"><span className="hidden shrink-0 border-r border-border px-3 py-2.5 text-[10px] text-muted-foreground sm:block">https://</span><input value={clientLink} onChange={(event) => setClientLink(event.target.value)} className="h-10 min-w-0 flex-1 bg-transparent px-3 text-xs focus-visible:outline-none"/></div></label></div><div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-4"><span className="text-xs text-muted-foreground">Your clients see the changes next time they visit.</span><Button onClick={onSave} className="rounded-sm bg-primary text-primary-foreground"><Check className="size-3.5"/>{saved ? "Brand saved" : "Save brand"}</Button></div></div>
      <div className="flex items-center justify-between gap-4 border border-border/70 bg-panel/35 p-5"><div className="flex items-start gap-3"><span className="flex size-9 items-center justify-center border border-border/70 text-violet-soft"><BarChart3 className="size-4"/></span><span><span className="block text-sm font-medium">Branded client reports</span><span className="mt-1 block text-xs text-muted-foreground">Your logo and colors on every report.</span></span></div><button type="button" role="switch" aria-checked={reports} aria-label="Toggle branded client reports" onClick={() => setReports(!reports)} className={`relative h-5 w-9 shrink-0 transition-colors ${reports ? "bg-neon/70" : "bg-secondary"}`}><span className={`absolute top-0.5 size-4 bg-foreground transition-transform ${reports ? "translate-x-[18px]" : "translate-x-0.5"}`}/></button></div></section>
    <aside className="space-y-4"><div className="border border-border/70 bg-panel/35 p-5"><div className="flex items-center justify-between"><div><h2 className="font-display text-base font-medium">Client workspaces</h2><p className="mt-1 text-xs text-muted-foreground">Your agency plan at a glance.</p></div><Layers3 className="size-4 text-violet-soft"/></div><div className="mt-5 grid grid-cols-2 gap-px border border-border/70 bg-border/70"><div className="bg-background p-4"><p className="font-display text-2xl font-medium">08</p><p className="mt-1 text-[9px] text-muted-foreground">ACTIVE CLIENTS</p></div><div className="bg-background p-4"><p className="font-display text-2xl font-medium">10+</p><p className="mt-1 text-[9px] text-muted-foreground">WORKSPACES INCLUDED</p></div></div><div className="mt-4 flex items-center gap-2 text-[10px] text-neon"><BadgeCheck className="size-3.5"/> 2 workspaces available</div><Button variant="outline" className="mt-4 w-full rounded-sm" onClick={onSave}><Plus className="size-3.5"/> Invite a client</Button></div>
      <div className="border border-border/70 bg-background p-5"><div className="flex items-center justify-between"><p className="text-xs font-medium">CLIENT PORTAL PREVIEW</p><span className="flex items-center gap-1.5 text-[9px] text-neon"><span className="size-1.5 rounded-full bg-neon"/> ACTIVE</span></div><div className="mt-3 border border-border/70 bg-panel/70 p-4"><span className="flex items-center gap-2"><span className="flex size-7 items-center justify-center border border-primary/20 bg-primary/10 text-primary"><Clapperboard className="size-3.5"/></span><span className="font-display text-xs font-semibold">{brand || "Your studio"}</span></span><p className="mt-3 text-[10px] text-muted-foreground">Your content is moving along nicely.</p><div className="mt-3 flex gap-1.5">{[1, 2, 3].map((v) => <span key={v} className="h-1 flex-1 bg-neon/70"/>)}</div><p className="mt-2 text-right text-[9px] text-muted-foreground">3 videos in production</p></div><p className="mt-3 flex items-center gap-1.5 text-[10px] text-muted-foreground"><Globe2 className="size-3"/> {reports ? "Branded reports are enabled" : "Branded reports are paused"}</p></div></aside></div></>;
}

function MarketingFooter({ onStart }: { onStart: () => void }) {
  return <footer className="border-t border-border/70 bg-panel/20"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"><button type="button" onClick={onStart} className="flex items-center gap-2.5 self-start"><span className="flex size-7 items-center justify-center border border-primary/25 bg-primary/10 text-primary"><Clapperboard className="size-3.5"/></span><span className="font-display font-semibold">Studvi</span></button><p className="text-muted-foreground">The quieter way to make more noise.</p><span className="text-[10px] text-muted-foreground">© 2026 Studvi</span></div></footer>;
}