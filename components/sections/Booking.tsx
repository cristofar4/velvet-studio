"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { Reveal, SplitWords } from "@/components/fx/Reveal";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ambientVideo, artists, bookingTimes, services, site } from "@/lib/data";
import { cn } from "@/lib/utils";

type FormState = {
  name: string; email: string; phone: string;
  service: string; artist: string; date: string; time: string; notes: string;
};
const empty: FormState = { name: "", email: "", phone: "", service: "", artist: "Any artist", date: "", time: "", notes: "" };
type Errors = Partial<Record<keyof FormState, string>>;

function validate(form: FormState, todayISO: string): Errors {
  const e: Errors = {};
  if (form.name.trim().length < 2) e.name = "Tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "That email looks off.";
  if (form.phone.replace(/\D/g, "").length < 7) e.phone = "We need a number.";
  if (!form.service) e.service = "Choose a ritual.";
  if (!form.date) e.date = "Pick a day.";
  else if (form.date < todayISO) e.date = "That day has passed.";
  if (!form.time) e.time = "Reserve a time.";
  return e;
}

function Field({ label, error, children, className }: { label: string; error?: string; children: ReactNode; className?: string }) {
  return (
    <label className={cn("flex flex-col gap-2", className)}>
      <span className="flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ash">{label}</span>
        <AnimatePresence>
          {error && (
            <motion.span initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-[11px] text-ember">{error}</motion.span>
          )}
        </AnimatePresence>
      </span>
      {children}
    </label>
  );
}

const inputClass = (invalid?: boolean) =>
  cn(
    "w-full rounded-xl border bg-obsidian/70 px-4 py-3.5 text-sm text-bone placeholder:text-smoke transition-all duration-300 focus:outline-none focus:ring-1",
    invalid ? "border-ember/60 focus:border-ember focus:ring-ember/30" : "border-line focus:border-crimson/60 focus:ring-crimson/25 hover:border-line-strong"
  );

