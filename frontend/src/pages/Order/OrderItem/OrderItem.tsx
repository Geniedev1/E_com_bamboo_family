import React, { FC, ReactElement } from "react";
import { Card, Col, Typography } from "antd";

import { ProductResponse } from "../../../types/types";
import { getImageUrl } from "../../../utils/imageUrl";
import { formatProductPrice } from "../../../utils/priceUtils";
import "./OrderItem.css";

type PropsType = {
    product: ProductResponse;
    quantity?: number;
};

const OrderItem: FC<PropsType> = ({ product, quantity }): ReactElement => {
    return (
        <Col span={12}>
            <Card
                className={"menu-card"}
                cover={<img className={"menu-card-image"} alt={product.productTitle} src={getImageUrl(product.filename)} />}
            >
                <div className={"menu-content"}>
                    <Typography.Text strong>{product.vendor}</Typography.Text>
                    <Typography.Text strong>{product.productTitle}</Typography.Text>
                    <Typography.Text strong>Giá: {formatProductPrice(product.price)}</Typography.Text>
                    <Typography.Text strong>Số lượng: {quantity}</Typography.Text>
                </div>
            </Card>
        </Col>
    );
};

export default OrderItem;
