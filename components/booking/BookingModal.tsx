"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useBooking, BookingPrefillData } from "@/context/BookingContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  User, 
  Mail, 
  Briefcase, 
  XCircle, 
  Clock,
  Calendar,
  ChevronRight,
  CheckCircle2
} from "lucide-react";
import Cal from "@calcom/embed-react";
import { CALCOM_EVENT_LINK, CALCOM_NAMESPACE } from "@/lib/cal-config";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function BookingModal() {
  const { isOpen, prefillData, closeBookingModal } = useBooking();
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "",
    entityType: "Individual",
    opposingParty: "",
    outcome: "",
    previousCounsel: "No",
  });

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setForm((prev) => ({
        ...prev,
        name: prefillData.name || "",
        email: prefillData.email || "",
        topic: prefillData.topic || "",
      }));
    }
  }, [isOpen, prefillData]);

  const handleNext = () => setStep((s) => s + 1);
  const handlePrev = () => setStep((s) => s - 1);

  const isStep1Valid = form.name.length >= 2 && form.email.includes("@") && form.topic.length > 0;
  const isStep2Valid = form.opposingParty.length >= 1 && form.outcome.length >= 10;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeBookingModal()}>
      <DialogContent className={cn(
        "p-0 overflow-hidden bg-background border-amber-500/20 shadow-[0_0_100px_rgba(215,165,32,0.15)] flex flex-col transition-all duration-500",
        step === 3 
          ? "sm:max-w-3xl md:max-w-4xl lg:max-w-5xl h-[95vh] sm:h-[750px]" 
          : "sm:max-w-2xl md:max-w-2xl h-[90vh] sm:h-[680px]"
      )}>
        <div className="flex flex-col h-full">
          {/* Progress Header - Hidden during scheduling to match user's requested layout */}
          {step < 3 && (
            <DialogHeader className="p-6 border-b border-border/40 bg-card/40 backdrop-blur-sm relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <DialogTitle className="text-xl font-bold flex items-center gap-2 text-foreground">
                    <ShieldCheck className="h-5 w-5 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                    Strategic Booking Portal
                  </DialogTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">
                      {`Qualification Phase: Step ${step} of 2`}
                    </span>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  {[1, 2].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <div className={cn(
                        "w-3 h-3 rounded-full border-2 transition-all duration-300",
                        step === s ? "bg-amber-500 border-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]" : 
                        step > s ? "bg-emerald-500 border-emerald-500" : "border-border/60 bg-transparent"
                      )} />
                    </div>
                  ))}
                </div>
              </div>
            </DialogHeader>
          )}

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar bg-gradient-to-b from-background via-background to-secondary/10">
            {step === 1 && (
              <div className="p-8 sm:p-12 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold tracking-tight">Personal & Professional Context</h3>
                  <p className="text-sm text-muted-foreground font-medium">Help us understand who is attending this session.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-foreground/70">Legal Entity Type</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Individual", "Company (PT/PMA)"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setForm(f => ({ ...f, entityType: type }))}
                          className={cn(
                            "flex items-center justify-center py-3 px-4 rounded-xl text-xs font-bold border transition-all duration-200",
                            form.entityType === type 
                              ? "bg-amber-500 text-amber-950 border-amber-500 shadow-lg shadow-amber-500/20" 
                              : "bg-secondary/40 border-border/60 text-muted-foreground hover:bg-secondary hover:border-amber-500/40"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-foreground/70">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                      <Input 
                        value={form.name}
                        onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                        className="pl-11 h-12 bg-secondary/30 border-border/60 rounded-xl font-medium focus:border-amber-500/50"
                        placeholder="e.g. Sultan Isaac"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-foreground/70">
                      {t.contact.topic_label}
                    </Label>
                    <Select 
                      value={form.topic} 
                      onValueChange={(val) => setForm(f => ({ ...f, topic: val }))}
                    >
                      <SelectTrigger className="h-12 bg-secondary/30 border-border/60 rounded-xl font-medium focus:ring-amber-500/50">
                        <SelectValue placeholder={t.contact.topic_placeholder} />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border/60 rounded-xl">
                        {t.contact.topics.map((topic: string) => (
                          <SelectItem key={topic} value={topic} className="font-medium focus:bg-amber-500/10 focus:text-amber-500">
                            {topic}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-foreground/70">Email Address (Verification Required)</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                      <Input 
                        value={form.email}
                        type="email"
                        onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                        className="pl-11 h-12 bg-secondary/30 border-border/60 rounded-xl font-medium focus:border-amber-500/50"
                        placeholder="name@company.id"
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground/60 leading-tight">Your booking invitation and meeting credentials will be sent to this address.</p>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button 
                    onClick={handleNext}
                    disabled={!isStep1Valid}
                    className="h-12 px-8 bg-amber-500 text-amber-950 font-black rounded-xl hover:bg-amber-400 gap-2 transition-all active:scale-[0.98]"
                  >
                    Next Step
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="p-8 sm:p-12 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold tracking-tight">Legal Safeguards</h3>
                  <p className="text-sm text-muted-foreground font-medium">Crucial data required for conflict checking and preparation.</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-black uppercase tracking-widest text-foreground/70">1. Conflict Check: Opposing Party</Label>
                      <Badge variant="outline" className="text-[9px] border-amber-500/30 text-amber-500 uppercase px-1.5 h-5">Security Requirement</Badge>
                    </div>
                    <div className="relative">
                      <XCircle className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                      <Input 
                        value={form.opposingParty}
                        onChange={(e) => setForm(f => ({ ...f, opposingParty: e.target.value }))}
                        className="pl-11 h-12 bg-secondary/30 border-border/60 rounded-xl font-medium focus:border-amber-500/50"
                        placeholder="Full name or company name (or N/A)"
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground/60 leading-tight">We must verify that we do not currently represent the opposing side of your matter.</p>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-xs font-black uppercase tracking-widest text-foreground/70">2. Have you consulted another lawyer for this?</Label>
                    <div className="flex flex-wrap gap-2">
                      {["No", "Yes — Active", "Yes — Disengaged"].map((ans) => (
                        <button
                          key={ans}
                          onClick={() => setForm(f => ({ ...f, previousCounsel: ans }))}
                          className={cn(
                            "flex-1 py-3 px-4 rounded-xl text-xs font-bold border transition-all duration-200",
                            form.previousCounsel === ans 
                              ? "bg-amber-500 text-amber-950 border-amber-500" 
                              : "bg-secondary/40 border-border/60 text-muted-foreground hover:bg-secondary"
                          )}
                        >
                          {ans}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-xs font-black uppercase tracking-widest text-foreground/70">3. Target Outcome for this Session</Label>
                    <Textarea 
                      value={form.outcome}
                      onChange={(e) => setForm(f => ({ ...f, outcome: e.target.value }))}
                      rows={3}
                      className="bg-secondary/30 border-border/60 rounded-xl font-medium focus:border-amber-500/50 resize-none"
                      placeholder="e.g. I need to understand the costs of IP registration and timeline for a PT setup."
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <Button 
                    variant="ghost" 
                    onClick={handlePrev}
                    className="font-bold gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                  <Button 
                    onClick={handleNext}
                    disabled={!isStep2Valid}
                    className="h-12 px-8 bg-amber-500 text-amber-950 font-black rounded-xl hover:bg-amber-400 gap-2 transition-all active:scale-[0.98] shadow-lg shadow-amber-500/20"
                  >
                    Continue to Scheduling
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex-1 h-full overflow-hidden bg-background px-5 py-3">
                <Cal
                  namespace={CALCOM_NAMESPACE}
                  calLink={CALCOM_EVENT_LINK}
                  style={{ width: "100%", height: "100%" }}
                  config={{ 
                    theme: "dark", 
                    name: form.name,
                    email: form.email,
                    layout: "month_view",
                    hideEventTypeDetails: true,
                    ui: {
                      hideEventTypeDetails: true,
                      layout: "month_view",
                    },
                    "legal-topic": form.topic, 
                    "topic": form.topic,
                    "opposing-party": form.opposingParty,
                    "target-outcome": form.outcome,
                    "entity-type": form.entityType,
                    notes: `### Qualification Data\n- **Topic:** ${form.topic}\n- **Entity:** ${form.entityType}\n- **Conflict Check:** ${form.opposingParty}\n- **Outcome:** ${form.outcome}\n- **Prev Counsel:** ${form.previousCounsel}`,
                  } as any}
                />
              </div>
            )}
          </div>

          {/* Optional: Security Footer - Hidden at Step 3 */}
          {step < 3 && (
            <div className="p-4 bg-secondary/20 border-t border-border/40 text-[9px] text-center text-muted-foreground flex items-center justify-center gap-1.5 font-medium uppercase tracking-widest">
              <ShieldCheck className="h-3 w-3" />
              Attorney-Client Privilege applies from this point forward
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
