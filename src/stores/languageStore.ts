import { atom } from "jotai";

export type Language = "ko" | "en" | "ja" | "zh" | "it";

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "ko", name: "Korean", nativeName: "한국어" },
  { code: "en", name: "English", nativeName: "English" },
  { code: "ja", name: "Japanese", nativeName: "日本語" },
  { code: "zh", name: "Chinese", nativeName: "中文" },
  { code: "it", name: "Italian", nativeName: "Italiano" },
];

// Load language from localStorage or default to Korean
const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") return "ko";

  const saved = localStorage.getItem("selectedLanguage");
  if (saved && SUPPORTED_LANGUAGES.some((lang) => lang.code === saved)) {
    return saved as Language;
  }
  return "ko";
};

// Language atom with localStorage persistence
export const languageAtom = atom<Language>(getInitialLanguage());

// Atom to handle language changes with localStorage persistence
export const setLanguageAtom = atom(null, (_, set, newLanguage: Language) => {
  set(languageAtom, newLanguage);
  if (typeof window !== "undefined") {
    localStorage.setItem("selectedLanguage", newLanguage);
  }
});

// Helper atom to get current language option
export const currentLanguageOptionAtom = atom<LanguageOption>((get) => {
  const currentLang = get(languageAtom);
  return (
    SUPPORTED_LANGUAGES.find((lang) => lang.code === currentLang) ||
    SUPPORTED_LANGUAGES[0]
  );
});
