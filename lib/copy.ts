export type Lang = "en" | "id";

export interface ServiceItem {
  id: string;
  tab: "setup" | "protection" | "disputes";
  title: string;
  benefit: string;
  topic: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface StepItem {
  number: string;
  title: string;
  desc: string;
}

export interface CopyShape {
  nav: {
    wordmark: string;
    wordmark_sub: string;
    services: string;
    faq: string;
    contact: string;
    cta_wa: string;
    cta_email: string;
  };
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    bullets: string[];
    cta_wa: string;
    cta_email: string;
    disclaimer: string;
  };
  trust_chips: string[];
  services: {
    title: string;
    subtitle: string;
    tabs: { setup: string; protection: string; disputes: string };
    ask_cta: string;
    items: ServiceItem[];
  };
  how_it_works: {
    title: string;
    subtitle: string;
    steps: StepItem[];
    response_note: string;
    response_label: string;
    start_now: string;
  };
  faq: {
    title: string;
    subtitle: string;
    items: FaqItem[];
    wa_micro_cta: string;
    still_questions: string;
    ask_anything: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name_label: string;
    name_placeholder: string;
    company_label: string;
    company_placeholder: string;
    whatsapp_label: string;
    whatsapp_placeholder: string;
    topic_label: string;
    topic_placeholder: string;
    topics: string[];
    urgency_label: string;
    urgencies: string[];
    message_label: string;
    message_placeholder: string;
    btn_wa: string;
    btn_email: string;
    err_name: string;
    err_whatsapp: string;
    err_topic: string;
    err_urgency: string;
    err_message: string;
  };
  footer: {
    tagline: string;
    office: string;
    privacy_link: string;
    wa_label: string;
    email_label: string;
    disclaimer: string;
    legal_note: string;
    copyright: string;
    nav_title: string;
    contact_title: string;
    final_cta_title: string;
    final_cta_subtitle: string;
    final_cta_btn: string;
    start_today: string;
  };
  privacy: {
    title: string;
    back: string;
    intro: string;
    sections: { title: string; body: string }[];
  };
}

