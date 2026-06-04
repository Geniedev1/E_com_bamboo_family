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
    "block font-body-md text-[14px] leading-7 text-on-surface-variant transition hover:text-primary hover:underline";

const Footer: FC = (): ReactElement => {
    return (
        <footer className="w-full border-t border-outline-variant/30 bg-surface-container-highest text-on-surface dark:bg-surface-container">
            <div className="mx-auto grid max-w-[1680px] gap-lg px-margin-mobile py-lg md:px-margin-desktop lg:grid-cols-[1fr_1fr_1.65fr_0.9fr] lg:py-[64px]">
                <section>
                    <h2 className="mb-sm font-label-sm text-[16px] text-primary">Mua Online</h2>
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
                    <h2 className="mb-sm font-label-sm text-[16px] text-primary">Thông tin chung</h2>
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
                    <h2 className="mb-sm font-label-sm text-[16px] text-primary">Về Chúng Tôi</h2>
                    <p className="mb-xs max-w-[620px] font-body-md text-[14px] leading-6 text-on-surface-variant">
                        TrangBamboo - Thương hiệu/nhà sản xuất đồ tre mỹ nghệ hàng đầu với 15 năm kinh nghiệm.
                        Chúng tôi tự hào mang đến những sản phẩm thân thiện môi trường, kết hợp tinh hoa nghệ
                        thuật và thiên nhiên.
                    </p>
                    <p className="mb-xs font-label-sm text-[14px] text-primary">Điện thoại: 0977877318 (FB/Zalo)</p>
                    <p className="mb-0 font-body-md text-[14px] leading-6 text-on-surface-variant">
                        © 2026 KhanhNguyen. Bản quyền đã được bảo hộ
                    </p>
                </section>

                <section className="lg:justify-self-end">
                    <h2 className="mb-sm font-label-sm text-[16px] text-primary">Theo dõi chúng tôi</h2>
                    <div className="flex items-center gap-sm">
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-[22px] text-primary transition hover:bg-primary-fixed hover:text-primary"
                                href={link.href}
                                aria-label={link.label}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </section>
            </div>
        </footer>
    );
};

export default Footer;
