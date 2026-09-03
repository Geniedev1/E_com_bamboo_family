import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectCartItems, selectIsCartLoading, selectTotalPrice } from "../../redux-toolkit/cart/cart-selector";
import { fetchCart } from "../../redux-toolkit/cart/cart-thunks";
import {
    calculateCartPrice,
    removeProductById,
    resetCartState,
    setCartItemsCount
} from "../../redux-toolkit/cart/cart-slice";
import CartItem from "./CartItem/CartItem";
import Spinner from "../../components/Spinner/Spinner";
import { MENU, ORDER } from "../../constants/routeConstants";
import { formatVnd } from "../../utils/priceUtils";

const Cart: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const products = useSelector(selectCartItems);
    const totalPrice = useSelector(selectTotalPrice);
    const isCartLoading = useSelector(selectIsCartLoading);
    const [productInCart, setProductInCart] = useState(() => new Map());

    useEffect(() => {
        window.scrollTo(0, 0);
        const productsFromLocalStorage: Map<number, number> = new Map(
            JSON.parse(localStorage.getItem("products") as string)
        );

        dispatch(fetchCart(Array.from(productsFromLocalStorage.keys())));
        productsFromLocalStorage.forEach((value: number, key: number) => {
            setProductInCart(productInCart.set(key, value));
        });

        return () => {
            dispatch(resetCartState());
        };
    }, []);

    const deleteFromCart = (productId: number): void => {
        productInCart.delete(productId);

        if (productInCart.size === 0) {
            localStorage.removeItem("products");
            setProductInCart(new Map());
        } else {
            localStorage.setItem("products", JSON.stringify(Array.from(productInCart.entries())));
        }
        dispatch(removeProductById(productId));
        dispatch(setCartItemsCount(productInCart.size));
    };

    const onChangeProductItemCount = (productId: number, inputValue: number): void => {
        setProducts(productId, inputValue);
        dispatch(calculateCartPrice(products));
    };

    const setProducts = (productId: number, productCount: number): void => {
        setProductInCart(productInCart.set(productId, productCount));
        localStorage.setItem("products", JSON.stringify(Array.from(productInCart.entries())));
    };

    return (
        <div className="min-h-[calc(100vh-72px)] bg-background">
            <div className="mx-auto max-w-7xl px-margin-mobile py-xl md:px-margin-desktop">
                <h1 className="mb-lg font-headline-lg text-headline-lg text-primary">Giỏ hàng</h1>

                {isCartLoading ? (
                    <Spinner />
                ) : products.length === 0 ? (
                    <div className="mx-auto flex max-w-md flex-col items-center rounded-lg border border-[#eadfca] bg-[#fffdf6] px-lg py-xl text-center shadow-[0_8px_18px_-14px_rgba(83,61,31,0.32)]">
                        <div className="grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary">
                            <span className="material-symbols-outlined text-[32px]">shopping_cart</span>
                        </div>
                        <h2 className="mt-md font-headline-md text-[20px] text-primary">
                            Giỏ hàng của bạn đang trống
                        </h2>
                        <p className="mt-xs font-body-md text-[14px] leading-6 text-on-surface-variant">
                            Hãy khám phá bộ sưu tập mây tre và thêm những sản phẩm bạn yêu thích.
                        </p>
                        <Link
                            to={{ pathname: MENU, state: { id: "all" } }}
                            className="mt-lg inline-flex items-center gap-base rounded-xl bg-primary px-lg py-sm font-label-sm text-label-sm text-on-primary transition-colors hover:bg-primary-container hover:text-white hover:no-underline"
                        >
                            <span className="material-symbols-outlined text-[18px]">storefront</span>
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                ) : (
                    <div className="grid items-start gap-lg lg:grid-cols-[1fr_360px]">
                        {/* Item list */}
                        <div className="space-y-md">
                            {products.map((product) => (
                                <CartItem
                                    key={product.id}
                                    product={product}
                                    productInCart={productInCart.get(product.id)}
                                    onChangeProductItemCount={onChangeProductItemCount}
                                    deleteFromCart={deleteFromCart}
                                />
                            ))}
                        </div>

                        {/* Order summary */}
                        <aside className="rounded-lg border border-[#eadfca] bg-[#fffdf6] p-lg shadow-[0_8px_18px_-14px_rgba(83,61,31,0.32)] lg:sticky lg:top-[96px]">
                            <h2 className="font-headline-md text-[20px] text-primary">Tóm tắt đơn hàng</h2>
                            <div className="mt-md space-y-sm border-b border-outline-variant/30 pb-md font-body-md text-[14px]">
                                <div className="flex justify-between">
                                    <span className="text-on-surface-variant">
                                        Tạm tính ({products.length} sản phẩm)
                                    </span>
                                    <span className="text-on-surface">{formatVnd(totalPrice)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-on-surface-variant">Phí vận chuyển</span>
                                    <span className="text-on-surface-variant">Tính khi thanh toán</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between py-md">
                                <span className="font-label-sm text-[15px] text-on-surface">Tổng cộng</span>
                                <span className="font-headline-md text-[22px] text-primary">{formatVnd(totalPrice)}</span>
                            </div>
                            <Link
                                to={ORDER}
                                className="flex w-full items-center justify-center gap-base rounded-xl bg-primary px-lg py-md font-label-sm text-label-sm text-on-primary transition-colors hover:bg-primary-container hover:text-white hover:no-underline"
                            >
                                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                                Thanh toán
                            </Link>
                            <Link
                                to={{ pathname: MENU, state: { id: "all" } }}
                                className="mt-sm block text-center font-label-sm text-[14px] text-secondary hover:underline"
                            >
                                Tiếp tục mua sắm
                            </Link>
                        </aside>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
