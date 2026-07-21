import React from "react";

import { mountWithStore } from "../../../utils/test/testHelper";
import { mockProductsResponse } from "../../../utils/test/__mocks__/products-mock";
import { formatProductPrice } from "../../../utils/priceUtils";
import ProductCard from "../ProductCard";

describe("ProductCard", () => {
    const mockProduct = mockProductsResponse[0];

    it("should render edit and delete buttons", () => {
        const wrapper = mountWithStore(<ProductCard product={mockProduct} edit={true} onOpenDelete={jest.fn()} />);
        expect(wrapper.text().includes("Sửa")).toBe(true);
        expect(wrapper.text().includes("Xóa")).toBe(true);
        expect(wrapper.text().includes(formatProductPrice(mockProduct.price))).toBe(true);
    });

    it("should render add to cart button", () => {
        const wrapper = mountWithStore(<ProductCard product={mockProduct} edit={false} onOpenDelete={jest.fn()} />);
        expect(wrapper.text().includes("Thêm vào giỏ")).toBe(true);
        expect(wrapper.text().includes(formatProductPrice(mockProduct.price))).toBe(true);
    });

    it("should click onClickAddToCart", () => {
        const wrapper = mountWithStore(<ProductCard product={mockProduct} edit={false} onOpenDelete={jest.fn()} />);
        wrapper.find("button").at(0).simulate("click");
    });

    it("should click onOpenDelete", () => {
        const mockOnOpenDelete = jest.fn();
        const wrapper = mountWithStore(<ProductCard product={mockProduct} edit={true} onOpenDelete={mockOnOpenDelete} />);
        wrapper.find("button").at(0).simulate("click");
        expect(mockOnOpenDelete).toHaveBeenCalled();
    });
});
