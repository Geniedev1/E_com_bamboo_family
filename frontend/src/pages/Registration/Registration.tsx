import React, { FC, ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import loginHero from "../../img/login-hero.png";
import { selectErrors, selectIsAuthLoading, selectIsRegistered } from "../../redux-toolkit/auth/auth-selector";
import { registration } from "../../redux-toolkit/auth/auth-thunks";
import { resetAuthState, setAuthLoadingState } from "../../redux-toolkit/auth/auth-slice";
import { LoadingStatus } from "../../types/types";
import { LOGIN } from "../../constants/routeConstants";

const inputClass =
    "w-full bg-surface-container-low border-0 border-b-2 border-tertiary/20 focus:border-primary focus:outline-none rounded-t-lg px-md py-sm font-body-md text-on-surface";

const Registration: FC = (): ReactElement => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsAuthLoading);
    const isRegistered = useSelector(selectIsRegistered);
    const errors = useSelector(selectErrors);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(setAuthLoadingState(LoadingStatus.LOADED));

        return () => {
            dispatch(resetAuthState());
        };
    }, []);

    const onSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        dispatch(registration({ email, firstName, lastName, password, password2 }));
    };

    return (
        <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-margin-mobile py-lg">
            <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-surface rounded-xl overflow-hidden shadow-2xl shadow-primary/10 border border-outline-variant/30">
                {/* ===== Left: hero branding ===== */}
                <div className="hidden lg:block relative bg-surface-container-high">
                    <img
                        src={loginHero}
                        alt="Rattanovi"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
                    <div className="relative z-10 flex flex-col justify-end h-full p-lg">
                        <span className="font-headline-xl text-headline-xl leading-none text-white">Rattanovi</span>
                        <h2 className="font-headline-lg text-headline-lg mt-md leading-tight text-white">
                            {t("registration.heroTitle")}
                        </h2>
                        <p className="font-body-md text-body-md text-white opacity-90 mt-sm">
                            {t("registration.heroDesc")}
                        </p>
                        <span className="font-label-sm text-label-sm text-white/90 mt-lg">
                            {t("registration.heroBadge")}
                        </span>
                    </div>
                </div>

                {/* ===== Right: register form ===== */}
                <div className="p-lg md:p-xl flex flex-col justify-center">
                    <header className="mb-lg">
                        <h1 className="font-headline-lg text-headline-lg text-primary mb-xs">{t("registration.title")}</h1>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                            {t("registration.subtitle")}
                        </p>
                    </header>

                    {isRegistered && (
                        <div className="mb-md rounded-lg bg-primary/10 text-primary border border-primary/20 px-md py-sm font-body-md text-sm">
                            {t("registration.successMessage")}
                        </div>
                    )}

                    <form className="space-y-md" onSubmit={onSubmit}>
                        <div className="grid grid-cols-2 gap-md">
                            <div className="space-y-xs">
                                <label className="block font-label-sm text-label-sm text-on-surface-variant" htmlFor="reg-first-name">
                                    {t("registration.firstName")}
                                </label>
                                <input
                                    id="reg-first-name"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder={t("registration.firstNamePlaceholder")}
                                    className={inputClass}
                                />
                                {errors.firstNameError && (
                                    <p className="text-error font-label-sm text-label-sm">{errors.firstNameError}</p>
                                )}
                            </div>
                            <div className="space-y-xs">
                                <label className="block font-label-sm text-label-sm text-on-surface-variant" htmlFor="reg-last-name">
                                    {t("registration.lastName")}
                                </label>
                                <input
                                    id="reg-last-name"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder={t("registration.lastNamePlaceholder")}
                                    className={inputClass}
                                />
                                {errors.lastNameError && (
                                    <p className="text-error font-label-sm text-label-sm">{errors.lastNameError}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-xs">
                            <label className="block font-label-sm text-label-sm text-on-surface-variant" htmlFor="reg-email">
                                {t("registration.email")}
                            </label>
                            <input
                                id="reg-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@example.com"
                                className={inputClass}
                            />
                            {errors.emailError && (
                                <p className="text-error font-label-sm text-label-sm">{errors.emailError}</p>
                            )}
                        </div>

                        <div className="space-y-xs">
                            <label className="block font-label-sm text-label-sm text-on-surface-variant" htmlFor="reg-password">
                                {t("registration.password")}
                            </label>
                            <input
                                id="reg-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t("registration.passwordPlaceholder")}
                                className={inputClass}
                            />
                            {errors.passwordError && (
                                <p className="text-error font-label-sm text-label-sm">{errors.passwordError}</p>
                            )}
                        </div>

                        <div className="space-y-xs">
                            <label className="block font-label-sm text-label-sm text-on-surface-variant" htmlFor="reg-password2">
                                {t("registration.confirmPassword")}
                            </label>
                            <input
                                id="reg-password2"
                                type="password"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                placeholder={t("registration.confirmPasswordPlaceholder")}
                                className={inputClass}
                            />
                            {errors.password2Error && (
                                <p className="text-error font-label-sm text-label-sm">{errors.password2Error}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary text-on-primary font-label-sm text-label-sm py-md rounded-xl hover:bg-primary-container transition-colors mt-lg flex justify-center items-center gap-base disabled:opacity-60"
                        >
                            {t("registration.submit")}
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </form>

                    <div className="mt-lg pt-lg border-t border-outline-variant/30 text-center">
                        <p className="font-body-md text-body-md text-on-surface-variant">
                            {t("registration.haveAccount")}
                            <Link to={LOGIN} className="text-secondary font-bold hover:underline ml-xs">
                                {t("registration.loginNow")}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
