import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Table } from "antd";
import { AsyncThunk } from "@reduxjs/toolkit";

import { HeaderResponse, OrderResponse } from "../../types/types";
import { ACCOUNT_USER_ORDERS } from "../../constants/routeConstants";
import { selectTotalElements } from "../../redux-toolkit/orders/orders-selector";
import { useTablePagination } from "../../hooks/useTablePagination";
import { formatProductPrice } from "../../utils/priceUtils";

type PropsType = {
    orders: Array<OrderResponse>;
    loading: boolean;
    fetchOrders: AsyncThunk<HeaderResponse<OrderResponse>, number, {}>;
};

const OrdersTable: FC<PropsType> = ({ orders, loading, fetchOrders }): ReactElement => {
    const { t } = useTranslation();
    const totalElements = useSelector(selectTotalElements);
    const handleTableChange = useTablePagination<OrderResponse, number>(fetchOrders);

    return (
        <Table
            rowKey={"id"}
            onChange={handleTableChange}
            loading={loading}
            pagination={{
                total: totalElements,
                position: ["bottomRight", "topRight"]
            }}
            dataSource={orders}
            columns={[
                {
                    title: t("account.orderId"),
                    dataIndex: "id",
                    key: "id",
                    render: (_, order: OrderResponse) => <span className="font-label-sm text-primary">#{order.id}</span>
                },
                {
                    title: t("account.orderDate"),
                    dataIndex: "date",
                    key: "date",
                    sorter: (a, b) => a.date.localeCompare(b.date)
                },
                {
                    title: t("account.customerName"),
                    dataIndex: "firstName",
                    key: "firstName",
                    render: (_, order: OrderResponse) => `${order.firstName} ${order.lastName}`
                },
                {
                    title: t("account.email"),
                    dataIndex: "email",
                    key: "email"
                },
                {
                    title: t("account.totalAmount"),
                    dataIndex: "totalPrice",
                    key: "totalPrice",
                    sorter: (a, b) => a.totalPrice - b.totalPrice,
                    render: (_, order: OrderResponse) => (
                        <span className="font-label-sm text-secondary">{formatProductPrice(order.totalPrice)}</span>
                    )
                },
                {
                    title: t("account.actions"),
                    dataIndex: "operations",
                    key: "operations",
                    render: (_, order: OrderResponse) => (
                        <Link
                            to={`${ACCOUNT_USER_ORDERS}/${order.id}`}
                            className="inline-flex items-center gap-1 font-label-sm text-secondary hover:text-primary hover:no-underline"
                        >
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                            {t("account.viewDetails")}
                        </Link>
                    )
                }
            ]}
        />
    );
};

export default OrdersTable;
