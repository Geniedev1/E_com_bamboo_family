import React, { FC, ReactElement } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: FC = (): ReactElement => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language?.startsWith("en") ? "en" : "vi";

    const toggleLanguage = (): void => {
        i18n.changeLanguage(currentLang === "vi" ? "en" : "vi");
    };

    return (
        <button
            type="button"
            onClick={toggleLanguage}
            aria-label="Switch language"
            className="flex h-8 items-center justify-center rounded-full border border-outline-variant/50 px-sm font-label-sm text-[13px] font-semibold text-on-surface-variant transition-colors hover:border-secondary hover:text-secondary"
        >
            {currentLang === "vi" ? "EN" : "VI"}
        </button>
    );
};

export default LanguageSwitcher;
