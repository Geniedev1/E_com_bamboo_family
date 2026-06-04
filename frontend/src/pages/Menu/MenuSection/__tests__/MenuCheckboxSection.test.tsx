import React from "react";
import { Checkbox } from "antd";

import { mountWithStore } from "../../../../utils/test/testHelper";
import MenuCheckboxSection from "../MenuCheckboxSection";
import { CheckboxCategoryFilter } from "../../Menu";
import { vendor } from "../../MenuData";

describe("MenuCheckboxSection", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <MenuCheckboxSection
                title={"Brand"}
                onChange={jest.fn()}
                category={CheckboxCategoryFilter.VENDORS}
                data={vendor}
                selectedValues={[]}
            />
        );
        expect(wrapper.text().includes("Brand")).toBe(true);
        expect(wrapper.find(Checkbox).length).toEqual(18);
    });
});
