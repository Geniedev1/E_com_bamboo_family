import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
import "./ManageUserOrder.css";

const ManageUserOrder: FC = (): ReactElement => {
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
                    <ContentTitle title={`Đơn hàng #${id}`} titleLevel={4} icon={<ShoppingOutlined />} />
                    <Row gutter={[24, 24]}>
                        <Col xs={24} md={12}>
                            <div className="h-full rounded-2xl border border-outline-variant/50 bg-surface p-5">
                                <ContentTitle title={"Thông tin khách hàng"} titleLevel={5} icon={<InfoCircleOutlined />} />
                                <AccountDataItem title={"Họ và tên"} text={`${firstName ?? ""} ${lastName ?? ""}`} />
                                <AccountDataItem title={"Email"} text={email} />
                                <AccountDataItem title={"Số điện thoại"} text={phoneNumber} />
                                <AccountDataItem title={"Thành phố"} text={city} />
                                <AccountDataItem title={"Địa chỉ"} text={address} />
                                <AccountDataItem title={"Mã bưu chính"} text={postIndex} />
                            </div>
                        </Col>
                        <Col xs={24} md={12}>
                            <div className="h-full rounded-2xl border border-outline-variant/50 bg-surface p-5">
                                <ContentTitle title={"Thông tin đơn hàng"} titleLevel={5} icon={<InfoCircleOutlined />} />
                                <AccountDataItem title={"Mã đơn"} text={`#${id}`} />
                                <AccountDataItem title={"Ngày đặt"} text={date} />
                                <div className="mt-4 flex items-center justify-between rounded-xl bg-primary-fixed px-4 py-3">
                                    <span className="font-label-sm text-[15px] text-primary">Tổng đơn hàng</span>
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
                                        title: "Mã SP",
                                        dataIndex: "id",
                                        key: "id",
                                        render: (_, order: OrderItemResponse) => `#${order.product.id}`
                                    },
                                    {
                                        title: "Thương hiệu",
                                        dataIndex: "vendor",
                                        key: "vendor",
                                        render: (_, order: OrderItemResponse) => order.product.vendor
                                    },
                                    {
                                        title: "Tên sản phẩm",
                                        dataIndex: "productTitle",
                                        key: "productTitle",
                                        render: (_, order: OrderItemResponse) => order.product.productTitle
                                    },
                                    {
                                        title: "Số lượng",
                                        dataIndex: "quantity",
                                        key: "quantity"
                                    },
                                    {
                                        title: "Đơn giá",
                                        dataIndex: "price",
                                        key: "price",
                                        render: (_, order: OrderItemResponse) => formatProductPrice(order.product.price)
                                    },
                                    {
                                        title: "Thành tiền",
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
