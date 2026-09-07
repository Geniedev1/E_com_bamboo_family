import React, { FC, ReactElement } from "react";
import { Card, Col, Typography } from "antd";
import { useTranslation } from "react-i18next";

import { ProductResponse } from "../../../types/types";
import { getImageUrl } from "../../../utils/imageUrl";
import { formatProductPrice } from "../../../utils/priceUtils";
import { localize } from "../../../utils/localizedField";
import "./OrderItem.css";

type PropsType = {
    product: ProductResponse;
    quantity?: number;
};

const OrderItem: FC<PropsType> = ({ product, quantity }): ReactElement => {
    const { t } = useTranslation();
    const productTitle = localize(product.productTitle, product.productTitleEn);

    return (
        <Col span={12}>
            <Card
                className={"menu-card"}
                cover={<img className={"menu-card-image"} alt={productTitle} src={getImageUrl(product.filename)} />}
            >
                <div className={"menu-content"}>
                    <Typography.Text strong>{product.vendor}</Typography.Text>
                    <Typography.Text strong>{productTitle}</Typography.Text>
                    <Typography.Text strong>{t("order.itemPrice")} {formatProductPrice(product.price)}</Typography.Text>
                    <Typography.Text strong>{t("order.itemQuantity")} {quantity}</Typography.Text>
                </div>
            </Card>
        </Col>
    );
};

export default OrderItem;
