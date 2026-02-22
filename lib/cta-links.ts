import { Lang } from "./copy";

export const WA_NUMBER = "6281200000000";
export const EMAIL_ADDRESS = "hello@nusaleza-law.id";

export function buildWhatsAppLink(topic: string, lang: Lang): string {
  const message =
    lang === "en"
      ? `Hi NUSALEXA, I need legal help with: ${topic}. Name/Company: [ ]. Timeline: [today/this week/flexible].`
      : `Halo NUSALEXA, saya butuh bantuan hukum untuk: ${topic}. Nama/Perusahaan: [ ]. Waktu: [hari ini/minggu ini/fleksibel].`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export interface FormData {
  name: string;
  company?: string;
  whatsapp: string;
  topic: string;
  urgency: string;
  message: string;
}

export function buildWhatsAppLinkFromForm(data: FormData, lang: Lang): string {
  const message =
    lang === "en"
      ? `Hi NUSALEXA, I need legal help with: ${data.topic}. Name/Company: ${data.name}${data.company ? ` / ${data.company}` : ""}. WhatsApp: ${data.whatsapp}. Timeline: ${data.urgency}. Issue: ${data.message}`
      : `Halo NUSALEXA, saya butuh bantuan hukum untuk: ${data.topic}. Nama/Perusahaan: ${data.name}${data.company ? ` / ${data.company}` : ""}. WhatsApp: ${data.whatsapp}. Waktu: ${data.urgency}. Masalah: ${data.message}`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildEmailLinkFromForm(data: FormData, lang: Lang): string {
  const subject =
    lang === "en"
      ? `Legal Inquiry — ${data.topic}`
      : `Konsultasi Hukum — ${data.topic}`;
  const body =
    lang === "en"
      ? `Name: ${data.name}\nWhatsApp: ${data.whatsapp}\nCompany: ${data.company || "N/A"}\nTopic: ${data.topic}\nUrgency: ${data.urgency}\n\nIssue Summary:\n${data.message}`
      : `Nama: ${data.name}\nWhatsApp: ${data.whatsapp}\nPerusahaan: ${data.company || "N/A"}\nTopik: ${data.topic}\nWaktu: ${data.urgency}\n\nRingkasan Masalah:\n${data.message}`;
  return `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildEmailLink(topic: string, lang: Lang): string {
  const subject =
    lang === "en" ? `Legal Inquiry — ${topic}` : `Konsultasi Hukum — ${topic}`;
  const body =
    lang === "en"
      ? `Hi NUSALEXA,\n\nI would like to inquire about: ${topic}.\n\nName: \nCompany: \nWhatsApp: \nBrief description: `
      : `Halo NUSALEXA,\n\nSaya ingin bertanya tentang: ${topic}.\n\nNama: \nPerusahaan: \nWhatsApp: \nDeskripsi singkat: `;
  return `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildGeneralWhatsAppLink(lang: Lang): string {
  return buildWhatsAppLink(
    lang === "en" ? "general legal matter" : "masalah hukum umum",
    lang
  );
}

export function buildGeneralEmailLink(lang: Lang): string {
  return buildEmailLink(
    lang === "en" ? "General Inquiry" : "Pertanyaan Umum",
    lang
  );
}
