import React from "react";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../utils/test/testHelper";
import { LoadingStatus } from "../../../types/types";
import { mockProductsResponse } from "../../../utils/test/__mocks__/products-mock";
import ProductCard from "../../../components/ProductCard/ProductCard";
import Home from "../Home";

window.scrollTo = jest.fn();

describe("Home", () => {
    beforeEach(() => {
        mockDispatch();
    });

    it("should render featured product cards", () => {
        const base = createMockRootState(LoadingStatus.LOADED);
        const mockState = { ...base, products: { ...base.products, products: mockProductsResponse } };
        const wrapper = mountWithStore(<Home />, mockState);
        expect(wrapper.find(ProductCard).length).toEqual(mockProductsResponse.length);
    });
});
