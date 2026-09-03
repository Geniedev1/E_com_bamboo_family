import React from "react";

import { mountWithStore } from "../../../../utils/test/testHelper";
import SocialButton from "../SocialButton";

describe("SocialButton", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<SocialButton socialNetwork={"google"} image={"test_image"} />);
        expect(wrapper.find("a").prop("href")).toContain("/oauth2/authorize/google");
        expect(wrapper.text().toLowerCase().includes("google")).toBe(true);
        expect(wrapper.find("img").at(0).prop("src")).toBe("test_image");
    });
});
