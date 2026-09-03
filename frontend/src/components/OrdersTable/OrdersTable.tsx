import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
                    title: "Mã đơn",
                    dataIndex: "id",
                    key: "id",
                    render: (_, order: OrderResponse) => <span className="font-label-sm text-primary">#{order.id}</span>
                },
                {
                    title: "Ngày đặt",
                    dataIndex: "date",
                    key: "date",
                    sorter: (a, b) => a.date.localeCompare(b.date)
                },
                {
                    title: "Khách hàng",
                    dataIndex: "firstName",
                    key: "firstName",
                    render: (_, order: OrderResponse) => `${order.firstName} ${order.lastName}`
                },
                {
                    title: "Email",
                    dataIndex: "email",
                    key: "email"
                },
                {
                    title: "Tổng tiền",
                    dataIndex: "totalPrice",
                    key: "totalPrice",
                    sorter: (a, b) => a.totalPrice - b.totalPrice,
                    render: (_, order: OrderResponse) => (
                        <span className="font-label-sm text-secondary">{formatProductPrice(order.totalPrice)}</span>
                    )
                },
                {
                    title: "Thao tác",
                    dataIndex: "operations",
                    key: "operations",
                    render: (_, order: OrderResponse) => (
                        <Link
                            to={`${ACCOUNT_USER_ORDERS}/${order.id}`}
                            className="inline-flex items-center gap-1 font-label-sm text-secondary hover:text-primary hover:no-underline"
                        >
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                            Xem chi tiết
                        </Link>
                    )
                }
            ]}
        />
    );
};

export default OrdersTable;
