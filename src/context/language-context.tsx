"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "vi" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("vi");

  useEffect(() => {
    const saved = localStorage.getItem("catasoft_lang") as Language;
    if (saved && (saved === "vi" || saved === "en")) {
      setLang(saved);
    }
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("catasoft_lang", newLang);
  };

  const toggleLang = () => {
    const next = lang === "vi" ? "en" : "vi";
    handleSetLang(next);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
