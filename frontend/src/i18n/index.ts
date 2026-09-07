import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import vi from "./locales/vi";
import en from "./locales/en";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            vi: { translation: vi },
            en: { translation: en }
        },
        fallbackLng: "vi",
        supportedLngs: ["vi", "en"],
        interpolation: {
            escapeValue: false
        },
        detection: {
            // Chỉ đổi ngôn ngữ khi người dùng tự bấm nút chuyển - không tự suy theo
            // ngôn ngữ trình duyệt (nhiều người Việt dùng trình duyệt tiếng Anh).
            order: ["localStorage"],
            caches: ["localStorage"],
            lookupLocalStorage: "language"
        }
    });

export default i18n;
