import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";

import { ProductResponse } from "../../types/types";
import { ACCOUNT_ADMIN_PRODUCTS, PRODUCT } from "../../constants/routeConstants";
import { useCart } from "../../hooks/useCart";
import { formatProductPrice } from "../../utils/priceUtils";

type PropsType = {
    product: ProductResponse;
    edit?: boolean;
    onOpenDelete?: (product: ProductResponse) => void;
};

const clampTwoLines: React.CSSProperties = {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden"
};

const ProductCard: FC<PropsType> = ({ product, edit, onOpenDelete }): ReactElement => {
    const { addToCart } = useCart(product.id);

    const onClickAddToCart = (event: React.MouseEvent): void => {
        event.preventDefault();
        addToCart();
    };

    const hasReviews = product.reviewsCount > 0;
    const detailUrl = `${PRODUCT}/${product.id}`;

    return (
        <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-container-lowest shadow-[0_12px_30px_-24px_rgba(23,49,36,0.7)] transition duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-[0_24px_46px_-28px_rgba(23,49,36,0.55)]">
            <Link to={detailUrl} className="block hover:no-underline">
                <div className="relative aspect-[4/3] overflow-hidden bg-surface-container-low">
                    <img
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        src={product.filename}
                        alt={product.productTitle}
                    />
                    {hasReviews && (
                        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-[3px] font-label-sm text-[12px] leading-none text-primary shadow-[0_6px_16px_-10px_rgba(23,49,36,0.7)] backdrop-blur">
                            <span
                                className="material-symbols-outlined text-[15px] text-[#e0a93b]"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                star
                            </span>
                            {product.productRating.toFixed(1)}
                        </span>
                    )}
                </div>
            </Link>

            <div className="flex flex-1 flex-col p-4">
                <Link to={detailUrl} className="block hover:no-underline">
                    <h3
                        className="min-h-[44px] font-headline-md text-[16px] font-semibold leading-snug text-primary transition group-hover:text-secondary"
                        style={clampTwoLines}
                    >
                        {product.productTitle}
                    </h3>
                </Link>

                {product.vendor && (
                    <p className="mt-1 flex items-center gap-1 font-body-md text-[13px] text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-[#8c955f]">storefront</span>
                        <span className="truncate">{product.vendor}</span>
                    </p>
                )}

                {product.volume && (
                    <p className="mt-1 flex items-center gap-1 font-body-md text-[13px] text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-[#8c955f]">straighten</span>
                        <span className="truncate">Kích thước: {product.volume}</span>
                    </p>
                )}

                <div className="mt-auto pt-3">
                    <div className="flex items-end justify-between gap-2">
                        <span className="font-headline-md text-[18px] font-bold text-secondary">
                            {formatProductPrice(product.price)}
                        </span>
                        <span className="flex items-center gap-1 whitespace-nowrap font-body-md text-[12px] text-on-surface-variant">
                            <span className="material-symbols-outlined text-[15px]">reviews</span>
                            {hasReviews ? `${product.reviewsCount} đánh giá` : "Chưa có đánh giá"}
                        </span>
                    </div>

                    {edit ? (
                        <div className="mt-3 grid grid-cols-2 gap-2">
                            <Link
                                to={`${ACCOUNT_ADMIN_PRODUCTS}/${product.id}`}
                                className="flex h-10 items-center justify-center gap-1 rounded-lg border border-outline-variant bg-surface-container-lowest font-label-sm text-[14px] text-primary transition hover:border-secondary hover:text-secondary hover:no-underline"
                            >
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                Sửa
                            </Link>
                            <button
                                type="button"
                                onClick={() => onOpenDelete!(product)}
                                className="flex h-10 items-center justify-center gap-1 rounded-lg border border-[#e6c3b6] bg-[#fdf1ec] font-label-sm text-[14px] text-[#b0442a] transition hover:bg-[#f7ddd2]"
                            >
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                Xóa
                            </button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={onClickAddToCart}
                            className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary font-label-sm text-[14px] text-on-primary transition hover:bg-primary-container"
                        >
                            <span className="material-symbols-outlined text-[19px]">add_shopping_cart</span>
                            Thêm vào giỏ
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
