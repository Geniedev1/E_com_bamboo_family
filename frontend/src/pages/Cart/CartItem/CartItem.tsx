import React, { FC, ReactElement, useEffect, useState } from "react";

import { ProductResponse } from "../../../types/types";
import { formatVnd } from "../../../utils/priceUtils";
import RemoveButton from "./RemoveButton";

type PropsType = {
    product: ProductResponse;
    productInCart: number;
    onChangeProductItemCount: (productId: number, inputValue: number) => void;
    deleteFromCart: (productId: number) => void;
};

const CartItem: FC<PropsType> = ({
    product,
    productInCart,
    onChangeProductItemCount,
    deleteFromCart
}): ReactElement => {
    const [productCount, setProductCount] = useState(1);

    useEffect(() => {
        setProductCount(productInCart);
    }, []);

    const changeCount = (value: number): void => {
        const next = Math.min(99, Math.max(1, value));
        setProductCount(next);
        onChangeProductItemCount(product.id, next);
    };

    return (
        <div className="flex flex-col gap-md rounded-lg border border-[#eadfca] bg-[#fffdf6] p-md shadow-[0_8px_18px_-14px_rgba(83,61,31,0.32)] sm:flex-row">
            <img
                src={product.filename}
                alt={product.productTitle}
                className="h-28 w-28 shrink-0 rounded-lg bg-[#f7f0e4] object-cover"
            />

            <div className="flex min-w-0 flex-1 flex-col">
                <p className="font-label-sm text-[11px] uppercase tracking-wide text-secondary">{product.vendor}</p>
                <h3 className="font-headline-md text-[18px] leading-snug text-primary">{product.productTitle}</h3>
                {product.volume && (
                    <p className="mt-xs font-body-md text-[13px] text-on-surface-variant">{product.volume} ml</p>
                )}

                <div className="mt-auto flex items-center justify-between pt-sm">
                    {/* Quantity stepper */}
                    <div className="inline-flex items-center rounded-lg border border-outline-variant/50">
                        <button
                            type="button"
                            aria-label="Giảm số lượng"
                            onClick={() => changeCount(productCount - 1)}
                            disabled={productCount <= 1}
                            className="grid h-9 w-9 place-items-center text-on-surface-variant transition-colors hover:text-primary disabled:opacity-40"
                        >
                            <span className="material-symbols-outlined text-[18px]">remove</span>
                        </button>
                        <span className="w-9 text-center font-label-sm text-[15px] text-on-surface">{productCount}</span>
                        <button
                            type="button"
                            aria-label="Tăng số lượng"
                            onClick={() => changeCount(productCount + 1)}
                            disabled={productCount >= 99}
                            className="grid h-9 w-9 place-items-center text-on-surface-variant transition-colors hover:text-primary disabled:opacity-40"
                        >
                            <span className="material-symbols-outlined text-[18px]">add</span>
                        </button>
                    </div>

                    <RemoveButton productId={product.id} deleteFromCart={deleteFromCart} />
                </div>
            </div>

            <div className="shrink-0 text-right sm:min-w-[110px]">
                <p className="font-headline-md text-[18px] text-primary">{formatVnd(product.price * productCount)}</p>
                {productCount > 1 && (
                    <p className="mt-xs font-body-md text-[12px] text-on-surface-variant">
                        {formatVnd(product.price)} × {productCount}
                    </p>
                )}
            </div>
        </div>
    );
};

export default CartItem;
