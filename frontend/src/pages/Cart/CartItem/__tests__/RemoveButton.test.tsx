import React from "react";

import { mountWithStore } from "../../../../utils/test/testHelper";
import RemoveButton from "../RemoveButton";

describe("RemoveButton", () => {
    it("should render correctly and click deleteFromCart", () => {
        const mockDeleteFromCart = jest.fn();
        const wrapper = mountWithStore(<RemoveButton productId={1} deleteFromCart={mockDeleteFromCart} />);
        expect(wrapper.text().includes("Xóa")).toBe(true);
        wrapper.find("button").simulate("click");
        expect(mockDeleteFromCart).toHaveBeenCalled();
        expect(mockDeleteFromCart).toHaveBeenCalledWith(1);
    });
});
