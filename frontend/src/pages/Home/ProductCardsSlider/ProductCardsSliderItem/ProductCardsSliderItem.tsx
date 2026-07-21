import React, { FC, ReactElement } from "react";
import { Col, Row } from "antd";

import ProductCard from "../../../../components/ProductCard/ProductCard";
import { ProductResponse } from "../../../../types/types";

type PropsType = {
    products: Array<ProductResponse>;
};

const ProductCardsSliderItem: FC<PropsType> = ({ products }): ReactElement => {
    return (
        <Row gutter={[16, 16]} style={{ margin: 10, marginTop: 10, marginBottom: 10 }}>
            {products.slice(0, 4).map((product) => (
                <Col key={product.id} span={6}>
                    <ProductCard product={product} />
                </Col>
            ))}
        </Row>
    );
};

export default ProductCardsSliderItem;
