import React, { FC, ReactElement } from "react";
import { Form, FormInstance, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import IconButton from "../IconButton/IconButton";

type PropsType = {
    onSearch: (data: { searchValue: string }) => void;
    form?: FormInstance<{ searchValue: string }>;
};

const InputSearch: FC<PropsType> = ({ onSearch, form }): ReactElement => {
    return (
        <Form onFinish={onSearch} form={form} className="w-full">
            <div className="flex w-full">
                <Form.Item name={"searchValue"} className="mb-0 min-w-0 flex-1">
                    <Input className="h-10 w-full" placeholder={"Tìm sản phẩm..."} />
                </Form.Item>
                <IconButton title={"Tìm kiếm"} icon={<SearchOutlined />} />
            </div>
        </Form>
    );
};

export default InputSearch;
