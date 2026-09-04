import React, { FC, ReactElement, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import loginHero from "../../img/login-hero.png";
import googleLogo from "../../img/google.png";
import { selectErrorMessage } from "../../redux-toolkit/auth/auth-selector";
import { selectSuccessMessage } from "../../redux-toolkit/user/user-selector";
import { resetAuthState } from "../../redux-toolkit/auth/auth-slice";
import { activateAccount, login } from "../../redux-toolkit/auth/auth-thunks";
import { FORGOT, REGISTRATION } from "../../constants/routeConstants";
import SocialButton from "./SocialButton/SocialButton";

const Login: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams<{ code: string }>();
    const errorMessage = useSelector(selectErrorMessage);
    const successMessage = useSelector(selectSuccessMessage);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (params.code) {
            dispatch(activateAccount(params.code));
        }

        return () => {
            dispatch(resetAuthState());
        };
    }, []);

    const onSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        dispatch(login({ userData: { email, password }, history }));
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
                            Gìn giữ nét đẹp truyền thống trong không gian hiện đại.
                        </h2>
                        <p className="font-body-md text-body-md text-white opacity-90 mt-sm">
                            Hành trình mang tinh hoa mây tre đan Việt Nam đến với mọi ngôi nhà, nơi mỗi sản phẩm là một
                            câu chuyện về sự tỉ mỉ và tâm huyết.
                        </p>
                        <span className="font-label-sm text-label-sm text-white/90 mt-lg">
                            +2,000 nghệ nhân và khách hàng đồng hành
                        </span>
                    </div>
                </div>

                {/* ===== Right: login form ===== */}
                <div className="p-lg md:p-xl flex flex-col justify-center">
                    <header className="mb-lg">
                        <h1 className="font-headline-lg text-headline-lg text-primary mb-xs">Chào mừng trở lại</h1>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                            Vui lòng đăng nhập để tiếp tục khám phá các tác phẩm thủ công.
                        </p>
                    </header>

                    {errorMessage && (
                        <div className="mb-md rounded-lg bg-error-container text-on-error-container px-md py-sm font-body-md text-sm">
                            {errorMessage}
                        </div>
                    )}
                    {successMessage && (
                        <div className="mb-md rounded-lg bg-primary/10 text-primary border border-primary/20 px-md py-sm font-body-md text-sm">
                            {successMessage}
                        </div>
                    )}

                    <form className="space-y-md" onSubmit={onSubmit}>
                        <div className="space-y-xs">
                            <label className="block font-label-sm text-label-sm text-on-surface-variant" htmlFor="login-email">
                                Email
                            </label>
                            <input
                                id="login-email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@vi-du.com"
                                className="w-full bg-surface-container-low border-0 border-b-2 border-tertiary/20 focus:border-primary focus:outline-none rounded-t-lg px-md py-sm font-body-md text-on-surface"
                            />
                        </div>

                        <div className="space-y-xs">
                            <div className="flex justify-between items-center">
                                <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="login-password">
                                    Mật khẩu
                                </label>
                                <Link to={FORGOT} className="text-secondary font-label-sm text-label-sm hover:underline">
                                    Quên mật khẩu?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    id="login-password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-surface-container-low border-0 border-b-2 border-tertiary/20 focus:border-primary focus:outline-none rounded-t-lg px-md py-sm pr-12 font-body-md text-on-surface"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label="Hiện/ẩn mật khẩu"
                                    className="absolute right-md top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface-variant"
                                >
                                    <span className="material-symbols-outlined">
                                        {showPassword ? "visibility_off" : "visibility"}
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-sm pt-xs">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                                className="w-5 h-5 rounded border-outline-variant accent-primary"
                            />
                            <label htmlFor="remember" className="font-body-md text-body-md text-on-surface-variant select-none">
                                Ghi nhớ đăng nhập
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-on-primary font-label-sm text-label-sm py-md rounded-xl hover:bg-primary-container transition-colors mt-lg flex justify-center items-center gap-base"
                        >
                            Đăng nhập
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </form>

                    <div className="mt-lg pt-lg border-t border-outline-variant/30 text-center">
                        <p className="font-body-md text-body-md text-on-surface-variant">
                            Chưa có tài khoản?
                            <Link to={REGISTRATION} className="text-secondary font-bold hover:underline ml-xs">
                                Đăng ký ngay
                            </Link>
                        </p>
                    </div>

                    <div className="mt-lg">
                        <div className="relative flex items-center py-sm">
                            <div className="flex-grow border-t border-outline-variant/30" />
                            <span className="flex-shrink mx-md font-label-sm text-label-sm text-outline">
                                Hoặc tiếp tục với
                            </span>
                            <div className="flex-grow border-t border-outline-variant/30" />
                        </div>
                        <div className="mt-md">
                            <SocialButton socialNetwork="google" image={googleLogo} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
