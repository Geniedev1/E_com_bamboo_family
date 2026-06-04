import React, { FC, ReactElement } from "react";
import { Button, Col, Divider, Rate, Row, Space, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import Description from "./Description/Description";
import { FullProductResponse } from "../../../types/types";

type PropsType = {
    product?: Partial<FullProductResponse>;
    reviewsLength: number;
    addToCart: () => void;
};

const ProductInfo: FC<PropsType> = ({ product, reviewsLength, addToCart }): ReactElement => {
    return (
        <Row>
            <Col span={12} className={"product-image-wrapper"}>
                <img src={product?.filename} alt={product?.productTitle} className={"product-image"} />
            </Col>
            <Col span={12}>
                <Row className={"product-header"}>
                    <Col>
                        <Typography.Title level={3}>{product?.productTitle}</Typography.Title>
                        <Typography.Title level={4}>{product?.vendor}</Typography.Title>
                        <Typography.Text>{product?.type}</Typography.Text>
                    </Col>
                </Row>
                <Row>
                    <Col className={"product-rate"} span={8}>
                        <Rate allowHalf disabled value={product?.productRating} />
                        <Typography.Text>{reviewsLength} reviews</Typography.Text>
                    </Col>
                </Row>
                <Row>
                    <Typography.Text type="success">In Stock</Typography.Text>
                </Row>
                <Row style={{ marginTop: 16 }}>
                    <Col span={5}>
                        <Space align={"baseline"}>
                            <Typography.Text>${product?.price}.00</Typography.Text>
                        </Space>
                    </Col>
                    <Col span={4}>
                        <Button icon={<ShoppingCartOutlined />} onClick={addToCart}>
                            Add to cart
                        </Button>
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={8}>
                        <Description title={"Audience:"} />
                        <Description title={"Size:"} />
                        <Description title={"Year:"} />
                        <Description title={"Origin:"} />
                        <Description title={"Short description:"} />
                        <Description title={"Key details:"} />
                        <Description title={"Materials / care:"} />
                    </Col>
                    <Col span={16}>
                        <Description title={product?.gender} />
                        <Description title={product?.volume} />
                        <Description title={product?.year} />
                        <Description title={product?.country} />
                        <Description title={product?.topDescription} />
                        <Description title={product?.middleDescription} />
                        <Description title={product?.baseDescription} />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default ProductInfo;
