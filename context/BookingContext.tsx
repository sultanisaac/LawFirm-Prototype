"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface BookingPrefillData {
  name: string;
  email: string;
  topic: string;
  whatsapp?: string;
}

interface BookingContextType {
  isOpen: boolean;
  prefillData: BookingPrefillData;
  openBookingModal: (data?: Partial<BookingPrefillData>) => void;
  closeBookingModal: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefillData, setPrefillData] = useState<BookingPrefillData>({
    name: "",
    email: "",
    topic: "",
  });

  const openBookingModal = (data?: Partial<BookingPrefillData>) => {
    if (data) {
      setPrefillData((prev) => ({
        ...prev,
        ...data,
      }));
    }
    setIsOpen(true);
  };

  const closeBookingModal = () => {
    setIsOpen(false);
  };

  return (
    <BookingContext.Provider value={{ isOpen, prefillData, openBookingModal, closeBookingModal }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
