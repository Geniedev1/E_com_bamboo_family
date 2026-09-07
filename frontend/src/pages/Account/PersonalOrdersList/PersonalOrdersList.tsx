import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ShoppingOutlined } from "@ant-design/icons";

import { selectIsOrdersLoading, selectOrders } from "../../../redux-toolkit/orders/orders-selector";
import { fetchUserOrders } from "../../../redux-toolkit/orders/orders-thunks";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import Spinner from "../../../components/Spinner/Spinner";
import { resetOrders } from "../../../redux-toolkit/orders/orders-slice";
import OrdersTable from "../../../components/OrdersTable/OrdersTable";

const PersonalOrdersList: FC = (): ReactElement => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const isOrdersLoading = useSelector(selectIsOrdersLoading);

    useEffect(() => {
        dispatch(fetchUserOrders(0));

        return () => {
            dispatch(resetOrders());
        };
    }, []);

    return (
        <>
            {isOrdersLoading ? (
                <Spinner />
            ) : (
                <>
                    {orders.length === 0 ? (
                        <div style={{ textAlign: "center" }}>
                            <ContentTitle title={t("account.noOrders")} titleLevel={4} icon={<ShoppingOutlined />} />
                        </div>
                    ) : (
                        <>
                            <ContentTitle title={t("account.myOrders")} titleLevel={4} icon={<ShoppingOutlined />} />
                            <OrdersTable loading={isOrdersLoading} orders={orders} fetchOrders={fetchUserOrders} />
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default PersonalOrdersList;