export default function Booking() {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const shake = useAnimationControls();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const todayISO = useMemo(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }, []);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const set = (k: keyof FormState) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (touched[k]) setErrors(validate({ ...form, [k]: v }, todayISO));
  };
  const blur = (k: keyof FormState) => () => { setTouched((t) => ({ ...t, [k]: true })); setErrors(validate(form, todayISO)); };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(form, todayISO);
    setErrors(found);
    setTouched({ name: true, email: true, phone: true, service: true, artist: true, date: true, time: true, notes: true });
    if (Object.keys(found).length) {
      shake.start({ x: [0, -10, 10, -7, 7, -3, 3, 0], transition: { duration: 0.55 } });
      return;
    }
    setStatus("submitting");
    timer.current = setTimeout(() => setStatus("success"), 1400);
  };

  const reset = () => { setStatus("idle"); setForm(empty); setTouched({}); setErrors({}); };
  const err = (k: keyof FormState) => (touched[k] ? errors[k] : undefined);

  const serviceName = services.find((s) => s.id === form.service)?.name ?? form.service;
  const prettyDate = useMemo(() => {
    try { return new Date(`${form.date}T00:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }); }
    catch { return form.date; }
  }, [form.date]);

  return (
    <section id="booking" className="relative overflow-hidden border-t border-line py-28 lg:py-36">
      <div className="pointer-events-none absolute -left-40 bottom-0 size-[480px] rounded-full bg-crimson/[0.06] blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        {/* invitation */}
        <div className="lg:col-span-5">
          <Reveal>
            <span className="mb-5 flex items-center gap-4">
              <span className="font-mono text-xs text-crimson">05</span>
              <span className="h-px w-10 bg-line-strong" />
              <span className="eyebrow">Reserve</span>
            </span>
          </Reveal>
          <h2 className="font-display text-4xl leading-[1.06] text-bone sm:text-5xl lg:text-6xl">
            <SplitWords text="Claim your chair" wordClassName={(_, i) => (i === 2 ? "italic text-crimson-gradient pr-1" : undefined)} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md leading-relaxed text-ash">
              Choose your ritual, your artist, and your hour. We hold every
              reservation with a hot towel waiting, arrive five minutes early
              and leave the rest to us.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="relative mt-10 overflow-hidden rounded-3xl border border-line shadow-edge">
              <video className="aspect-[16/10] w-full object-cover" autoPlay muted loop playsInline preload="none" poster={ambientVideo.poster} aria-label="Ambient footage of the atelier">
                {ambientVideo.sources.map((src) => <source key={src} src={src} type="video/mp4" />)}
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-crimson">The Atelier</p>
                  <p className="mt-1 text-sm text-bone">{site.address.join(", ")}</p>
                </div>
                <a href={site.phoneHref} className="rounded-full border border-line bg-obsidian/60 px-4 py-2 font-mono text-[11px] tracking-wider text-bone backdrop-blur transition-colors hover:border-crimson/60">
                  {site.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* form */}
        <Reveal delay={0.1} className="lg:col-span-7">
          <motion.form animate={shake} onSubmit={submit} noValidate className="glass relative flex flex-col gap-6 rounded-3xl p-7 sm:p-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Full name" error={err("name")}>
                <input type="text" value={form.name} onChange={(e) => set("name")(e.target.value)} onBlur={blur("name")} placeholder="James Sterling" autoComplete="name" className={inputClass(!!err("name"))} />
              </Field>
              <Field label="Phone" error={err("phone")}>
                <input type="tel" value={form.phone} onChange={(e) => set("phone")(e.target.value)} onBlur={blur("phone")} placeholder="+1 (212) 555 0123" autoComplete="tel" className={inputClass(!!err("phone"))} />
              </Field>
            </div>
            <Field label="Email" error={err("email")}>
              <input type="email" value={form.email} onChange={(e) => set("email")(e.target.value)} onBlur={blur("email")} placeholder="james@sterling.co" autoComplete="email" className={inputClass(!!err("email"))} />
            </Field>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Ritual" error={err("service")}>
                <div className="relative">
                  <select value={form.service} onChange={(e) => set("service")(e.target.value)} onBlur={blur("service")} className={cn(inputClass(!!err("service")), "appearance-none pr-10", !form.service && "text-smoke")}>
                    <option value="" disabled>Select a ritual</option>
                    {services.map((s) => <option key={s.id} value={s.id} className="bg-ink text-bone">{s.name}, ${s.price}</option>)}
                  </select>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-crimson"><path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </Field>
              <Field label="Artist">
                <div className="relative">
                  <select value={form.artist} onChange={(e) => set("artist")(e.target.value)} className={cn(inputClass(false), "appearance-none pr-10")}>
                    <option value="Any artist" className="bg-ink text-bone">Any artist</option>
                    {artists.map((a) => <option key={a.id} value={a.name} className="bg-ink text-bone">{a.name}</option>)}
                  </select>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-crimson"><path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </Field>
            </div>

            <Field label="Date" error={err("date")}>
              <input type="date" value={form.date} min={todayISO} suppressHydrationWarning onChange={(e) => set("date")(e.target.value)} onBlur={blur("date")} className={cn(inputClass(!!err("date")), "[color-scheme:dark]")} />
            </Field>

            <Field label="Time" error={err("time")}>
              <div className="flex flex-wrap gap-2.5">
                {bookingTimes.map((slot) => {
                  const on = form.time === slot;
                  return (
                    <button key={slot} type="button" onClick={() => { set("time")(slot); setTouched((t) => ({ ...t, time: true })); }} aria-pressed={on}
                      className={cn("rounded-full border px-4 py-2 font-mono text-xs tabular-nums transition-all duration-300", on ? "border-crimson bg-crimson text-bone shadow-glow-crimson" : "border-line text-ash hover:border-crimson/50 hover:text-bone")}>
                      {slot}
                    </button>
                  );
                })}
              </div>
            </Field>

            <Field label="Notes, optional">
              <textarea value={form.notes} onChange={(e) => set("notes")(e.target.value)} rows={3} placeholder="Reference photos, sensitivities, the story of your last bad haircut." className={cn(inputClass(false), "resize-none")} />
            </Field>

            <Button type="submit" disabled={status === "submitting"} magnetic={false} variant="crimson" className="w-full disabled:cursor-wait disabled:opacity-80">
              {status === "submitting" ? (
                <>
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }} className="size-4 rounded-full border-2 border-bone/30 border-t-bone" />
                  Holding your chair…
                </>
              ) : "Confirm Reservation"}
            </Button>
            <p className="-mt-2 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-smoke">
              No payment today, settle in the lounge
            </p>
          </motion.form>
        </Reveal>
      </div>

      <Dialog open={status === "success"} onOpenChange={(o) => { if (!o) reset(); }}>
        <DialogContent>
          <div className="relative mx-auto flex size-20 items-center justify-center">
            <motion.svg viewBox="0 0 80 80" className="absolute inset-0">
              <motion.circle cx="40" cy="40" r="37" fill="none" stroke="#c8102e" strokeWidth="1.6" initial={{ pathLength: 0, rotate: -90 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease: "easeOut" }} />
            </motion.svg>
            <motion.svg viewBox="0 0 36 36" className="size-9">
              <motion.path d="M6 19l8 8L30 9" fill="none" stroke="#f1ece2" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.55, duration: 0.5, ease: "easeOut" }} />
            </motion.svg>
          </div>
          <DialogHeader>
            <DialogTitle>Reservation <span className="italic text-crimson-gradient">confirmed</span></DialogTitle>
            <DialogDescription>
              The chair is yours{form.name ? `, ${form.name.split(" ")[0]}` : ""}. A confirmation is on its way to {form.email}.
            </DialogDescription>
          </DialogHeader>
          <dl className="mt-2 flex flex-col divide-y divide-line rounded-2xl border border-line bg-obsidian/50">
            {[["Ritual", serviceName], ["Artist", form.artist], ["When", `${prettyDate} · ${form.time}`]].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between px-5 py-3.5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-smoke">{k}</dt>
                <dd className="text-sm text-bone">{v}</dd>
              </div>
            ))}
          </dl>
          <Button onClick={reset} magnetic={false} variant="bone" className="mt-2 w-full">Until then</Button>
        </DialogContent>
      </Dialog>
    </section>
  );
}
