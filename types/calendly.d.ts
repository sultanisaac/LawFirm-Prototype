interface Calendly {
  initInlineWidget(options: {
    url: string;
    parentElement: HTMLElement | null;
    prefill?: {
      name?: string;
      email?: string;
      customAnswers?: Record<string, string>;
    };
    utm?: Record<string, string>;
  }): void;
  showPopupWidget(url: string): void;
  closePopupWidget(): void;
}

interface Window {
  Calendly?: Calendly;
}
