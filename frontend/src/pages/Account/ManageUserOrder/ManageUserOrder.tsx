import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Col, Row, Table } from "antd";
import { InfoCircleOutlined, ShoppingOutlined } from "@ant-design/icons";

import {
    selectIsOrderLoaded,
    selectIsOrderLoading,
    selectOrder,
    selectOrderItems
} from "../../../redux-toolkit/order/order-selector";
import { fetchOrderById, fetchOrderItemsByOrderId } from "../../../redux-toolkit/order/order-thunks";
import { resetOrderState } from "../../../redux-toolkit/order/order-slice";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import Spinner from "../../../components/Spinner/Spinner";
import AccountDataItem from "../../../components/AccountDataItem/AccountDataItem";
import { OrderItemResponse } from "../../../types/types";
import { formatProductPrice } from "../../../utils/priceUtils";
import { localize } from "../../../utils/localizedField";
import "./ManageUserOrder.css";

const ManageUserOrder: FC = (): ReactElement => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const params = useParams<{ id: string }>();
    const order = useSelector(selectOrder);
    const orderItems = useSelector(selectOrderItems);
    const isOrderLoading = useSelector(selectIsOrderLoading);
    const isOrderLoaded = useSelector(selectIsOrderLoaded);
    const { id, email, firstName, lastName, totalPrice, postIndex, phoneNumber, date, city, address } = order;

    useEffect(() => {
        dispatch(fetchOrderById(params.id));

        return () => {
            dispatch(resetOrderState());
        };
    }, []);

    useEffect(() => {
        if (isOrderLoaded) {
            dispatch(fetchOrderItemsByOrderId(params.id));
        }
    }, [isOrderLoaded]);

    return (
        <>
            {isOrderLoading ? (
                <Spinner />
            ) : (
                <>
                    <ContentTitle title={t("account.orderNumberTitle", { id })} titleLevel={4} icon={<ShoppingOutlined />} />
                    <Row gutter={[24, 24]}>
                        <Col xs={24} md={12}>
                            <div className="h-full rounded-2xl border border-outline-variant/50 bg-surface p-5">
                                <ContentTitle title={t("account.customerInfo")} titleLevel={5} icon={<InfoCircleOutlined />} />
                                <AccountDataItem title={t("account.fullName")} text={`${firstName ?? ""} ${lastName ?? ""}`} />
                                <AccountDataItem title={t("order.email")} text={email} />
                                <AccountDataItem title={t("order.phone")} text={phoneNumber} />
                                <AccountDataItem title={t("order.city")} text={city} />
                                <AccountDataItem title={t("order.address")} text={address} />
                                <AccountDataItem title={t("order.postIndex")} text={postIndex} />
                            </div>
                        </Col>
                        <Col xs={24} md={12}>
                            <div className="h-full rounded-2xl border border-outline-variant/50 bg-surface p-5">
                                <ContentTitle title={t("account.orderInfo")} titleLevel={5} icon={<InfoCircleOutlined />} />
                                <AccountDataItem title={t("account.orderId")} text={`#${id}`} />
                                <AccountDataItem title={t("account.orderDate")} text={date} />
                                <div className="mt-4 flex items-center justify-between rounded-xl bg-primary-fixed px-4 py-3">
                                    <span className="font-label-sm text-[15px] text-primary">{t("account.orderTotal")}</span>
                                    <span className="font-headline-md text-[20px] font-bold text-secondary">
                                        {formatProductPrice(totalPrice)}
                                    </span>
                                </div>
                            </div>
                        </Col>
                        <Col span={24}>
                            <Table
                                rowKey={"id"}
                                pagination={false}
                                dataSource={orderItems}
                                columns={[
                                    {
                                        title: t("account.productCode"),
                                        dataIndex: "id",
                                        key: "id",
                                        render: (_, order: OrderItemResponse) => `#${order.product.id}`
                                    },
                                    {
                                        title: t("account.vendor"),
                                        dataIndex: "vendor",
                                        key: "vendor",
                                        render: (_, order: OrderItemResponse) => order.product.vendor
                                    },
                                    {
                                        title: t("account.productName"),
                                        dataIndex: "productTitle",
                                        key: "productTitle",
                                        render: (_, order: OrderItemResponse) =>
                                            localize(order.product.productTitle, order.product.productTitleEn)
                                    },
                                    {
                                        title: t("account.quantity"),
                                        dataIndex: "quantity",
                                        key: "quantity"
                                    },
                                    {
                                        title: t("account.unitPrice"),
                                        dataIndex: "price",
                                        key: "price",
                                        render: (_, order: OrderItemResponse) => formatProductPrice(order.product.price)
                                    },
                                    {
                                        title: t("account.lineTotal"),
                                        dataIndex: "amount",
                                        key: "amount",
                                        render: (_, order: OrderItemResponse) => (
                                            <span className="font-label-sm text-secondary">
                                                {formatProductPrice(order.amount)}
                                            </span>
                                        )
                                    }
                                ]}
                            />
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ManageUserOrder;
