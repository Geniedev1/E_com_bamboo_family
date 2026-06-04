import React from "react";
import { Form } from "antd";

import { mountWithStore } from "../../../../utils/test/testHelper";
import AddFormSelect from "../AddFormSelect";

describe("AddFormSelect", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <AddFormSelect
                title={"Product type"}
                name={"type"}
                error={"Fill in the input field"}
                placeholder={"Handmade"}
                disabled={false}
                values={["Handmade", "Home decor"]}
            />
        );
        expect(wrapper.text().includes("Product type")).toBe(true);
        expect(wrapper.find(Form.Item).prop("name")).toBe("type");
        expect(wrapper.find(Form.Item).prop("help")).toBe("Fill in the input field");
    });
});
