"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useLenis } from "@/components/providers/SmoothScroll";
import { Reveal, SplitWords } from "@/components/fx/Reveal";
import { Button } from "@/components/ui/Button";
import { ambientVideo, barbers, bookingTimes, services, site } from "@/lib/data";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  barber: string;
  date: string;
  time: string;
  notes: string;
};

const empty: FormState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  barber: "Any master",
  date: "",
  time: "",
  notes: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

function validate(form: FormState, todayISO: string): Errors {
  const errors: Errors = {};
  if (form.name.trim().length < 2) errors.name = "Tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "That email doesn't look right.";
  if (form.phone.replace(/\D/g, "").length < 7)
    errors.phone = "We need a number to confirm.";
  if (!form.service) errors.service = "Choose your ritual.";
  if (!form.date) errors.date = "Pick a day.";
  else if (form.date < todayISO) errors.date = "That day has passed.";
  if (!form.time) errors.time = "Reserve a time.";
  return errors;
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-2", className)}>
      <span className="flex items-baseline justify-between">
        <span className="eyebrow text-[10px]! tracking-[0.3em]!">{label}</span>
        <AnimatePresence>
          {error && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-[11px] text-red-300"
            >
              {error}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      {children}
    </label>
  );
}

const inputClass = (invalid?: boolean) =>
  cn(
    "w-full rounded-xl border bg-night/70 px-4 py-3.5 text-sm text-cream placeholder:text-mist",
    "transition-all duration-300 focus:outline-none focus:ring-1",
    invalid
      ? "border-red-400/50 focus:border-red-300 focus:ring-red-300/30"
      : "border-line focus:border-gold/60 focus:ring-gold/30 hover:border-cream/20"
  );

