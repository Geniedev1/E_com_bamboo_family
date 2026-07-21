import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Col, Row, Table } from "antd";

import { selectAdminStateUser, selectIsAdminStateLoading } from "../../../redux-toolkit/admin/admin-selector";
import { selectOrders, selectTotalElements } from "../../../redux-toolkit/orders/orders-selector";
import { fetchUserInfo } from "../../../redux-toolkit/admin/admin-thunks";
import { resetOrders } from "../../../redux-toolkit/orders/orders-slice";
import { resetAdminState } from "../../../redux-toolkit/admin/admin-slice";
import { LoadingStatus, OrderResponse, UserOrdersRequest } from "../../../types/types";
import { fetchUserOrdersByEmail } from "../../../redux-toolkit/orders/orders-thunks";
import Spinner from "../../../components/Spinner/Spinner";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import AccountDataItem from "../../../components/AccountDataItem/AccountDataItem";
import { ACCOUNT_USER_ORDERS } from "../../../constants/routeConstants";
import { useTablePagination } from "../../../hooks/useTablePagination";
import { formatProductPrice } from "../../../utils/priceUtils";

const ManageUser: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const params = useParams<{ id: string }>();
    const userData = useSelector(selectAdminStateUser);
    const userOrders = useSelector(selectOrders);
    const totalElements = useSelector(selectTotalElements);
    const isUserLoading = useSelector(selectIsAdminStateLoading);
    const handleTableChange = useTablePagination<OrderResponse, UserOrdersRequest>(fetchUserOrdersByEmail, userData.email!);
    const { id, email, firstName, lastName, city, address, phoneNumber, postIndex, provider, roles } = userData;

    useEffect(() => {
        dispatch(fetchUserInfo(params.id));

        return () => {
            dispatch(resetOrders());
            dispatch(resetAdminState(LoadingStatus.LOADING));
        };
    }, []);

    useEffect(() => {
        if (userData.email) {
            dispatch(fetchUserOrdersByEmail({ email: userData.email!, page: 0 }));
        }
    }, [userData]);

    return (
        <>
            {isUserLoading ? (
                <Spinner />
            ) : (
                <>
                    <ContentTitle title={`Người dùng: ${firstName} ${lastName}`} titleLevel={4} icon={<UserOutlined />} />
                    <Row>
                        <Col span={24}>
                            <div className="rounded-2xl border border-outline-variant/50 bg-surface p-5">
                                <Row gutter={24}>
                                    <Col xs={24} md={12}>
                                        <AccountDataItem title={"Mã người dùng"} text={`#${id}`} />
                                        <AccountDataItem title={"Email"} text={email} />
                                        <AccountDataItem title={"Vai trò"} text={roles?.[0] === "ADMIN" ? "Quản trị viên" : "Khách hàng"} />
                                        <AccountDataItem title={"Họ"} text={firstName} />
                                        <AccountDataItem title={"Tên"} text={lastName} />
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <AccountDataItem title={"Đăng nhập qua"} text={provider} />
                                        <AccountDataItem title={"Thành phố"} text={city} />
                                        <AccountDataItem title={"Địa chỉ"} text={address} />
                                        <AccountDataItem title={"Số điện thoại"} text={phoneNumber} />
                                        <AccountDataItem title={"Mã bưu chính"} text={postIndex} />
                                    </Col>
                                </Row>
                            </div>
                            <Row style={{ marginTop: 24 }}>
                                <Col span={24}>
                                    {userOrders.length === 0 ? (
                                        <ContentTitle title={"Chưa có đơn hàng"} titleLevel={4} />
                                    ) : (
                                        <>
                                            <ContentTitle title={"Đơn hàng của người dùng"} titleLevel={4} />
                                            <Table
                                                rowKey={"id"}
                                                onChange={handleTableChange}
                                                pagination={{
                                                    total: totalElements,
                                                    position: ["bottomRight", "topRight"]
                                                }}
                                                dataSource={userOrders}
                                                columns={[
                                                    {
                                                        title: "Mã đơn",
                                                        dataIndex: "id",
                                                        key: "id",
                                                        render: (_, order: OrderResponse) => `#${order.id}`
                                                    },
                                                    {
                                                        title: "Ngày đặt",
                                                        dataIndex: "date",
                                                        key: "date"
                                                    },
                                                    {
                                                        title: "Thành phố",
                                                        dataIndex: "city",
                                                        key: "city"
                                                    },
                                                    {
                                                        title: "Địa chỉ",
                                                        dataIndex: "address",
                                                        key: "address"
                                                    },
                                                    {
                                                        title: "Mã bưu chính",
                                                        dataIndex: "postIndex",
                                                        key: "postIndex"
                                                    },
                                                    {
                                                        title: "Tổng tiền",
                                                        dataIndex: "totalPrice",
                                                        key: "totalPrice",
                                                        render: (_, order: OrderResponse) => (
                                                            <span className="font-label-sm text-secondary">
                                                                {formatProductPrice(order.totalPrice)}
                                                            </span>
                                                        )
                                                    },
                                                    {
                                                        title: "Thao tác",
                                                        dataIndex: "actions",
                                                        key: "actions",
                                                        render: (_, order: OrderResponse) => (
                                                            <Link
                                                                to={`${ACCOUNT_USER_ORDERS}/${order.id}`}
                                                                className="inline-flex items-center gap-1 font-label-sm text-secondary hover:text-primary hover:no-underline"
                                                            >
                                                                <span className="material-symbols-outlined text-[18px]">
                                                                    visibility
                                                                </span>
                                                                Xem chi tiết
                                                            </Link>
                                                        )
                                                    }
                                                ]}
                                            />
                                        </>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ManageUser;
