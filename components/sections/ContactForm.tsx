"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageCircle, Send } from "lucide-react";
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
import { buildWhatsAppLinkFromForm, buildEmailLinkFromForm } from "@/lib/cta-links";

const schema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  whatsapp: z.string().min(8),
  topic: z.string().min(1),
  urgency: z.string().min(1),
  message: z.string().min(10),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const { t, lang } = useLanguage();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
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

  const onWhatsApp = (data: FormValues) => {
    window.open(buildWhatsAppLinkFromForm(data, lang), "_blank", "noopener,noreferrer");
  };

  const onEmail = (data: FormValues) => {
    window.location.href = buildEmailLinkFromForm(data, lang);
  };

  const fieldClass =
    "bg-input border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus-visible:ring-ring h-11";

  return (
    <section id="contact" className="section-padding border-t border-border/50 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(225 22% 6%) 0%, hsl(225 22% 7% / 0.8) 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(220 18% 24% / 0.35) 1px, transparent 0)", backgroundSize: "28px 28px" }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-amber-500/[0.06] blur-[80px] pointer-events-none" />
      <div className="container-narrow relative">
        <div className="text-center mb-10 section-accent-top pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/80 mb-3">Get in Touch</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {t.contact.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="bg-card border border-amber-500/15 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-[0_0_50px_hsl(38_78%_52%/0.08),0_20px_60px_hsl(225_22%_4%/0.4)]">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name" className="text-sm font-medium text-foreground/80">
                {t.contact.name_label} <span className="text-primary">*</span>
              </Label>
              <Input
                id="name"
                placeholder={t.contact.name_placeholder}
                className={fieldClass}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{t.contact.err_name}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="company" className="text-sm font-medium text-foreground/80">
                {t.contact.company_label}
              </Label>
              <Input
                id="company"
                placeholder={t.contact.company_placeholder}
                className={fieldClass}
                {...register("company")}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="whatsapp" className="text-sm font-medium text-foreground/80">
                {t.contact.whatsapp_label} <span className="text-primary">*</span>
              </Label>
              <Input
                id="whatsapp"
                placeholder={t.contact.whatsapp_placeholder}
                className={fieldClass}
                {...register("whatsapp")}
              />
              {errors.whatsapp && (
                <p className="text-xs text-destructive">{t.contact.err_whatsapp}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-foreground/80">
                {t.contact.topic_label} <span className="text-primary">*</span>
              </Label>
              <Select
                value={topicValue}
                onValueChange={(val) => setValue("topic", val, { shouldValidate: true })}
              >
                <SelectTrigger className={fieldClass}>
                  <SelectValue placeholder={t.contact.topic_placeholder} />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {t.contact.topics.map((topic) => (
                    <SelectItem key={topic} value={topic} className="focus:bg-secondary">
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.topic && (
                <p className="text-xs text-destructive">{t.contact.err_topic}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label className="text-sm font-medium text-foreground/80">
                {t.contact.urgency_label} <span className="text-primary">*</span>
              </Label>
              <div className="flex gap-2 flex-wrap">
                {t.contact.urgencies.map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setValue("urgency", u, { shouldValidate: true })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                      urgencyValue === u
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
              {errors.urgency && (
                <p className="text-xs text-destructive">{t.contact.err_urgency}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="message" className="text-sm font-medium text-foreground/80">
                {t.contact.message_label} <span className="text-primary">*</span>
              </Label>
              <Textarea
                id="message"
                placeholder={t.contact.message_placeholder}
                rows={4}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus-visible:ring-ring resize-none"
                {...register("message")}
              />
              {errors.message && (
                <p className="text-xs text-destructive">{t.contact.err_message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-5 border-t border-border/50">
            <Button
              onClick={handleSubmit(onWhatsApp)}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-bold gap-2 h-12 amber-glow amber-glow-hover transition-all duration-300"
            >
              <MessageCircle className="h-4 w-4" />
              {t.contact.btn_wa}
            </Button>
            <Button
              onClick={handleSubmit(onEmail)}
              variant="outline"
              className="flex-1 border-border text-foreground hover:bg-secondary hover:border-primary/40 font-semibold gap-2 h-12"
            >
              <Send className="h-4 w-4" />
              {t.contact.btn_email}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

