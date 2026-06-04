import React from "react";

import { mountWithStore } from "../../../utils/test/testHelper";
import Footer from "../Footer";

describe("Footer", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<Footer />);
        expect(wrapper.text().includes("Mua Online")).toBe(true);
        expect(wrapper.text().includes("Thông tin chung")).toBe(true);
        expect(wrapper.text().includes("Theo dõi chúng tôi")).toBe(true);
        expect(wrapper.find("a[aria-label='Instagram']").exists()).toBe(true);
    });
});