const en: CopyShape = {
  nav: {
    wordmark: "NUSALEXA",
    wordmark_sub: "Law Office",
    services: "Services",
    faq: "FAQ",
    contact: "Contact",
    cta_wa: "WhatsApp Us",
    cta_email: "Email Us",
  },
  hero: {
    badge: "Corporate & Commercial Law · Jakarta",
    headline: "Business-First\nLegal Counsel",
    subheadline:
      "Fast, clear, and practical legal solutions for SMEs, startups, and investors in Indonesia. No legal jargon — just results.",
    bullets: [
      "Contracts drafted & reviewed within 48 hours",
      "Fixed-fee options — no surprise invoices",
      "Bilingual (EN/ID) documents & representation",
    ],
    cta_wa: "Start WhatsApp Consultation",
    cta_email: "Send Email Inquiry",
    disclaimer:
      "Prototype website for demo purposes. All names, testimonials, and claims are fictional.",
  },
  trust_chips: ["Confidential", "NDA-Ready", "Bilingual (ID/EN)", "Fast Response"],
  services: {
    title: "Legal Services",
    subtitle:
      "Practical legal support across the full business lifecycle — from setup to protection to dispute resolution.",
    tabs: {
      setup: "Business Setup",
      protection: "Protection & Compliance",
      disputes: "Disputes & Resolution",
    },
    ask_cta: "Ask about this →",
    items: [
      {
        id: "company",
        tab: "setup",
        title: "Company Establishment",
        benefit: "PT / PMDN / PMA incorporated correctly from day one.",
        topic: "Company Establishment",
      },
      {
        id: "contracts",
        tab: "setup",
        title: "Contracts & Legal Drafting",
        benefit: "MoU, agreements, and terms drafted to protect your interests.",
        topic: "Contracts & Legal Drafting",
      },
      {
        id: "due-diligence",
        tab: "setup",
        title: "Legal Due Diligence",
        benefit: "Know your risks before you sign or invest.",
        topic: "Legal Due Diligence",
      },
      {
        id: "employment",
        tab: "protection",
        title: "Employment & HR Compliance",
        benefit: "Employment contracts, PKB, and labor law compliance.",
        topic: "Employment & HR Compliance",
      },
      {
        id: "ip",
        tab: "protection",
        title: "IP — Trademark, Copyright & Licensing",
        benefit: "Register and protect your brand, content, and IP portfolio.",
        topic: "Intellectual Property",
      },
      {
        id: "compliance",
        tab: "protection",
        title: "Compliance & Regulatory Advisory",
        benefit: "Stay compliant with Indonesian business regulations.",
        topic: "Compliance & Regulatory",
      },
      {
        id: "retainer",
        tab: "protection",
        title: "Monthly Retainer — General Counsel",
        benefit: "On-call legal support without the cost of in-house counsel.",
        topic: "Monthly Retainer",
      },
      {
        id: "litigation",
        tab: "disputes",
        title: "Commercial Disputes & Litigation",
        benefit: "Dispute resolution and court representation when it matters most.",
        topic: "Commercial Disputes",
      },
      {
        id: "demand",
        tab: "disputes",
        title: "Demand Letters & Debt Collection",
        benefit: "Firm, professional demand letters that get results.",
        topic: "Demand Letters & Debt Collection",
      },
      {
        id: "property",
        tab: "disputes",
        title: "Property & Real Estate",
        benefit: "SHM, SHGB, AJB, and property transaction due diligence.",
        topic: "Property & Real Estate",
      },
    ],
  },
  how_it_works: {
    title: "How It Works",
    subtitle: "Three clear steps from first contact to delivery.",
    response_label: "Response Time",
    response_note: "Initial response within [demo hours] on business days.",
    start_now: "Start Now",
    steps: [
      {
        number: "01",
        title: "Share Your Context",
        desc: "Reach out via WhatsApp or the contact form. Tell us your legal issue, timeline, and goals. No preparation needed.",
      },
      {
        number: "02",
        title: "Scope & Fee Estimate",
        desc: "We outline what's involved, the timeline, and a clear fee — fixed or hourly. You decide whether to proceed. No obligation.",
      },
      {
        number: "03",
        title: "Delivery",
        desc: "Receive your documents, legal advice, or agreed next steps within the confirmed timeframe. Clear, actionable, and bilingual.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Clear answers to the questions clients ask most before getting started.",
    wa_micro_cta: "Message us on WhatsApp →",
    still_questions: "Still have questions? We respond to WhatsApp messages faster than email.",
    ask_anything: "Ask us anything on WhatsApp",
    items: [
      {
        q: "What is the consultation fee for the first call?",
        a: "The first 15-minute call is complimentary to understand your situation and whether we can help. If we proceed, we agree on fees upfront — fixed or hourly. No surprises, no obligation.",
      },
      {
        q: "Do you offer fixed-fee or hourly billing?",
        a: "Both. Routine matters (company setup, contract drafting, demand letters) are typically fixed-fee. Complex or time-variable matters (litigation, disputes) are billed hourly. We always clarify which applies before starting.",
      },
      {
        q: "How quickly will you respond to my message?",
        a: "WhatsApp messages receive an initial response within [demo hours] on business days. For urgent matters, note it in your first message and we'll prioritize immediately.",
      },
      {
        q: "Can you sign an NDA before we discuss our matter?",
        a: "Yes. A mutual NDA can be signed before any substantive discussion. We take confidentiality seriously — attorney-client privilege applies from your very first communication with us.",
      },
      {
        q: "What documents should I prepare for the first consultation?",
        a: "Bring whatever you have — a contract draft, company documents, a dispute timeline, or just a clear description of your issue. You don't need to be fully prepared. We'll help you structure it.",
      },
      {
        q: "What is included and excluded in your fees?",
        a: "Included: drafting, review, legal advice, and one revision round. Excluded: court filing fees, notary fees, government charges, and out-of-pocket expenses (invoiced at cost). Always clarified in the scope agreement before starting.",
      },
      {
        q: "Do you handle court cases and litigation?",
        a: "Yes, for commercial disputes in Indonesia. Raka Pratama, S.H., LL.M. is a registered advocate with courtroom experience. We handle civil commercial litigation including contract disputes, employment cases, and debt recovery.",
      },
      {
        q: "Can overseas or remote clients work with you?",
        a: "Absolutely. We work with clients across Indonesia and internationally via WhatsApp, Zoom, and email. All documents are handled digitally. Time zone differences are manageable.",
      },
      {
        q: "How do payments work?",
        a: "For this prototype: manual invoice via bank transfer or e-wallet. In practice, we issue a professional fee agreement before any paid work begins. No payment is collected until scope is agreed and documented.",
      },
      {
        q: "How do I start today?",
        a: "Simple: tap the WhatsApp button, send a brief message about your legal issue, and we'll take it from there. No forms required, no waiting room.",
      },
    ],
  },
  contact: {
    title: "Get in Touch",
    subtitle:
      "Fill in the details below. Send directly via WhatsApp for the fastest response, or via email if you prefer.",
    name_label: "Full Name",
    name_placeholder: "Your full name",
    company_label: "Company / Startup",
    company_placeholder: "Optional",
    whatsapp_label: "WhatsApp Number",
    whatsapp_placeholder: "+62 81x xxxx xxxx",
    topic_label: "Legal Topic",
    topic_placeholder: "Select a topic",
    topics: [
      "Contracts & Legal Drafting",
      "Company Establishment",
      "Employment & HR",
      "Commercial Dispute",
      "Property & Real Estate",
      "Intellectual Property",
      "Other",
    ],
    urgency_label: "Timeline",
    urgencies: ["Today", "This week", "Flexible"],
    message_label: "Brief Description",
    message_placeholder: "Briefly describe your legal issue or question...",
    btn_wa: "Send via WhatsApp",
    btn_email: "Send via Email",
    err_name: "Name is required",
    err_whatsapp: "WhatsApp number is required",
    err_topic: "Please select a topic",
    err_urgency: "Please select a timeline",
    err_message: "Please describe your issue (min. 10 characters)",
  },
  footer: {
    tagline: "Business-first legal counsel — fast, clear, and practical.",
    office: "Jakarta, Indonesia (Prototype)",
    privacy_link: "Privacy Policy",
    wa_label: "WhatsApp",
    email_label: "Email",
    disclaimer:
      "Prototype website for demo purposes. All names, testimonials, and claims are fictional.",
    legal_note:
      "This website does not create a lawyer-client relationship until engagement is confirmed.",
    copyright: "© 2024 NUSALEXA Law Office. All rights reserved.",
    nav_title: "Navigation",
    contact_title: "Contact",
    final_cta_title: "Ready to move forward?",
    final_cta_subtitle:
      "Most clients get a response within hours. Start with a simple WhatsApp message.",
    final_cta_btn: "Start WhatsApp Consultation",
    start_today: "Start Today",
  },
  privacy: {
    title: "Privacy Policy",
    back: "← Back to home",
    intro:
      "This is a prototype privacy policy for demonstration purposes. NUSALEXA Law Office (prototype) is committed to protecting your personal information.",
    sections: [
      {
        title: "Information We Collect",
        body: "When you use the contact form or WhatsApp link on this site, you may provide your name, company name, WhatsApp number, and a description of your legal issue. This information is used solely to respond to your inquiry.",
      },
      {
        title: "How We Use Your Information",
        body: "Your information is used to respond to your legal inquiry, provide a fee estimate, and manage the engagement if you choose to proceed. We do not sell or share your information with third parties.",
      },
      {
        title: "Confidentiality",
        body: "All communications are treated as confidential. Attorney-client privilege applies from your first substantive communication. You may request an NDA prior to disclosure of sensitive business information.",
      },
      {
        title: "Data Retention",
        body: "Client communications are retained for the duration of the engagement and as required by Indonesian law and professional regulations. You may request deletion of your data at any time.",
      },
      {
        title: "Contact",
        body: "For privacy-related questions, contact us at hello@nusaleza-law.id or via WhatsApp.",
      },
    ],
  },
};

const id: CopyShape = {
  nav: {
    wordmark: "NUSALEXA",
    wordmark_sub: "Kantor Hukum",
    services: "Layanan",
    faq: "FAQ",
    contact: "Kontak",
    cta_wa: "WhatsApp Kami",
    cta_email: "Email Kami",
  },
  hero: {
    badge: "Hukum Korporasi & Komersial · Jakarta",
    headline: "Pendampingan Hukum\nBisnis yang Praktis",
    subheadline:
      "Solusi hukum bisnis yang cepat, jelas, dan praktis untuk UMKM, startup, dan investor di Indonesia. Tanpa jargon hukum — hanya hasil nyata.",
    bullets: [
      "Kontrak disusun & ditinjau dalam 48 jam",
      "Opsi biaya tetap — tanpa tagihan mengejutkan",
      "Bilingual (EN/ID) — dokumen & representasi",
    ],
    cta_wa: "Mulai Konsultasi WhatsApp",
    cta_email: "Kirim Pertanyaan via Email",
    disclaimer:
      "Website prototipe untuk demo. Semua nama, testimoni, dan klaim bersifat fiktif.",
  },
  trust_chips: ["Rahasia", "Siap NDA", "Bilingual (ID/EN)", "Respons Cepat"],
  services: {
    title: "Layanan Hukum",
    subtitle:
      "Dukungan hukum praktis sepanjang siklus bisnis — dari pendirian hingga perlindungan hingga penyelesaian sengketa.",
    tabs: {
      setup: "Pendirian Bisnis",
      protection: "Perlindungan & Kepatuhan",
      disputes: "Sengketa & Penyelesaian",
    },
    ask_cta: "Tanyakan layanan ini →",
    items: [
      {
        id: "company",
        tab: "setup",
        title: "Pendirian Perusahaan",
        benefit: "PT / PMDN / PMA didirikan dengan benar sejak awal.",
        topic: "Pendirian Perusahaan",
      },
      {
        id: "contracts",
        tab: "setup",
        title: "Kontrak & Penyusunan Dokumen Hukum",
        benefit: "MoU, perjanjian, dan syarat-syarat disusun untuk melindungi kepentingan Anda.",
        topic: "Kontrak & Dokumen Hukum",
      },
      {
        id: "due-diligence",
        tab: "setup",
        title: "Uji Tuntas Hukum",
        benefit: "Ketahui risiko sebelum Anda menandatangani atau berinvestasi.",
        topic: "Uji Tuntas Hukum",
      },
      {
        id: "employment",
        tab: "protection",
        title: "Ketenagakerjaan & Kepatuhan HR",
        benefit: "Kontrak kerja, PKB, dan kepatuhan hukum ketenagakerjaan.",
        topic: "Ketenagakerjaan & HR",
      },
      {
        id: "ip",
        tab: "protection",
        title: "KI — Merek, Hak Cipta & Lisensi",
        benefit: "Daftarkan dan lindungi merek, konten, dan portofolio KI Anda.",
        topic: "Kekayaan Intelektual",
      },
      {
        id: "compliance",
        tab: "protection",
        title: "Kepatuhan & Konsultasi Regulasi",
        benefit: "Tetap patuh terhadap regulasi bisnis Indonesia.",
        topic: "Kepatuhan & Regulasi",
      },
      {
        id: "retainer",
        tab: "protection",
        title: "Retainer Bulanan — Kuasa Hukum Umum",
        benefit: "Dukungan hukum siap pakai tanpa biaya konsultan internal.",
        topic: "Retainer Bulanan",
      },
      {
        id: "litigation",
        tab: "disputes",
        title: "Sengketa Komersial & Litigasi",
        benefit: "Penyelesaian sengketa dan representasi di pengadilan saat paling dibutuhkan.",
        topic: "Sengketa Komersial",
      },
      {
        id: "demand",
        tab: "disputes",
        title: "Surat Somasi & Penagihan Piutang",
        benefit: "Surat somasi tegas dan profesional yang menghasilkan tindakan.",
        topic: "Surat Somasi & Penagihan",
      },
      {
        id: "property",
        tab: "disputes",
        title: "Properti & Real Estate",
        benefit: "SHM, SHGB, AJB, dan uji tuntas transaksi properti.",
        topic: "Properti & Real Estate",
      },
    ],
  },
  how_it_works: {
    title: "Cara Kerja",
    subtitle: "Tiga langkah jelas dari kontak pertama hingga pengiriman.",
    response_label: "Waktu Respons",
    response_note: "Respons awal dalam [jam demo] hari kerja.",
    start_now: "Mulai Sekarang",
    steps: [
      {
        number: "01",
        title: "Ceritakan Situasi Anda",
        desc: "Hubungi kami via WhatsApp atau formulir kontak. Ceritakan masalah hukum, timeline, dan tujuan Anda. Tidak perlu persiapan khusus.",
      },
      {
        number: "02",
        title: "Ruang Lingkup & Estimasi Biaya",
        desc: "Kami uraikan apa yang diperlukan, timeline, dan biaya yang jelas — tetap atau per jam. Anda memutuskan untuk melanjutkan. Tanpa kewajiban.",
      },
      {
        number: "03",
        title: "Pengiriman",
        desc: "Terima dokumen, saran hukum, atau langkah selanjutnya yang disepakati sesuai jangka waktu yang dikonfirmasi. Jelas, dapat ditindaklanjuti, dan bilingual.",
      },
    ],
  },
  faq: {
    title: "Pertanyaan yang Sering Diajukan",
    subtitle: "Jawaban jelas untuk pertanyaan yang paling sering ditanyakan klien sebelum memulai.",
    wa_micro_cta: "Hubungi kami via WhatsApp →",
    still_questions:
      "Masih punya pertanyaan? Kami merespons pesan WhatsApp lebih cepat dari email.",
    ask_anything: "Tanyakan apa saja via WhatsApp",
    items: [
      {
        q: "Berapa biaya konsultasi untuk panggilan pertama?",
        a: "15 menit pertama gratis untuk memahami situasi Anda dan apakah kami dapat membantu. Jika dilanjutkan, kami sepakati biaya di awal — tetap atau per jam. Tanpa kejutan, tanpa kewajiban.",
      },
      {
        q: "Apakah Anda menawarkan biaya tetap atau per jam?",
        a: "Keduanya. Pekerjaan rutin (pendirian perusahaan, penyusunan kontrak, surat somasi) umumnya biaya tetap. Pekerjaan kompleks atau tidak menentu waktunya (litigasi, sengketa) ditagihkan per jam. Kami selalu mengklarifikasi sebelum mulai.",
      },
      {
        q: "Seberapa cepat Anda akan merespons pesan saya?",
        a: "Pesan WhatsApp mendapat respons awal dalam [jam demo] hari kerja. Untuk urusan mendesak, informasikan di pesan pertama dan kami akan memprioritaskan segera.",
      },
      {
        q: "Bisakah Anda menandatangani NDA sebelum kami berdiskusi?",
        a: "Ya. NDA timbal balik dapat ditandatangani sebelum diskusi substantif apa pun. Kami sangat menjaga kerahasiaan — privilese advokat-klien berlaku sejak komunikasi pertama Anda dengan kami.",
      },
      {
        q: "Dokumen apa yang harus saya siapkan untuk konsultasi pertama?",
        a: "Bawa apa yang Anda miliki — draf kontrak, dokumen perusahaan, kronologi sengketa, atau hanya deskripsi jelas masalah Anda. Tidak perlu sepenuhnya siap. Kami bantu strukturisasinya.",
      },
      {
        q: "Apa yang termasuk dan tidak termasuk dalam biaya Anda?",
        a: "Termasuk: penyusunan, peninjauan, saran hukum, dan satu putaran revisi. Tidak termasuk: biaya pendaftaran pengadilan, biaya notaris, biaya pemerintah, dan pengeluaran langsung (ditagihkan sesuai biaya). Selalu diklarifikasi dalam perjanjian ruang lingkup sebelum mulai.",
      },
      {
        q: "Apakah Anda menangani perkara pengadilan dan litigasi?",
        a: "Ya, untuk sengketa komersial di Indonesia. Raka Pratama, S.H., LL.M. adalah advokat terdaftar dengan pengalaman litigasi. Kami menangani litigasi komersial perdata termasuk sengketa kontrak, kasus ketenagakerjaan, dan pemulihan piutang.",
      },
      {
        q: "Bisakah klien luar negeri atau jarak jauh bekerja sama dengan Anda?",
        a: "Tentu saja. Kami bekerja dengan klien di seluruh Indonesia dan internasional melalui WhatsApp, Zoom, dan email. Semua dokumen dapat ditangani secara digital. Perbedaan zona waktu dapat dikelola.",
      },
      {
        q: "Bagaimana cara pembayaran dilakukan?",
        a: "Untuk prototipe ini: faktur manual via transfer bank atau e-wallet. Pada praktiknya, kami menerbitkan perjanjian honorarium sebelum pekerjaan berbayar dimulai. Tidak ada pembayaran sebelum ruang lingkup disepakati dan didokumentasikan.",
      },
      {
        q: "Bagaimana cara memulai hari ini?",
        a: "Mudah: ketuk tombol WhatsApp, kirim pesan singkat tentang masalah hukum Anda, dan kami akan menanganinya. Tidak perlu formulir, tidak perlu menunggu.",
      },
    ],
  },
  contact: {
    title: "Hubungi Kami",
    subtitle:
      "Isi detail di bawah. Kirim via WhatsApp untuk respons tercepat, atau via email jika Anda lebih suka.",
    name_label: "Nama Lengkap",
    name_placeholder: "Nama lengkap Anda",
    company_label: "Perusahaan / Startup",
    company_placeholder: "Opsional",
    whatsapp_label: "Nomor WhatsApp",
    whatsapp_placeholder: "+62 81x xxxx xxxx",
    topic_label: "Topik Hukum",
    topic_placeholder: "Pilih topik",
    topics: [
      "Kontrak & Dokumen Hukum",
      "Pendirian Perusahaan",
      "Ketenagakerjaan & HR",
      "Sengketa Komersial",
      "Properti & Real Estate",
      "Kekayaan Intelektual",
      "Lainnya",
    ],
    urgency_label: "Waktu",
    urgencies: ["Hari ini", "Minggu ini", "Fleksibel"],
    message_label: "Deskripsi Singkat",
    message_placeholder: "Jelaskan secara singkat masalah atau pertanyaan hukum Anda...",
    btn_wa: "Kirim via WhatsApp",
    btn_email: "Kirim via Email",
    err_name: "Nama wajib diisi",
    err_whatsapp: "Nomor WhatsApp wajib diisi",
    err_topic: "Silakan pilih topik",
    err_urgency: "Silakan pilih waktu",
    err_message: "Silakan deskripsikan masalah Anda (min. 10 karakter)",
  },
  footer: {
    tagline: "Pendampingan hukum bisnis yang cepat, jelas, dan praktis.",
    office: "Jakarta, Indonesia (Prototipe)",
    privacy_link: "Kebijakan Privasi",
    wa_label: "WhatsApp",
    email_label: "Email",
    disclaimer:
      "Website prototipe untuk demo. Semua nama, testimoni, dan klaim bersifat fiktif.",
    legal_note:
      "Website ini tidak menciptakan hubungan kuasa hukum-klien sampai adanya konfirmasi penunjukan.",
    copyright: "© 2024 Kantor Hukum NUSALEXA. Semua hak dilindungi.",
    nav_title: "Navigasi",
    contact_title: "Kontak",
    final_cta_title: "Siap untuk melangkah maju?",
    final_cta_subtitle:
      "Sebagian besar klien mendapat respons dalam hitungan jam. Mulai dengan pesan WhatsApp singkat.",
    final_cta_btn: "Mulai Konsultasi WhatsApp",
    start_today: "Mulai Hari Ini",
  },
  privacy: {
    title: "Kebijakan Privasi",
    back: "← Kembali ke beranda",
    intro:
      "Ini adalah kebijakan privasi prototipe untuk tujuan demonstrasi. Kantor Hukum NUSALEXA (prototipe) berkomitmen untuk melindungi informasi pribadi Anda.",
    sections: [
      {
        title: "Informasi yang Kami Kumpulkan",
        body: "Saat Anda menggunakan formulir kontak atau tautan WhatsApp di situs ini, Anda mungkin memberikan nama, nama perusahaan, nomor WhatsApp, dan deskripsi masalah hukum Anda. Informasi ini hanya digunakan untuk merespons pertanyaan Anda.",
      },
      {
        title: "Cara Kami Menggunakan Informasi Anda",
        body: "Informasi Anda digunakan untuk merespons pertanyaan hukum, memberikan estimasi biaya, dan mengelola penugasan jika Anda memilih untuk melanjutkan. Kami tidak menjual atau membagikan informasi Anda kepada pihak ketiga.",
      },
      {
        title: "Kerahasiaan",
        body: "Semua komunikasi diperlakukan sebagai rahasia. Privilese advokat-klien berlaku sejak komunikasi substantif pertama Anda. Anda dapat meminta NDA sebelum pengungkapan informasi bisnis sensitif.",
      },
      {
        title: "Retensi Data",
        body: "Komunikasi klien disimpan selama durasi penugasan dan sebagaimana diwajibkan oleh hukum Indonesia dan peraturan profesional. Anda dapat meminta penghapusan data Anda kapan saja.",
      },
      {
        title: "Kontak",
        body: "Untuk pertanyaan terkait privasi, hubungi kami di hello@nusaleza-law.id atau via WhatsApp.",
      },
    ],
  },
};

export const copy: Record<Lang, CopyShape> = { en, id };
