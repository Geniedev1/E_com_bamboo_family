import React, { FC, ReactElement, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { MENU } from "../../constants/routeConstants";
import { selectProducts } from "../../redux-toolkit/products/products-selector";
import { fetchProducts } from "../../redux-toolkit/products/products-thunks";
import ProductCard from "../../components/ProductCard/ProductCard";

const heroImage =
    "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1800&q=80";
const storyImage =
    "https://images.unsplash.com/photo-1517840933437-c41356892b35?auto=format&fit=crop&w=1200&q=80";

const collectionImages = [
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80"
];

const Home: FC = (): ReactElement => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);

    const collections = [
        { title: t("home.collectionLivingTitle"), text: t("home.collectionLivingText"), image: collectionImages[0] },
        { title: t("home.collectionKitchenTitle"), text: t("home.collectionKitchenText"), image: collectionImages[1] },
        { title: t("home.collectionGiftTitle"), text: t("home.collectionGiftText"), image: collectionImages[2] }
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchProducts(0));
    }, [dispatch]);

    return (
        <div className="bg-background text-on-surface">
            <section className="relative min-h-[calc(100vh-72px)] overflow-hidden">
                <img className="absolute inset-0 h-full w-full object-cover" src={heroImage} alt={t("home.heroImageAlt")} />
                <div className="absolute inset-0 bg-[#173124]/30" />
                <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl flex-col justify-end px-margin-mobile pb-xl pt-lg md:px-margin-desktop">
                    <div className="max-w-3xl text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.34)]">
                        <p className="font-label-sm text-label-sm uppercase opacity-90">{t("home.craftTag")}</p>
                        <h1 className="mt-sm font-headline-xl text-[40px] leading-tight text-white md:text-headline-xl">
                            Rattanovi
                        </h1>
                        <p className="mt-md max-w-2xl font-body-lg text-body-lg text-white/90">
                            {t("home.heroDesc")}
                        </p>
                        <div className="mt-lg flex flex-wrap gap-sm">
                            <Link
                                className="inline-flex h-12 items-center justify-center rounded bg-secondary px-md font-label-sm text-label-sm text-white transition hover:bg-on-secondary-container hover:text-white hover:no-underline"
                                to={{ pathname: MENU, state: { id: "all" } }}
                            >
                                {t("home.viewProducts")}
                            </Link>
                            <a
                                className="inline-flex h-12 items-center justify-center rounded border border-white/70 px-md font-label-sm text-label-sm text-white transition hover:border-white hover:bg-white hover:text-primary hover:no-underline"
                                href="#craft-story"
                            >
                                {t("home.ourStory")}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-margin-mobile py-xl md:px-margin-desktop">
                <div className="mb-lg flex flex-col justify-between gap-sm md:flex-row md:items-end">
                    <div>
                        <p className="font-label-sm text-label-sm uppercase text-secondary">{t("home.newProductsTag")}</p>
                        <h2 className="mt-xs font-headline-lg text-headline-lg text-primary">{t("home.curatedTitle")}</h2>
                    </div>
                    <Link
                        className="font-label-sm text-label-sm text-primary transition hover:text-secondary hover:no-underline"
                        to={{ pathname: MENU, state: { id: "all" } }}
                    >
                        {t("home.viewAll")}
                    </Link>
                </div>
                <div className="grid gap-gutter sm:grid-cols-2 lg:grid-cols-4">
                    {products.slice(0, 4).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            <section id="craft-story" className="bg-[#fbf6eb] py-xl">
                <div className="mx-auto grid max-w-7xl gap-lg px-margin-mobile md:grid-cols-[1fr_1fr] md:px-margin-desktop">
                    <div className="overflow-hidden rounded-lg">
                        <img className="h-full min-h-[360px] w-full object-cover" src={storyImage} alt={t("home.storyImageAlt")} />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="font-label-sm text-label-sm uppercase text-secondary">{t("home.fromVillageTag")}</p>
                        <h2 className="mt-xs font-headline-xl text-[34px] leading-tight text-primary md:text-headline-xl">
                            {t("home.keepDetailTitle")}
                        </h2>
                        <p className="mt-md font-body-lg text-body-lg text-on-surface-variant">
                            {t("home.storyText")}
                        </p>
                        <div className="mt-lg grid grid-cols-3 gap-sm">
                            <div>
                                <strong className="block font-headline-lg text-headline-lg text-primary">48+</strong>
                                <span className="font-body-md text-body-md text-on-surface-variant">{t("home.artisans")}</span>
                            </div>
                            <div>
                                <strong className="block font-headline-lg text-headline-lg text-primary">12</strong>
                                <span className="font-body-md text-body-md text-on-surface-variant">{t("home.villages")}</span>
                            </div>
                            <div>
                                <strong className="block font-headline-lg text-headline-lg text-primary">100%</strong>
                                <span className="font-body-md text-body-md text-on-surface-variant">{t("home.natural")}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-margin-mobile py-xl md:px-margin-desktop">
                <div className="mb-lg max-w-2xl">
                    <p className="font-label-sm text-label-sm uppercase text-secondary">{t("home.collectionsTag")}</p>
                    <h2 className="mt-xs font-headline-lg text-headline-lg text-primary">{t("home.easyStyleTitle")}</h2>
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
                        {t("home.quote")}
                    </p>
                    <p className="mt-md font-label-sm text-label-sm uppercase text-secondary">Rattanovi</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
