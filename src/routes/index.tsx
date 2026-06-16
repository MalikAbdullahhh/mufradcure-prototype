import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { BrandMark } from "@/components/Brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MufradCure — Healing Rooted in Nature, Guided by Clinical Clarity" },
      {
        name: "description",
        content:
          "MufradCure unites classical Unani Tibb with AI for Mizaaj-based diagnosis, bilingual prescriptions, diet plans and treatment progression tracking.",
      },
      { property: "og:title", content: "MufradCure — Unani Diagnosis Intelligence" },
      {
        property: "og:description",
        content: "Healing rooted in nature, guided by clinical clarity.",
      },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-hero-forest px-5 py-12 text-sidebar-foreground">
      {/* ambient leaf glow */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sidebar-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-cream/10 blur-3xl" />

      <Link
        to="/admin"
        className="absolute right-5 top-5 z-10 rounded-full border border-sidebar-border/60 px-4 py-2 text-xs font-600 text-sidebar-muted backdrop-blur transition-colors hover:text-sidebar-foreground"
      >
        Admin Portal →
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md text-center"
      >
        <div className="mb-8 flex justify-center">
          <BrandMark className="h-24 w-24 bg-sidebar-accent/20 text-sidebar-accent-foreground ring-1 ring-sidebar-border/60" />
        </div>

        <h1 className="font-display text-5xl font-700 tracking-tight">MufradCure</h1>
        <p dir="rtl" className="font-urdu mt-1 text-2xl text-sidebar-muted">
          مفرد کیور
        </p>

        <p className="mx-auto mt-5 max-w-sm text-base italic leading-relaxed text-sidebar-foreground/80">
          “Healing Rooted in Nature, Guided by Clinical Clarity”
        </p>

        <div className="mt-10 space-y-4">
          <Link
            to="/dashboard"
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-cream px-6 py-4 font-700 text-cream-foreground shadow-lift transition-transform hover:-translate-y-0.5"
          >
            Get Started
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="text-sm text-sidebar-muted">
            Already have an account?{" "}
            <Link to="/dashboard" className="font-700 text-sidebar-foreground underline-offset-4 hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        <p className="mt-12 inline-flex items-center gap-2 rounded-full bg-sidebar-border/30 px-4 py-2 text-xs font-600 text-sidebar-muted">
          <ShieldCheck className="h-3.5 w-3.5" /> Private, bilingual & explainable Unani care
        </p>
      </motion.div>
    </div>
  );
}
