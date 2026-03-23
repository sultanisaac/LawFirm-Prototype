"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageCircle, Send, Flame, Calendar, Clock, ChevronRight, ChevronLeft, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageContext";
import { useBooking } from "@/context/BookingContext";
import { buildWhatsAppLinkFromForm, buildEmailLinkFromForm } from "@/lib/cta-links";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Name is too short"),
  company: z.string().optional(),
  whatsapp: z.string().min(8, "Valid phone number required"),
  topic: z.string().min(1, "Please select a topic"),
  urgency: z.string().min(1, "Please select urgency"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const { t, lang } = useLanguage();
  const { openBookingModal } = useBooking();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      company: "",
      whatsapp: "",
      topic: "",
      urgency: "",
      message: "",
    },
  });

  const topicValue = watch("topic");
  const urgencyValue = watch("urgency");
  const messageValue = watch("message") || "";

  const onWhatsApp = async (data: FormValues) => {
    setIsSubmitting(true);
    // Simulate a small delay for UX feedback
    await new Promise(resolve => setTimeout(resolve, 800));
    window.open(buildWhatsAppLinkFromForm(data, lang), "_blank", "noopener,noreferrer");
    setIsSubmitting(false);
  };

  const onEmail = (data: FormValues) => {
    window.location.href = buildEmailLinkFromForm(data, lang);
  };

  const nextStep = async () => {
    const isValid = await trigger(["name", "whatsapp", "topic"]);
    if (isValid) {
      const vals = getValues();
      openBookingModal({
        name: vals.name,
        whatsapp: vals.whatsapp,
        topic: vals.topic
      });
      // We don't advance to step 2 as we've moved to the booking modal.
    }
  };

  const prevStep = () => setStep(1);

  const fieldClass =
    "bg-secondary/30 border-border/60 text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus-visible:ring-primary/20 h-12 rounded-xl transition-all";

  const getUrgencyIcon = (label: string) => {
    const lower = label.toLowerCase();
    if (lower.includes("critical") || lower.includes("asap")) return <Flame className="h-4 w-4" />;
    if (lower.includes("week") || lower.includes("soon")) return <Calendar className="h-4 w-4" />;
    return <Clock className="h-4 w-4" />;
  };

  return (
    <section id="contact" className="section-padding border-t border-border/50 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(225 22% 6%) 0%, hsl(225 22% 7% / 0.8) 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(220 18% 24% / 0.35) 1px, transparent 0)", backgroundSize: "28px 28px" }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-amber-500/[0.06] blur-[80px] pointer-events-none" />
      <div className="container-narrow relative">
        <div className="text-center mb-12 section-accent-top pt-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500/90 mb-3">Get in Touch</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.contact.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="bg-card/40 backdrop-blur-md border border-amber-500/10 rounded-3xl p-6 sm:p-10 max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-secondary">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out" 
              style={{ width: `${(step / 2) * 100}%` }}
            />
          </div>

          <div className="mb-8 flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-muted-foreground/60">
            <span className={cn(step === 1 ? "text-primary" : "text-emerald-500 flex items-center gap-1.5")}>
              {step === 1 ? "1. Basic Info" : <><CheckCircle2 className="h-3 w-3" /> Basic Info</>}
            </span>
            <span className={cn(step === 2 && "text-primary")}>2. Project Details</span>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {step === 1 ? (
              <div className="grid gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name" className="text-sm font-bold text-foreground/90 ml-1">
                    {t.contact.name_label} <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder={t.contact.name_placeholder}
                    className={fieldClass}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-[11px] font-medium text-destructive ml-1">{errors.name.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="whatsapp" className="text-sm font-bold text-foreground/90 ml-1">
                    {t.contact.whatsapp_label} <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="whatsapp"
                    placeholder={t.contact.whatsapp_placeholder}
                    className={fieldClass}
                    {...register("whatsapp")}
                  />
                  {errors.whatsapp && (
                    <p className="text-[11px] font-medium text-destructive ml-1">{errors.whatsapp.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-bold text-foreground/90 ml-1">
                    {t.contact.topic_label} <span className="text-primary">*</span>
                  </Label>
                  <Select
                    value={topicValue}
                    onValueChange={(val) => setValue("topic", val, { shouldValidate: true })}
                  >
                    <SelectTrigger className={fieldClass}>
                      <SelectValue placeholder={t.contact.topic_placeholder} />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border rounded-xl">
                      {t.contact.topics.map((topic) => (
                        <SelectItem key={topic} value={topic} className="focus:bg-secondary rounded-lg">
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.topic && (
                    <p className="text-[11px] font-medium text-destructive ml-1">{errors.topic.message}</p>
                  )}
                </div>

                <Button 
                  type="button" 
                  onClick={nextStep}
                  className="w-full bg-secondary hover:bg-secondary/80 text-foreground font-bold h-14 rounded-xl gap-2 mt-2 transition-all active:scale-[0.98]"
                >
                  Continue to Details
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="company" className="text-sm font-bold text-foreground/90 ml-1">
                    {t.contact.company_label} <span className="text-muted-foreground/50 font-normal">(Optional)</span>
                  </Label>
                  <Input
                    id="company"
                    placeholder={t.contact.company_placeholder}
                    className={fieldClass}
                    {...register("company")}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-bold text-foreground/90 ml-1">
                    {t.contact.urgency_label} <span className="text-primary">*</span>
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {t.contact.urgencies.map((u) => (
                      <button
                        key={u}
                        type="button"
                        onClick={() => setValue("urgency", u, { shouldValidate: true })}
                        className={cn(
                          "flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-xs font-bold border transition-all duration-200",
                          urgencyValue === u
                            ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                            : "bg-secondary/50 border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-secondary"
                        )}
                      >
                        {getUrgencyIcon(u)}
                        {u}
                      </button>
                    ))}
                  </div>
                  {errors.urgency && (
                    <p className="text-[11px] font-medium text-destructive ml-1">{errors.urgency.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-end ml-1">
                    <Label htmlFor="message" className="text-sm font-bold text-foreground/90">
                      {t.contact.message_label} <span className="text-primary">*</span>
                    </Label>
                    <span className={cn(
                      "text-[10px] font-bold",
                      messageValue.length >= 250 ? "text-amber-500" : "text-muted-foreground/40"
                    )}>
                      {messageValue.length} / 500
                    </span>
                  </div>
                  <Textarea
                    id="message"
                    placeholder={t.contact.message_placeholder}
                    rows={4}
                    maxLength={500}
                    className="bg-secondary/30 border-border/60 text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus-visible:ring-primary/20 rounded-xl resize-none transition-all"
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-[11px] font-medium text-destructive ml-1">{errors.message.message}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/30 mt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={prevStep}
                    className="flex-1 font-bold h-14 rounded-xl gap-2 hover:bg-secondary"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmit(onWhatsApp)}
                    className="flex-[2] bg-primary text-primary-foreground hover:bg-primary/90 font-black gap-2.5 h-14 rounded-xl shadow-xl shadow-primary/20 active:scale-[0.98] transition-all"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <MessageCircle className="h-5 w-5" />
                    )}
                    {isSubmitting ? "Opening WhatsApp..." : t.contact.btn_wa}
                  </Button>
                </div>
                
                <button
                  type="button"
                  onClick={handleSubmit(onEmail)}
                  className="mx-auto text-[11px] font-bold text-muted-foreground/60 hover:text-primary transition-colors underline decoration-dotted underline-offset-4"
                >
                  {t.contact.btn_email} instead
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

