import React, { FC, ReactElement } from "react";
import { InstagramFilled, PinterestFilled, TwitterCircleFilled, YoutubeFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { CONTACTS } from "../../constants/routeConstants";

const onlineLinks = [
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "Shopee", href: "https://shopee.vn/" },
    { label: "Lazada", href: "https://www.lazada.vn/" },
    { label: "Tiki", href: "https://tiki.vn/" },
    { label: "Tiktokshop", href: "https://www.tiktok.com/" },
    { label: "Tải Catalogue", href: "/catalogue.pdf" }
];

const socialLinks = [
    { label: "Pinterest", href: "https://www.pinterest.com/", icon: <PinterestFilled /> },
    { label: "Twitter", href: "https://twitter.com/", icon: <TwitterCircleFilled /> },
    { label: "Instagram", href: "https://www.instagram.com/", icon: <InstagramFilled /> },
    { label: "Youtube", href: "https://www.youtube.com/", icon: <YoutubeFilled /> }
];

const linkClassName =
    "block font-body-md text-[14px] leading-7 text-primary-fixed-dim transition-colors hover:text-white hover:underline";

const Footer: FC = (): ReactElement => {
    return (
        <footer className="relative w-full overflow-hidden bg-primary text-primary-fixed">
            {/* Woven texture overlay */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage: "radial-gradient(rgba(255,255,255,0.10) 0.5px, transparent 0.5px)",
                    backgroundSize: "16px 16px"
                }}
            />

            <div className="relative mx-auto max-w-[1680px] px-margin-mobile py-xl md:px-margin-desktop">
                {/* Brand + social row */}
                <div className="mb-lg flex flex-col gap-md border-b border-white/10 pb-lg md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="font-headline-md text-headline-md text-white">Làng Nghề Việt</p>
                        <p className="mt-xs max-w-md font-body-md text-[14px] leading-6 text-primary-fixed-dim">
                            Tinh hoa mây tre đan Việt Nam, mang hơi thở thiên nhiên vào không gian sống hiện đại.
                        </p>
                    </div>
                    <div className="flex items-center gap-sm">
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-[20px] text-primary-fixed transition-colors hover:bg-white hover:text-primary hover:no-underline"
                                href={link.href}
                                aria-label={link.label}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Columns */}
                <div className="grid gap-lg md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.8fr]">
                    <section>
                        <h2 className="mb-sm font-label-sm text-[15px] text-white">Mua Online</h2>
                        <ul className="mb-0 space-y-xs">
                            {onlineLinks.map((link) => (
                                <li key={link.label}>
                                    <a className={linkClassName} href={link.href}>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-sm font-label-sm text-[15px] text-white">Thông tin chung</h2>
                        <ul className="mb-0 space-y-xs">
                            <li>
                                <Link className={linkClassName} to={CONTACTS}>
                                    Liên hệ
                                </Link>
                            </li>
                            <li>
                                <a className={linkClassName} href="/chinh-sach-van-chuyen">
                                    Chính sách vận chuyển
                                </a>
                            </li>
                            <li>
                                <a className={linkClassName} href="/chinh-sach-bao-hanh">
                                    Chính sách bảo hành
                                </a>
                            </li>
                            <li>
                                <a className={linkClassName} href="/cau-hoi-thuong-gap">
                                    Câu hỏi thường gặp
                                </a>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-sm font-label-sm text-[15px] text-white">Về Chúng Tôi</h2>
                        <p className="mb-sm max-w-[620px] font-body-md text-[14px] leading-6 text-primary-fixed-dim">
                            TrangBamboo - Thương hiệu/nhà sản xuất đồ tre mỹ nghệ hàng đầu với 15 năm kinh nghiệm.
                            Chúng tôi tự hào mang đến những sản phẩm thân thiện môi trường, kết hợp tinh hoa nghệ
                            thuật và thiên nhiên.
                        </p>
                        <p className="mb-0 flex items-center gap-xs font-label-sm text-[14px] text-white">
                            <span className="material-symbols-outlined text-[18px]">call</span>
                            0977877318 (FB/Zalo)
                        </p>
                    </section>
                </div>

                {/* Bottom bar */}
                <div className="mt-lg flex flex-col gap-xs border-t border-white/10 pt-md text-[13px] text-primary-fixed-dim md:flex-row md:items-center md:justify-between">
                    <p className="mb-0">© 2026 KhanhNguyen. Bản quyền đã được bảo hộ.</p>
                    <p className="mb-0">Handmade with care · Làng Nghề Việt</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
