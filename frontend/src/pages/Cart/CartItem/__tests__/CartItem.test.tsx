import React from "react";

import { mountWithStore } from "../../../../utils/test/testHelper";
import { mockCartProductsResponse } from "../../../../utils/test/__mocks__/products-mock";
import CartItem from "../CartItem";

describe("CartItem", () => {
    const mockProduct = mockCartProductsResponse[0];
    const mockProductCount = 11;

    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <CartItem
                product={mockProduct}
                productInCart={mockProductCount}
                onChangeProductItemCount={jest.fn()}
                deleteFromCart={jest.fn()}
            />
        );
        expect(wrapper.text().includes(mockProduct.productTitle)).toBe(true);
        expect(wrapper.text().includes(String(mockProductCount))).toBe(true);
    });

    it("should handle Products Count", () => {
        const mockOnChangeProductItemCount = jest.fn();
        const wrapper = mountWithStore(
            <CartItem
                product={mockProduct}
                productInCart={mockProductCount}
                onChangeProductItemCount={mockOnChangeProductItemCount}
                deleteFromCart={jest.fn()}
            />
        );
        wrapper.find('button[aria-label="Tăng số lượng"]').simulate("click");
        expect(mockOnChangeProductItemCount).toHaveBeenCalledWith(mockProduct.id, 12);
    });
});
