import React, { FC, ReactElement, useState } from "react";
import { Rate } from "antd";
import { useTranslation } from "react-i18next";

import { FullProductResponse } from "../../../types/types";
import { getImageUrl } from "../../../utils/imageUrl";
import { getVisibleDimensions } from "../../../utils/dimensionUtils";

type PropsType = {
    product?: Partial<FullProductResponse>;
    reviewsLength: number;
    addToCart: () => void;
};

const ProductInfo: FC<PropsType> = ({ product, reviewsLength, addToCart }): ReactElement => {
    const { t } = useTranslation();
    const galleryImages =
        product?.images && product.images.length > 0
            ? product.images
            : product?.filename
            ? [product.filename]
            : [];
    const [activeImage, setActiveImage] = useState<number>(0);
    const mainImage = galleryImages[activeImage] || product?.filename;

    const inStock = product?.stockQuantity === undefined || product?.stockQuantity === null || product.stockQuantity > 0;
    const rating = product?.productRating && product.productRating > 0 ? product.productRating : 0;

    const dimensionRows = getVisibleDimensions(product || {}, t).map((dim) => ({
        label: dim.label,
        value: `${dim.value} cm`
    }));

    const details: Array<{ label: string; value?: string | number }> = [
        { label: t("product.type"), value: product?.type },
        ...dimensionRows,
        { label: t("product.origin"), value: product?.country },
        { label: t("product.year"), value: product?.year },
        { label: t("product.material"), value: product?.baseDescription },
        { label: t("product.description"), value: product?.description || product?.topDescription }
    ].filter((row) => row.value !== undefined && row.value !== null && `${row.value}`.trim() !== "");

    return (
        <div className="grid gap-lg md:grid-cols-2">
            <div>
                <div className="overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-container-low">
                    <img src={getImageUrl(mainImage)} alt={product?.productTitle} className="aspect-square w-full object-cover" />
                </div>
                {galleryImages.length > 1 && (
                    <div className="mt-sm flex flex-wrap gap-xs">
                        {galleryImages.map((src, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setActiveImage(index)}
                                aria-label={t("product.imageAlt", { index: index + 1 })}
                                className={`h-16 w-16 overflow-hidden rounded-lg border-2 transition ${
                                    index === activeImage
                                        ? "border-secondary"
                                        : "border-outline-variant/40 hover:border-secondary/60"
                                }`}
                            >
                                <img
                                    src={getImageUrl(src)}
                                    alt={`${product?.productTitle} ${index + 1}`}
                                    className="h-full w-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-col">
                <h1 className="font-headline-lg text-[28px] leading-tight text-primary">{product?.productTitle}</h1>
                {product?.vendor && (
                    <p className="mt-1 flex items-center gap-1 font-body-md text-body-md text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px] text-[#8c955f]">storefront</span>
                        {product.vendor}
                    </p>
                )}

                <div className="mt-sm flex items-center gap-2">
                    <Rate allowHalf disabled value={rating} />
                    <span className="font-body-md text-[13px] text-on-surface-variant">{t("product.reviewsCount", { count: reviewsLength })}</span>
                </div>

                <span
                    className={`mt-sm inline-flex w-fit items-center gap-1 rounded-full px-3 py-1 font-label-sm text-[13px] ${
                        inStock ? "bg-secondary-container text-on-secondary-container" : "bg-error-container text-error"
                    }`}
                >
                    <span className="material-symbols-outlined text-[16px]">{inStock ? "check_circle" : "cancel"}</span>
                    {inStock ? t("product.inStock") : t("product.outOfStock")}
                </span>

                <div className="mt-md flex flex-wrap items-center gap-4">
                    <button
                        type="button"
                        onClick={addToCart}
                        disabled={!inStock}
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-lg font-label-sm text-[15px] text-on-primary transition hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                        {t("product.addToCart")}
                    </button>
                </div>

                {details.length > 0 && (
                    <dl className="mt-lg divide-y divide-outline-variant/40 border-t border-outline-variant/40">
                        {details.map((row) => (
                            <div key={row.label} className="grid grid-cols-[130px_minmax(0,1fr)] gap-4 py-3">
                                <dt className="font-label-sm text-[14px] text-on-surface-variant">{row.label}</dt>
                                <dd className="font-body-md text-[14px] leading-relaxed text-on-surface">{row.value}</dd>
                            </div>
                        ))}
                    </dl>
                )}
            </div>
        </div>
    );
};

export default ProductInfo;
