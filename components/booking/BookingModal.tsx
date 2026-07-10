"use client";

import { useEffect, useRef, useState } from "react";
import { useBooking } from "@/context/BookingContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, ArrowRight, User, Mail, Calendar, ChevronLeft, X } from "lucide-react";
import { ShieldCheck, ArrowRight, User, Mail, Calendar, ChevronLeft, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Calendly topics must match exactly what's configured in the Calendly dashboard
const CALENDLY_TOPICS = [
  "Contracts & Legal Drafting",
  "Company Establishment",
  "Employment & HR",
  "Commercial Dispute",
  "Property & Real Estate",
  "Intellectual Property",
  "Other",
];

export function BookingModal() {
  const { isOpen, prefillData, closeBookingModal } = useBooking();
  const { t } = useLanguage();
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({ name: "", email: "", topic: "", date: "", time: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens & prefill from context
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setForm({
        name: prefillData?.name || "",
        email: prefillData?.email || "",
        topic: prefillData?.topic || "",
        date: "",
        time: "",
      });
      setIsSubmitting(false);
    }
  }, [isOpen, prefillData]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      // wa.me URL
      const message = `Hi, I just submitted a booking request for ${form.topic} on ${form.date} at ${form.time}. My email is ${form.email}.`;
      const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
      
      window.open(waUrl, '_blank');
      closeBookingModal();
    } catch (error) {
      console.error("Booking failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = form.name.trim().length >= 2 && form.email.includes("@") && form.topic.length > 0;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeBookingModal}
      />

      {/* Modal Panel */}
      <div
        className={cn(
          "relative z-10 w-full flex flex-col bg-[#0b0e14] border border-amber-500/20",
          "shadow-[0_0_120px_rgba(215,165,32,0.12),0_32px_80px_rgba(0,0,0,0.6)]",
          "transition-all duration-500 ease-out",
          // Mobile: full bottom sheet style
          "rounded-t-3xl sm:rounded-2xl",
          // Step 1: compact form panel
          step === 1 && "max-h-[92vh] sm:max-w-lg sm:max-h-[90vh]",
          // Step 2: wide calendar panel
          step === 2 && "sm:max-w-4xl h-[92vh] sm:h-[750px]"
        )}
      >
        {/* ─── STEP 1: Qualification Form ─── */}
        {step === 1 && (
          <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-white/[0.07] shrink-0">
              {/* Drag handle (mobile) */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/20 sm:hidden" />

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Calendar className="h-4 w-4 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white leading-tight">Book a Strategic Session</h2>
                  <p className="text-[11px] text-amber-400/80 font-semibold tracking-wider uppercase">Quick qualification · 30 sec</p>
                </div>
              </div>
              <button
                onClick={closeBookingModal}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-white/50 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Form body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label className="text-[11px] font-black uppercase tracking-widest text-white/50">
                  Full Name <span className="text-amber-500">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
                  <Input
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Your full name"
                    className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-white/25 font-medium focus-visible:border-amber-500/60 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors"
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="text-[11px] font-black uppercase tracking-widest text-white/50">
                  Email Address <span className="text-amber-500">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
                  <Input
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    type="email"
                    placeholder="name@company.com"
                    className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-white/25 font-medium focus-visible:border-amber-500/60 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors"
                    autoComplete="email"
                  />
                </div>
                <p className="text-[10px] text-white/30 leading-relaxed">
                  Booking confirmation will be sent here.
                </p>
              </div>

              {/* Legal Topic — matches Calendly dropdown exactly */}
              <div className="space-y-2">
                <Label className="text-[11px] font-black uppercase tracking-widest text-white/50">
                  Legal Topic <span className="text-amber-500">*</span>
                </Label>
                <Select value={form.topic} onValueChange={(val) => setForm((f) => ({ ...f, topic: val }))}>
                  <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-white font-medium focus:ring-0 focus:ring-offset-0 data-[placeholder]:text-white/25 focus:border-amber-500/60 transition-colors [&>span]:truncate">
                    <SelectValue placeholder="Select a topic..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#10141e] border-white/10 rounded-xl shadow-2xl">
                    {CALENDLY_TOPICS.map((topic) => (
                      <SelectItem
                        key={topic}
                        value={topic}
                        className="text-white/80 font-medium focus:bg-amber-500/10 focus:text-amber-400 rounded-lg cursor-pointer"
                      >
                        {topic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Trust indicators */}
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-emerald-400/80 leading-relaxed font-medium">
                  Attorney–client privilege applies. All details are strictly confidential.
                </p>
              </div>
            </div>

            {/* CTA Footer */}
            <div className="px-6 pb-6 pt-4 border-t border-white/[0.07] shrink-0">
              <Button
                onClick={() => setStep(2)}
                disabled={!isValid}
                className="w-full h-14 bg-amber-500 hover:bg-amber-400 text-amber-950 font-black text-base rounded-xl gap-2.5 shadow-[0_8px_32px_rgba(215,165,32,0.3)] transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed"
              >
                <Calendar className="h-5 w-5" />
                Pick a Date & Time
                <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="text-center text-[10px] text-white/25 mt-3 font-medium">
                First 15-min call is complimentary · No commitment
              </p>
            </div>
          </div>
        )}

        {/* ─── STEP 2: Custom Date & Time Picker ─── */}
        {step === 2 && (
          <div className="flex flex-col h-full overflow-hidden">
            {/* Back bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.07] shrink-0">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 text-sm font-semibold text-white/50 hover:text-white transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[11px] font-black uppercase tracking-widest text-amber-400/80 shrink-0">Booking for</span>
                <span className="text-sm font-bold text-white truncate">{form.name}</span>
              </div>
              <button
                onClick={closeBookingModal}
                className="ml-auto w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-white/40 hover:text-white shrink-0"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Custom inputs */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
              <div className="space-y-2">
                <Label className="text-[11px] font-black uppercase tracking-widest text-white/50">
                  Select Date <span className="text-amber-500">*</span>
                </Label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm(f => ({ ...f, date: e.target.value }))}
                  className="h-12 bg-white/5 border-white/10 rounded-xl text-white font-medium focus-visible:border-amber-500/60 transition-colors [color-scheme:dark]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[11px] font-black uppercase tracking-widest text-white/50">
                  Select Time <span className="text-amber-500">*</span>
                </Label>
                <Input
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm(f => ({ ...f, time: e.target.value }))}
                  className="h-12 bg-white/5 border-white/10 rounded-xl text-white font-medium focus-visible:border-amber-500/60 transition-colors [color-scheme:dark]"
                />
              </div>
            </div>

            {/* CTA Footer */}
            <div className="px-6 pb-6 pt-4 border-t border-white/[0.07] shrink-0">
              <Button
                disabled={!form.date || !form.time || isSubmitting}
                onClick={handleSubmit}
                className="w-full h-14 bg-amber-500 hover:bg-amber-400 text-amber-950 font-black text-base rounded-xl gap-2.5 shadow-[0_8px_32px_rgba(215,165,32,0.3)] transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Confirm & Request Booking"}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="text-center text-[10px] text-white/25 mt-3 font-medium">
                You will be redirected to WhatsApp to confirm with our team.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
