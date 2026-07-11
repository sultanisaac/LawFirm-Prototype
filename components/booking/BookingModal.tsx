"use client";

import { useEffect, useRef, useState } from "react";
import { useBooking } from "@/context/BookingContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, ArrowRight, User, Mail, Phone, Calendar as CalendarIcon, ChevronLeft, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format, isBefore, startOfToday, isWeekend } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Booking topics
const BOOKING_TOPICS = [
  "Contracts & Legal Drafting",
  "Company Establishment",
  "Employment & HR",
  "Commercial Dispute",
  "Property & Real Estate",
  "Intellectual Property",
  "Other",
];

const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00"
];

export function BookingModal() {
  const { isOpen, prefillData, closeBookingModal } = useBooking();
  const { t } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", topic: "", date: "", time: "" });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens & prefill from context
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setForm({
        name: prefillData?.name || "",
        email: prefillData?.email || "",
        phone: "",
        topic: prefillData?.topic || "",
        date: "",
        time: "",
      });
      setSelectedDate(undefined);
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
      setStep(3);
    } catch (error) {
      console.error("Booking failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = form.name.trim().length >= 2 && form.email.includes("@") && form.phone.trim().length >= 8 && form.topic.length > 0;

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
          step === 2 && "sm:max-w-4xl h-[92vh] sm:h-[750px]",
          // Step 3: Success panel
          step === 3 && "max-h-[92vh] sm:max-w-md sm:max-h-[90vh]"
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
                  <CalendarIcon className="h-4 w-4 text-amber-400" />
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

              {/* Phone */}
              <div className="space-y-2">
                <Label className="text-[11px] font-black uppercase tracking-widest text-white/50">
                  WhatsApp Number <span className="text-amber-500">*</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
                  <Input
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    type="tel"
                    placeholder="+62 812 3456 7890"
                    className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-white/25 font-medium focus-visible:border-amber-500/60 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors"
                    autoComplete="tel"
                  />
                </div>
              </div>

              {/* Legal Topic */}
              <div className="space-y-2">
                <Label className="text-[11px] font-black uppercase tracking-widest text-white/50">
                  Legal Topic <span className="text-amber-500">*</span>
                </Label>
                <Select value={form.topic} onValueChange={(val) => setForm((f) => ({ ...f, topic: val }))}>
                  <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-white font-medium focus:ring-0 focus:ring-offset-0 data-[placeholder]:text-white/25 focus:border-amber-500/60 transition-colors [&>span]:truncate">
                    <SelectValue placeholder="Select a topic..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#10141e] border-white/10 rounded-xl shadow-2xl">
                    {BOOKING_TOPICS.map((topic) => (
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
                <CalendarIcon className="h-5 w-5" />
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
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              <div className="flex flex-col sm:flex-row gap-8">
                {/* Calendar */}
                <div className="space-y-3 flex-1 flex flex-col max-w-[380px] mx-auto sm:mx-0">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-white/50 text-center sm:text-left">
                    Select Date <span className="text-amber-500">*</span>
                  </Label>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                        if (date) {
                          setForm(f => ({ ...f, date: format(date, 'yyyy-MM-dd') }));
                        }
                      }}
                      disabled={(date) => isBefore(date, startOfToday()) || isWeekend(date)}
                      className="text-white bg-transparent pointer-events-auto"
                      captionLayout="dropdown-buttons"
                      fromYear={new Date().getFullYear()}
                      toYear={new Date().getFullYear() + 5}
                      classNames={{
                        day_selected: "bg-amber-500 text-amber-950 hover:bg-amber-400 focus:bg-amber-500 focus:text-amber-950 font-bold shadow-[0_0_15px_rgba(215,165,32,0.4)]",
                        day_today: "bg-white/10 text-white",
                        day: "h-11 w-11 p-0 font-normal hover:bg-white/10 hover:text-white rounded-md transition-all text-sm",
                        cell: "h-11 w-11 text-center p-0 relative",
                        nav_button_previous: "absolute left-1 w-7 h-7 flex items-center justify-center hover:bg-white/10 hover:text-white rounded-md transition-all",
                        nav_button_next: "absolute right-1 w-7 h-7 flex items-center justify-center hover:bg-white/10 hover:text-white rounded-md transition-all",
                        head_cell: "text-white/50 w-11 font-medium text-[0.8rem] uppercase tracking-wider",
                        caption: "flex justify-center pt-1 pb-2 relative items-center text-sm font-bold text-white gap-1 px-8",
                        caption_label: "hidden", // Hide default label when using dropdowns
                        caption_dropdowns: "flex flex-row items-center gap-2",
                        dropdown_month: "flex items-center [&>label]:hidden",
                        dropdown_year: "flex items-center [&>label]:hidden",
                        dropdown: "bg-[#10141e] border border-white/10 text-white text-sm rounded-md px-2 py-1 focus:ring-1 focus:ring-amber-500/50 outline-none cursor-pointer hover:bg-white/5 transition-colors [&>option]:bg-[#10141e] [&>option]:text-white [&>option]:py-1",
                      }}
                    />
                  </div>
                </div>

                {/* Time Slots */}
                <div className="space-y-3 flex-1 flex flex-col">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-white/50 text-center sm:text-left">
                    Select Time <span className="text-amber-500">*</span>
                  </Label>
                  <div className="grid grid-cols-3 gap-2 sm:overflow-y-auto sm:max-h-[350px] p-1 custom-scrollbar pb-10 sm:pb-1">
                    {TIME_SLOTS.map((time) => (
                      <button
                        key={time}
                        onClick={() => setForm(f => ({ ...f, time }))}
                        className={cn(
                          "py-2.5 rounded-lg text-sm font-medium transition-all border",
                          form.time === time 
                            ? "bg-amber-500 text-amber-950 border-amber-500 shadow-[0_0_15px_rgba(215,165,32,0.3)]" 
                            : "bg-white/5 border-white/10 text-white/70 hover:border-amber-500/50 hover:text-white hover:bg-white/10"
                        )}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
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

        {/* ─── STEP 3: Success ─── */}
        {step === 3 && (
          <div className="flex flex-col h-full overflow-hidden items-center justify-center py-12 px-6 text-center">
            <button
              onClick={closeBookingModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-white/50 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <ShieldCheck className="h-8 w-8 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Request Successful!</h2>
            <p className="text-sm text-white/60 mb-8 max-w-sm mx-auto leading-relaxed">
              We have received your booking details for <strong className="text-white font-medium">{form.topic}</strong> on <strong className="text-white font-medium">{form.date}</strong> at <strong className="text-white font-medium">{form.time}</strong>.
            </p>
            <div className="space-y-3 w-full">
              <Button
                onClick={() => {
                  const message = `Hi, I just submitted a booking request for ${form.topic} on ${form.date} at ${form.time}. My email is ${form.email}.`;
                  window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-xl transition-all"
              >
                Continue to WhatsApp
              </Button>
              <Button
                variant="ghost"
                onClick={closeBookingModal}
                className="w-full h-12 text-white/50 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all"
              >
                Close Window
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
