import React, { FC, ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import loginHero from "../../img/login-hero.png";
import { selectErrors, selectIsAuthLoading, selectIsRegistered } from "../../redux-toolkit/auth/auth-selector";
import { registration } from "../../redux-toolkit/auth/auth-thunks";
import { resetAuthState, setAuthLoadingState } from "../../redux-toolkit/auth/auth-slice";
import { LoadingStatus } from "../../types/types";
import { LOGIN } from "../../constants/routeConstants";

const inputClass =
    "w-full bg-surface-container-low border-0 border-b-2 border-tertiary/20 focus:border-primary focus:outline-none rounded-t-lg px-md py-sm font-body-md text-on-surface";

const Registration: FC = (): ReactElement => {
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
                            Bắt đầu hành trình cùng nghề thủ công Việt.
                        </h2>
                        <p className="font-body-md text-body-md text-white opacity-90 mt-sm">
                            Tạo tài khoản để nhận ưu đãi, theo dõi đơn hàng và lưu lại những món đồ mây tre yêu thích.
                        </p>
                        <span className="font-label-sm text-label-sm text-white/90 mt-lg">
                            +2,000 nghệ nhân và khách hàng đồng hành
                        </span>
                    </div>
                </div>

                {/* ===== Right: register form ===== */}
                <div className="p-lg md:p-xl flex flex-col justify-center">
                    <header className="mb-lg">
                        <h1 className="font-headline-lg text-headline-lg text-primary mb-xs">Bắt đầu hành trình</h1>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                            Tạo tài khoản để nhận ưu đãi và lưu lại những món đồ yêu thích.
                        </p>
                    </header>

                    {isRegistered && (
                        <div className="mb-md rounded-lg bg-primary/10 text-primary border border-primary/20 px-md py-sm font-body-md text-sm">
                            Đăng ký thành công! Vui lòng kiểm tra email để kích hoạt tài khoản.
                        </div>
                    )}

                    <form className="space-y-md" onSubmit={onSubmit}>
                        <div className="grid grid-cols-2 gap-md">
                            <div className="space-y-xs">
                                <label className="block font-label-sm text-label-sm text-on-surface-variant" htmlFor="reg-first-name">
                                    Họ
                                </label>
                                <input
                                    id="reg-first-name"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Nguyễn"
                                    className={inputClass}
                                />
                                {errors.firstNameError && (
                                    <p className="text-error font-label-sm text-label-sm">{errors.firstNameError}</p>
                                )}
                            </div>
                            <div className="space-y-xs">
                                <label className="block font-label-sm text-label-sm text-on-surface-variant" htmlFor="reg-last-name">
                                    Tên
                                </label>
                                <input
                                    id="reg-last-name"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Văn A"
                                    className={inputClass}
                                />
                                {errors.lastNameError && (
                                    <p className="text-error font-label-sm text-label-sm">{errors.lastNameError}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-xs">
                            <label className="block font-label-sm text-label-sm text-on-surface-variant" htmlFor="reg-email">
                                Email
                            </label>
                            <input
                                id="reg-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@vi-du.com"
                                className={inputClass}
                            />
                            {errors.emailError && (
                                <p className="text-error font-label-sm text-label-sm">{errors.emailError}</p>
                            )}
                        </div>

                        <div className="space-y-xs">
                            <label className="block font-label-sm text-label-sm text-on-surface-variant" htmlFor="reg-password">
                                Mật khẩu
                            </label>
                            <input
                                id="reg-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Tối thiểu 6 ký tự"
                                className={inputClass}
                            />
                            {errors.passwordError && (
                                <p className="text-error font-label-sm text-label-sm">{errors.passwordError}</p>
                            )}
                        </div>

                        <div className="space-y-xs">
                            <label className="block font-label-sm text-label-sm text-on-surface-variant" htmlFor="reg-password2">
                                Xác nhận mật khẩu
                            </label>
                            <input
                                id="reg-password2"
                                type="password"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                placeholder="Nhập lại mật khẩu"
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
                            Đăng ký tài khoản
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </form>

                    <div className="mt-lg pt-lg border-t border-outline-variant/30 text-center">
                        <p className="font-body-md text-body-md text-on-surface-variant">
                            Đã có tài khoản?
                            <Link to={LOGIN} className="text-secondary font-bold hover:underline ml-xs">
                                Đăng nhập
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
