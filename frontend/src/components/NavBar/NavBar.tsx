import React, { FC, ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "antd";

import { selectUserFromUserState } from "../../redux-toolkit/user/user-selector";
import { selectCartItemsCount } from "../../redux-toolkit/cart/cart-selector";
import { logoutSuccess } from "../../redux-toolkit/user/user-slice";
import { ACCOUNT, BASE, CART, CONTACTS, LOGIN, MENU, REGISTRATION } from "../../constants/routeConstants";

const NavBar: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const usersData = useSelector(selectUserFromUserState);
    const cartItemsCount = useSelector(selectCartItemsCount);

    const navLinkBase =
        "font-label-sm text-label-sm pb-1 transition-all hover:text-secondary hover:no-underline dark:hover:text-secondary-fixed-dim";
    const activeNavLink =
        "text-secondary dark:text-secondary-fixed-dim border-b-2 border-secondary dark:border-secondary-fixed-dim";
    const inactiveNavLink = "text-on-surface-variant dark:text-outline";

    const getNavLinkClass = (path: string): string =>
        `${navLinkBase} ${location.pathname === path ? activeNavLink : inactiveNavLink}`;

    const closeMobileMenu = (): void => setIsMenuOpen(false);

    const handleLogout = (): void => {
        localStorage.removeItem("token");
        dispatch(logoutSuccess());
        closeMobileMenu();
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-md shadow-sm transition-all duration-300 ease-in-out">
            <div className="relative flex justify-start items-center gap-sm max-w-7xl mx-auto px-margin-mobile md:justify-between md:px-margin-desktop py-4">
                <Link to={BASE} className="max-w-[220px] truncate font-headline-md text-[22px] font-bold text-primary dark:text-primary-fixed hover:text-primary hover:no-underline md:max-w-none md:text-headline-md">
                    Làng Nghề Việt
                </Link>
                <ul className="hidden md:flex space-x-gutter mb-0">
                    <li>
                        <Link className={getNavLinkClass(BASE)} to={BASE}>
                            Trang chủ
                        </Link>
                    </li>
                    <li>
                        <Link className={getNavLinkClass(MENU)} to={{ pathname: MENU, state: { id: "all" } }}>
                            Sản phẩm
                        </Link>
                    </li>
                    <li>
                        <Link className={getNavLinkClass(CONTACTS)} to={CONTACTS}>
                            Liên hệ
                        </Link>
                    </li>
                </ul>
                <div className="flex shrink-0 items-center space-x-sm text-primary dark:text-primary-fixed md:space-x-md">
                    <Link to={CART} className="hover:text-secondary dark:hover:text-secondary-fixed-dim transition-all flex items-center text-primary hover:no-underline">
                        <Badge count={cartItemsCount} size="small" color={"#2e6a45"}>
                            <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
                        </Badge>
                    </Link>
                    {usersData ? (
                        <div className="hidden items-center space-x-sm md:flex">
                            <Link to={ACCOUNT} className="hover:text-secondary dark:hover:text-secondary-fixed-dim transition-all flex items-center text-primary hover:no-underline" title="My Account">
                                <span className="material-symbols-outlined text-[24px]">person</span>
                            </Link>
                            <button type="button" onClick={handleLogout} className="hover:text-secondary dark:hover:text-secondary-fixed-dim transition-all flex items-center" title="Logout">
                                <span className="material-symbols-outlined text-[24px]">logout</span>
                            </button>
                        </div>
                    ) : (
                        <Link to={LOGIN} className="hidden hover:text-secondary dark:hover:text-secondary-fixed-dim transition-all items-center text-primary hover:no-underline md:flex" title="Login / Register">
                            <span className="material-symbols-outlined text-[24px]">login</span>
                        </Link>
                    )}
                    <button
                        type="button"
                        className="md:hidden hover:text-secondary dark:hover:text-secondary-fixed-dim transition-all flex items-center"
                        aria-label="Mở menu"
                        aria-expanded={isMenuOpen}
                        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
                    >
                        <span className="material-symbols-outlined text-[24px]">
                            {isMenuOpen ? "close" : "menu"}
                        </span>
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden border-t border-outline-variant/40 bg-surface/95 dark:bg-surface-dim/95 backdrop-blur-md px-margin-mobile pb-md">
                    <ul className="flex flex-col gap-sm pt-sm mb-0">
                        <li>
                            <Link className={getNavLinkClass(BASE)} to={BASE} onClick={closeMobileMenu}>
                                Trang chủ
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={getNavLinkClass(MENU)}
                                to={{ pathname: MENU, state: { id: "all" } }}
                                onClick={closeMobileMenu}
                            >
                                Sản phẩm
                            </Link>
                        </li>
                        <li>
                            <Link className={getNavLinkClass(CONTACTS)} to={CONTACTS} onClick={closeMobileMenu}>
                                Liên hệ
                            </Link>
                        </li>
                        {!usersData && (
                            <li className="flex gap-md pt-sm">
                                <Link className={getNavLinkClass(LOGIN)} to={LOGIN} onClick={closeMobileMenu}>
                                    Đăng nhập
                                </Link>
                                <Link
                                    className={getNavLinkClass(REGISTRATION)}
                                    to={REGISTRATION}
                                    onClick={closeMobileMenu}
                                >
                                    Đăng ký
                                </Link>
                            </li>
                        )}
                        {usersData && (
                            <li className="flex gap-md pt-sm">
                                <Link className={getNavLinkClass(ACCOUNT)} to={ACCOUNT} onClick={closeMobileMenu}>
                                    Tài khoản
                                </Link>
                                <button
                                    type="button"
                                    className={`${navLinkBase} ${inactiveNavLink}`}
                                    onClick={handleLogout}
                                >
                                    Đăng xuất
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
