import React from "react";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../utils/test/testHelper";
import { LoadingStatus } from "../../../types/types";
import { mockOrder } from "../../../utils/test/__mocks__/orders-mock";
import OrderFinalize from "../OrderFinalize";

describe("OrderFinalize", () => {
    const mockRootStore = createMockRootState(LoadingStatus.SUCCESS);
    const mockStore = {
        ...mockRootStore,
        order: { ...mockRootStore.order, order: mockOrder }
    };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<OrderFinalize />, mockStore);
        expect(mockDispatchFn).nthCalledWith(1, { type: "cart/resetCartState" });
        expect(wrapper.text().includes("Cảm ơn bạn đã đặt hàng!")).toBe(true);
        expect(wrapper.text().includes("Mã đơn hàng của bạn là: 1")).toBe(true);
    });
});
