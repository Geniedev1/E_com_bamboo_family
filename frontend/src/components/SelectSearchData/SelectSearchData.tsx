import React, { FC, ReactElement } from "react";
import { Select } from "antd";
import {SearchProduct} from "../../types/types";

const searchByData = [
    { label: "Thương hiệu", value: SearchProduct.BRAND },
    { label: "Tên sản phẩm", value: SearchProduct.PRODUCT_TITLE },
    { label: "Xuất xứ", value: SearchProduct.COUNTRY }
];

type PropsType = {
    handleChangeSelect: (value: SearchProduct) => void;
};

const SelectSearchData: FC<PropsType> = ({ handleChangeSelect }): ReactElement => {
    return (
        <Select defaultValue={SearchProduct.BRAND} onChange={handleChangeSelect} className="w-full">
            {searchByData.map((value, index) => (
                <Select.Option key={index} value={value.value}>
                    {value.label}
                </Select.Option>
            ))}
        </Select>
    );
};

export default SelectSearchData;
