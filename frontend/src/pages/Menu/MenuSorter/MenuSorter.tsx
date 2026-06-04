import React, { FC, ReactElement } from "react";
import { Radio, RadioChangeEvent } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

import "./MenuSorter.css";

type PropsType = {
    onChange: (event: RadioChangeEvent) => void;
    sortByPrice?: boolean;
};

const MenuSorter: FC<PropsType> = ({ onChange, sortByPrice }): ReactElement => {
    return (
        <Radio.Group value={sortByPrice} onChange={onChange} className="whitespace-nowrap lg:justify-self-end">
            <Radio.Button disabled className={"price-button"}>
                Sắp xếp giá
            </Radio.Button>
            <Radio.Button value={false}>
                <ArrowDownOutlined />
            </Radio.Button>
            <Radio.Button value={true}>
                <ArrowUpOutlined />
            </Radio.Button>
        </Radio.Group>
    );
};

export default MenuSorter;