function SuccessModal({
  form,
  onClose,
}: {
  form: FormState;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const serviceName =
    services.find((s) => s.id === form.service)?.name ?? form.service;

  const prettyDate = useMemo(() => {
    try {
      return new Date(`${form.date}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
    } catch {
      return form.date;
    }
  }, [form.date]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="glass-deep fixed inset-0 z-[180] flex items-center justify-center p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Reservation confirmed"
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-gold/30 bg-onyx p-9 shadow-glow-gold"
      >
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[140%] -translate-x-1/2 rounded-[100%] bg-gold/10 blur-3xl" />

        {/* animated gold check */}
        <div className="relative mx-auto flex size-20 items-center justify-center">
          <motion.svg viewBox="0 0 80 80" className="absolute inset-0">
            <motion.circle
              cx="40"
              cy="40"
              r="37"
              fill="none"
              stroke="url(#ring-gold)"
              strokeWidth="1.6"
              initial={{ pathLength: 0, rotate: -90 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="ring-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f1e3bf" />
                <stop offset="100%" stopColor="#b18d57" />
              </linearGradient>
            </defs>
          </motion.svg>
          <motion.svg viewBox="0 0 36 36" className="size-9">
            <motion.path
              d="M6 19l8 8L30 9"
              fill="none"
              stroke="#f1e3bf"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.55, duration: 0.5, ease: "easeOut" }}
            />
          </motion.svg>
        </div>

        <h3 className="mt-6 text-center font-display text-3xl text-cream">
          Reservation <span className="italic text-gold-gradient">confirmed</span>
        </h3>
        <p className="mt-2 text-center text-sm text-fog">
          The chair is yours, {form.name.split(" ")[0]}. A confirmation is on
          its way to {form.email}.
        </p>

        <dl className="mt-7 flex flex-col divide-y divide-line rounded-2xl border border-line bg-night/50">
          {[
            ["Ritual", serviceName],
            ["Master", form.barber],
            ["When", `${prettyDate} · ${form.time}`],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between px-5 py-3.5">
              <dt className="eyebrow text-[10px]! text-mist!">{k}</dt>
              <dd className="text-sm text-champagne">{v}</dd>
            </div>
          ))}
        </dl>

        <Button onClick={onClose} className="mt-7 w-full" magnetic={false}>
          Until then
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default function Booking() {
  const lenis = useLenis();
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const shake = useAnimationControls();
  const submitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const todayISO = useMemo(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 10);
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (status === "success") lenis.stop();
    else lenis.start();
  }, [status, lenis]);

  useEffect(() => {
    return () => {
      if (submitTimer.current) clearTimeout(submitTimer.current);
    };
  }, []);

  const set = (key: keyof FormState) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (touched[key]) {
      setErrors(validate({ ...form, [key]: value }, todayISO));
    }
  };

  const blur = (key: keyof FormState) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(form, todayISO));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(form, todayISO);
    setErrors(found);
    setTouched({
      name: true, email: true, phone: true, service: true,
      barber: true, date: true, time: true, notes: true,
    });
    if (Object.keys(found).length > 0) {
      shake.start({
        x: [0, -10, 10, -7, 7, -3, 3, 0],
        transition: { duration: 0.55 },
      });
      return;
    }
    setStatus("submitting");
    submitTimer.current = setTimeout(() => setStatus("success"), 1400);
  };

  const closeSuccess = () => {
    setStatus("idle");
    setForm(empty);
    setTouched({});
    setErrors({});
  };

  const err = (k: keyof FormState) => (touched[k] ? errors[k] : undefined);

  return (
    <section id="book" className="relative overflow-hidden py-28 lg:py-36">
      <div className="pointer-events-none absolute -left-40 bottom-0 size-[480px] rounded-full bg-gold/[0.05] blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        {/* left: invitation */}
        <div className="lg:col-span-5">
          <Reveal>
            <span className="flex items-center gap-4">
              <span className="hairline-gold w-10" />
              <span className="eyebrow">Reserve</span>
            </span>
          </Reveal>
          <h2 className="mt-5 font-display text-4xl leading-[1.08] text-cream sm:text-5xl lg:text-6xl">
            <SplitWords
              text="Book your appointment"
              wordClassName={(_, i) => (i === 2 ? "italic text-gold-gradient pr-1" : undefined)}
            />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md leading-relaxed text-fog">
              Choose your ritual, your master, and your hour. We hold every
              reservation with a hot towel waiting, arrive five minutes early
              and leave the rest to us.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="relative mt-10 overflow-hidden rounded-3xl border border-line shadow-card">
              <video
                className="aspect-[16/10] w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster={ambientVideo.poster}
                aria-label="Ambient footage of fades being cut at Velvet Fade Studio"
              >
                {ambientVideo.sources.map((src) => (
                  <source key={src} src={src} type="video/mp4" />
                ))}
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                <div>
                  <p className="eyebrow text-[10px]!">The Studio</p>
                  <p className="mt-1 text-sm text-cream">{site.address.join(", ")}</p>
                </div>
                <a
                  href={site.phoneHref}
                  className="rounded-full border border-line bg-night/60 px-4 py-2 text-xs tracking-wider text-champagne backdrop-blur transition-colors hover:border-gold/60"
                >
                  {site.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* right: the form */}
        <Reveal delay={0.1} className="lg:col-span-7">
          <motion.form
            animate={shake}
            onSubmit={submit}
            noValidate
            className="glass relative flex flex-col gap-6 rounded-3xl p-7 sm:p-10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Full name" error={err("name")}>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name")(e.target.value)}
                  onBlur={blur("name")}
                  placeholder="James Sterling"
                  autoComplete="name"
                  className={inputClass(!!err("name"))}
                />
              </Field>
              <Field label="Phone" error={err("phone")}>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone")(e.target.value)}
                  onBlur={blur("phone")}
                  placeholder="+1 (212) 555-0123"
                  autoComplete="tel"
                  className={inputClass(!!err("phone"))}
                />
              </Field>
            </div>

            <Field label="Email" error={err("email")}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email")(e.target.value)}
                onBlur={blur("email")}
                placeholder="james@sterling.co"
                autoComplete="email"
                className={inputClass(!!err("email"))}
              />
            </Field>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Ritual" error={err("service")}>
                <div className="relative">
                  <select
                    value={form.service}
                    onChange={(e) => set("service")(e.target.value)}
                    onBlur={blur("service")}
                    className={cn(inputClass(!!err("service")), "appearance-none pr-10", !form.service && "text-mist")}
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id} className="bg-onyx text-cream">
                        {s.name}, from ${s.price}
                      </option>
                    ))}
                  </select>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-gold">
                    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Field>
              <Field label="Master" error={err("barber")}>
                <div className="relative">
                  <select
                    value={form.barber}
                    onChange={(e) => set("barber")(e.target.value)}
                    className={cn(inputClass(false), "appearance-none pr-10")}
                  >
                    <option value="Any master" className="bg-onyx text-cream">
                      Any master
                    </option>
                    {barbers.map((b) => (
                      <option key={b.id} value={b.name} className="bg-onyx text-cream">
                        {b.name}
                      </option>
                    ))}
                  </select>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-gold">
                    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Field>
            </div>

            <Field label="Date" error={err("date")}>
              <input
                type="date"
                value={form.date}
                min={todayISO}
                suppressHydrationWarning
                onChange={(e) => set("date")(e.target.value)}
                onBlur={blur("date")}
                className={cn(inputClass(!!err("date")), "[color-scheme:dark]")}
              />
            </Field>

            <Field label="Time" error={err("time")}>
              <div className="flex flex-wrap gap-2.5">
                {bookingTimes.map((slot) => {
                  const active = form.time === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        set("time")(slot);
                        setTouched((t) => ({ ...t, time: true }));
                      }}
                      className={cn(
                        "rounded-full border px-4 py-2 text-xs tracking-wider tabular-nums transition-all duration-300",
                        active
                          ? "border-gold bg-gold text-night shadow-glow-gold"
                          : "border-line text-fog hover:border-gold/50 hover:text-champagne"
                      )}
                      aria-pressed={active}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </Field>

            <Field label="Notes, optional">
              <textarea
                value={form.notes}
                onChange={(e) => set("notes")(e.target.value)}
                rows={3}
                placeholder="Reference photos, skin sensitivities, the story of your last bad haircut…"
                className={cn(inputClass(false), "resize-none")}
              />
            </Field>

            <Button
              type="submit"
              disabled={status === "submitting"}
              magnetic={false}
              className="w-full disabled:cursor-wait disabled:opacity-80"
            >
              {status === "submitting" ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                    className="size-4 rounded-full border-2 border-night/30 border-t-night"
                  />
                  Holding your chair…
                </>
              ) : (
                "Confirm Reservation"
              )}
            </Button>
            <p className="-mt-2 text-center text-[11px] tracking-wide text-mist">
              No payment today, settle in the lounge, cancel anytime up to 12h before.
            </p>
          </motion.form>
        </Reveal>
      </div>

      <AnimatePresence>
        {status === "success" && <SuccessModal form={form} onClose={closeSuccess} />}
      </AnimatePresence>
    </section>
  );
}
