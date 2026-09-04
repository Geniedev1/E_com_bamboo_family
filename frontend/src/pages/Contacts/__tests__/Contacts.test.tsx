import React from "react";

import { mountWithStore } from "../../../utils/test/testHelper";
import Contacts from "../Contacts";

window.scrollTo = jest.fn();

describe("Contacts", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<Contacts />);
        expect(wrapper.text().includes("Giờ làm việc")).toBe(true);
        expect(wrapper.text().includes("Cửa hàng mở cửa từ 08:00 đến 20:00, tất cả các ngày trong tuần.")).toBe(true);
        expect(wrapper.text().includes("Đơn hàng online được tiếp nhận 24/7.")).toBe(true);
        expect(wrapper.text().includes("Giao hàng")).toBe(true);
        expect(wrapper.text().includes("Đơn hàng được giao qua dịch vụ vận chuyển.")).toBe(true);
    });
});
