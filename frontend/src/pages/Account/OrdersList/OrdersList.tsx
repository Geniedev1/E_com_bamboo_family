import React, { FC, ReactElement, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ShoppingOutlined } from "@ant-design/icons";

import { selectIsOrdersLoading, selectOrders } from "../../../redux-toolkit/orders/orders-selector";
import { fetchAllUsersOrdersFull } from "../../../redux-toolkit/orders/orders-thunks";
import { resetOrders } from "../../../redux-toolkit/orders/orders-slice";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import Spinner from "../../../components/Spinner/Spinner";
import { OrderResponse } from "../../../types/types";
import { ACCOUNT_USER_ORDERS } from "../../../constants/routeConstants";
import { formatProductPrice } from "../../../utils/priceUtils";

type CustomerGroup = {
    email: string;
    firstName: string;
    lastName: string;
    orders: OrderResponse[];
    total: number;
};

const OrdersList: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const isLoading = useSelector(selectIsOrdersLoading);
    const [query, setQuery] = useState<string>("");
    const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

    useEffect(() => {
        dispatch(fetchAllUsersOrdersFull());

        return () => {
            dispatch(resetOrders());
        };
    }, [dispatch]);

    const groups = useMemo<CustomerGroup[]>(() => {
        const map = new Map<string, CustomerGroup>();
        orders.forEach((order) => {
            const key = order.email;
            if (!map.has(key)) {
                map.set(key, {
                    email: order.email,
                    firstName: order.firstName,
                    lastName: order.lastName,
                    orders: [],
                    total: 0
                });
            }
            const group = map.get(key)!;
            group.orders.push(order);
            group.total += order.totalPrice;
        });
        return Array.from(map.values()).sort((a, b) => b.orders.length - a.orders.length);
    }, [orders]);

    const filteredGroups = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return groups;
        return groups.filter(
            (group) =>
                group.email.toLowerCase().includes(q) ||
                `${group.firstName} ${group.lastName}`.toLowerCase().includes(q)
        );
    }, [groups, query]);

    const toggle = (email: string): void => {
        setCollapsed((prev) => {
            const next = new Set(prev);
            if (next.has(email)) {
                next.delete(email);
            } else {
                next.add(email);
            }
            return next;
        });
    };

    return (
        <div>
            <ContentTitle title={"Đơn hàng theo khách hàng"} titleLevel={4} icon={<ShoppingOutlined />} />

            <div className="mb-md flex flex-col gap-sm sm:flex-row sm:items-center sm:justify-between">
                <p className="font-body-md text-[14px] text-on-surface-variant">
                    <span className="font-label-sm text-primary">{groups.length}</span> khách hàng ·{" "}
                    <span className="font-label-sm text-primary">{orders.length}</span> đơn hàng
                </p>
                <div className="flex min-w-0 items-center rounded-full bg-surface-container-low px-sm sm:w-[320px]">
                    <span className="material-symbols-outlined mr-xs text-[20px] text-on-surface-variant">search</span>
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Tìm khách hàng (tên hoặc email)..."
                        className="h-10 w-full bg-transparent font-body-md text-[14px] text-on-surface outline-none placeholder:text-on-surface-variant"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="flex min-h-[320px] items-center justify-center">
                    <Spinner />
                </div>
            ) : filteredGroups.length === 0 ? (
                <div className="flex min-h-[240px] flex-col items-center justify-center text-center">
                    <span className="material-symbols-outlined text-[44px] text-outline">receipt_long</span>
                    <p className="mt-sm font-body-md text-body-md text-on-surface-variant">
                        {orders.length === 0 ? "Chưa có đơn hàng nào." : "Không tìm thấy khách hàng phù hợp."}
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-sm">
                    {filteredGroups.map((group) => {
                        const isOpen = !collapsed.has(group.email);
                        const fullName = `${group.firstName ?? ""} ${group.lastName ?? ""}`.trim() || "Khách hàng";
                        const initial = (group.firstName || group.email || "?").charAt(0).toUpperCase();

                        return (
                            <div
                                key={group.email}
                                className="overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-container-lowest"
                            >
                                <button
                                    type="button"
                                    onClick={() => toggle(group.email)}
                                    aria-expanded={isOpen}
                                    className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-surface-container-low"
                                >
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary font-headline-md text-[18px] font-bold text-on-primary">
                                        {initial}
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block truncate font-label-sm text-[15px] text-primary">
                                            {fullName}
                                        </span>
                                        <span className="block truncate font-body-md text-[13px] text-on-surface-variant">
                                            {group.email}
                                        </span>
                                    </span>
                                    <span className="hidden shrink-0 flex-col items-end sm:flex">
                                        <span className="font-label-sm text-[14px] text-secondary">
                                            {formatProductPrice(group.total)}
                                        </span>
                                        <span className="font-body-md text-[12px] text-on-surface-variant">
                                            tổng chi tiêu
                                        </span>
                                    </span>
                                    <span className="ml-2 flex shrink-0 items-center gap-1 rounded-full bg-primary-fixed px-3 py-1 font-label-sm text-[13px] text-primary">
                                        {group.orders.length} đơn
                                    </span>
                                    <span
                                        className={`material-symbols-outlined shrink-0 text-[22px] text-on-surface-variant transition ${
                                            isOpen ? "rotate-180" : ""
                                        }`}
                                    >
                                        expand_more
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="border-t border-outline-variant/50">
                                        {group.orders.map((order) => (
                                            <div
                                                key={order.id}
                                                className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-outline-variant/40 px-4 py-3 last:border-b-0"
                                            >
                                                <span className="font-label-sm text-[14px] text-primary">
                                                    #{order.id}
                                                </span>
                                                <span className="flex items-center gap-1 font-body-md text-[13px] text-on-surface-variant">
                                                    <span className="material-symbols-outlined text-[16px]">
                                                        calendar_today
                                                    </span>
                                                    {order.date}
                                                </span>
                                                <span className="font-label-sm text-[14px] text-secondary">
                                                    {formatProductPrice(order.totalPrice)}
                                                </span>
                                                <Link
                                                    to={`${ACCOUNT_USER_ORDERS}/${order.id}`}
                                                    className="ml-auto inline-flex items-center gap-1 font-label-sm text-[13px] text-secondary hover:text-primary hover:no-underline"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">
                                                        visibility
                                                    </span>
                                                    Xem chi tiết
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default OrdersList;
