import React, { FC, ReactElement, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { MENU, PRODUCT } from "../../constants/routeConstants";
import { selectProducts } from "../../redux-toolkit/products/products-selector";
import { fetchProducts } from "../../redux-toolkit/products/products-thunks";
import { ProductResponse } from "../../types/types";

const heroImage =
    "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1800&q=80";
const storyImage =
    "https://images.unsplash.com/photo-1517840933437-c41356892b35?auto=format&fit=crop&w=1200&q=80";

const collections = [
    {
        title: "Không gian sống",
        text: "Các món trang trí nhẹ nhàng cho phòng khách, bàn trà và góc đọc sách.",
        image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80"
    },
    {
        title: "Bếp và bàn ăn",
        text: "Khay, rổ, hộp đựng và vật dụng thủ công cho nhịp sống hàng ngày.",
        image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80"
    },
    {
        title: "Quà tặng thủ công",
        text: "Những sản phẩm có chất liệu tự nhiên, phù hợp làm quà tặng tinh tế.",
        image: "https://images.unsplash.com/photo-1607344645866-009c7d8c9df4?auto=format&fit=crop&w=900&q=80"
    }
];

const materialBadgeByIndex = ["Mây tự nhiên", "Tre hun khói", "Mây tự nhiên", "Nứa đan"];

type HomeProductCardProps = {
    product: ProductResponse;
    index: number;
};

const HomeProductCard: FC<HomeProductCardProps> = ({ product, index }): ReactElement => {
    const material = product.category || materialBadgeByIndex[index % materialBadgeByIndex.length];

    return (
        <Link
            className="group flex min-h-[438px] flex-col overflow-hidden rounded-lg border border-[#eadfca] bg-[#fffdf6] text-on-surface shadow-[0_8px_18px_-14px_rgba(83,61,31,0.32)] transition duration-300 hover:-translate-y-1 hover:text-on-surface hover:no-underline hover:shadow-[0_16px_28px_-20px_rgba(83,61,31,0.46)]"
            to={`${PRODUCT}/${product.id}`}
        >
            <div className="relative aspect-[1.28/1] overflow-hidden bg-[#f7f0e4]">
                <span className="absolute left-sm top-sm z-10 rounded-full bg-[#2e633f] px-sm py-[3px] font-label-sm text-[11px] uppercase leading-none text-white">
                    New
                </span>
                <span className="absolute right-sm top-sm z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-primary shadow-[0_8px_18px_-13px_rgba(83,61,31,0.48)] transition group-hover:text-secondary">
                    <span className="material-symbols-outlined text-[22px]">favorite</span>
                </span>
                <img
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    src={product.filename}
                    alt={product.productTitle}
                />
            </div>
            <div className="flex flex-1 flex-col p-sm">
                <h3 className="min-h-[52px] font-headline-md text-[18px] font-semibold leading-[1.45] text-primary">
                    {product.productTitle}
                </h3>
                <div className="mt-sm space-y-xs font-body-md text-[14px] leading-6 text-[#6b5b45]">
                    <div className="flex items-center gap-xs font-label-sm text-[15px] text-primary">
                        <span className="material-symbols-outlined text-[17px] text-[#7d8b54]">paid</span>
                        {product.price.toLocaleString("vi-VN")}.000 đ
                    </div>
                    <div className="flex items-center gap-xs">
                        <span className="material-symbols-outlined text-[17px] text-[#8c955f]">straighten</span>
                        <span className="truncate">{product.volume || "Kích thước đang cập nhật"}</span>
                    </div>
                    <div className="flex items-center gap-xs">
                        <span className="material-symbols-outlined text-[17px] text-[#8c955f]">layers</span>
                        <span className="truncate">{material || product.vendor}</span>
                    </div>
                </div>
                <span className="mt-auto flex h-10 items-center justify-center rounded-lg border border-[#b59c72] font-label-sm text-[14px] text-primary transition group-hover:bg-primary group-hover:text-white">
                    Xem chi tiết
                </span>
            </div>
        </Link>
    );
};

const Home: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchProducts(0));
    }, [dispatch]);

    return (
        <div className="bg-background text-on-surface">
            <section className="relative min-h-[calc(100vh-72px)] overflow-hidden">
                <img className="absolute inset-0 h-full w-full object-cover" src={heroImage} alt="Không gian thủ công Việt" />
                <div className="absolute inset-0 bg-[#173124]/30" />
                <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl flex-col justify-end px-margin-mobile pb-xl pt-lg md:px-margin-desktop">
                    <div className="max-w-3xl text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.34)]">
                        <p className="font-label-sm text-label-sm uppercase opacity-90">Mây tre thủ công</p>
                        <h1 className="mt-sm font-headline-xl text-[40px] leading-tight text-white md:text-headline-xl">
                            Làng Nghề Việt
                        </h1>
                        <p className="mt-md max-w-2xl font-body-lg text-body-lg text-white/90">
                            Sản phẩm thủ công từ vật liệu tự nhiên, được chọn lọc cho những không gian sống ấm áp,
                            bền vững và có câu chuyện.
                        </p>
                        <div className="mt-lg flex flex-wrap gap-sm">
                            <Link
                                className="inline-flex h-12 items-center justify-center rounded bg-secondary px-md font-label-sm text-label-sm text-white transition hover:bg-on-secondary-container hover:text-white hover:no-underline"
                                to={{ pathname: MENU, state: { id: "all" } }}
                            >
                                Xem sản phẩm
                            </Link>
                            <a
                                className="inline-flex h-12 items-center justify-center rounded border border-white/70 px-md font-label-sm text-label-sm text-white transition hover:border-white hover:bg-white hover:text-primary hover:no-underline"
                                href="#craft-story"
                            >
                                Câu chuyện
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-margin-mobile py-xl md:px-margin-desktop">
                <div className="mb-lg flex flex-col justify-between gap-sm md:flex-row md:items-end">
                    <div>
                        <p className="font-label-sm text-label-sm uppercase text-secondary">Sản phẩm mới</p>
                        <h2 className="mt-xs font-headline-lg text-headline-lg text-primary">Chọn lọc cho ngôi nhà</h2>
                    </div>
                    <Link
                        className="font-label-sm text-label-sm text-primary transition hover:text-secondary hover:no-underline"
                        to={{ pathname: MENU, state: { id: "all" } }}
                    >
                        Xem tất cả
                    </Link>
                </div>
                <div className="grid gap-gutter sm:grid-cols-2 lg:grid-cols-4">
                    {products.slice(0, 4).map((product, index) => (
                        <HomeProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>
            </section>

            <section id="craft-story" className="bg-[#fbf6eb] py-xl">
                <div className="mx-auto grid max-w-7xl gap-lg px-margin-mobile md:grid-cols-[1fr_1fr] md:px-margin-desktop">
                    <div className="overflow-hidden rounded-lg">
                        <img className="h-full min-h-[360px] w-full object-cover" src={storyImage} alt="Nghề thủ công truyền thống" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="font-label-sm text-label-sm uppercase text-secondary">Từ làng nghề</p>
                        <h2 className="mt-xs font-headline-xl text-[34px] leading-tight text-primary md:text-headline-xl">
                            Giữ chất mộc trong từng chi tiết
                        </h2>
                        <p className="mt-md font-body-lg text-body-lg text-on-surface-variant">
                            Mỗi sản phẩm được tạo nên từ kỹ thuật đan lát, xử lý vật liệu và hoàn thiện thủ công.
                            Thiết kế ưu tiên công năng, độ bền và vẻ đẹp tự nhiên của mây tre Việt.
                        </p>
                        <div className="mt-lg grid grid-cols-3 gap-sm">
                            <div>
                                <strong className="block font-headline-lg text-headline-lg text-primary">48+</strong>
                                <span className="font-body-md text-body-md text-on-surface-variant">nghệ nhân</span>
                            </div>
                            <div>
                                <strong className="block font-headline-lg text-headline-lg text-primary">12</strong>
                                <span className="font-body-md text-body-md text-on-surface-variant">làng nghề</span>
                            </div>
                            <div>
                                <strong className="block font-headline-lg text-headline-lg text-primary">100%</strong>
                                <span className="font-body-md text-body-md text-on-surface-variant">tự nhiên</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-margin-mobile py-xl md:px-margin-desktop">
                <div className="mb-lg max-w-2xl">
                    <p className="font-label-sm text-label-sm uppercase text-secondary">Bộ sưu tập</p>
                    <h2 className="mt-xs font-headline-lg text-headline-lg text-primary">Dễ phối trong từng góc nhà</h2>
                </div>
                <div className="grid gap-gutter md:grid-cols-3">
                    {collections.map((collection) => (
                        <article
                            key={collection.title}
                            className="overflow-hidden rounded-lg border border-[#eadfca] bg-[#fffdf6] shadow-[0_8px_18px_-14px_rgba(83,61,31,0.32)]"
                        >
                            <img className="h-64 w-full object-cover" src={collection.image} alt={collection.title} />
                            <div className="p-md">
                                <h3 className="font-headline-md text-headline-md text-primary">{collection.title}</h3>
                                <p className="mt-xs font-body-md text-body-md text-on-surface-variant">{collection.text}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="bg-surface-container-highest py-xl text-primary">
                <div className="mx-auto max-w-4xl px-margin-mobile text-center md:px-margin-desktop">
                    <p className="font-headline-lg text-headline-lg">
                        “Một sản phẩm tốt không chỉ đẹp trên kệ, mà còn làm nhịp sống hằng ngày chậm lại và dễ chịu hơn.”
                    </p>
                    <p className="mt-md font-label-sm text-label-sm uppercase text-secondary">Làng Nghề Việt</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
