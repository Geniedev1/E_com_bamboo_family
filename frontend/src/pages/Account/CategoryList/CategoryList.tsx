import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppstoreOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Modal, notification, Popconfirm, Table } from "antd";

import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import { Category, CategoryRequest } from "../../../types/types";
import {
    selectCategories,
    selectCategoriesLoading,
    selectCategoryError
} from "../../../redux-toolkit/category/category-selector";
import {
    createCategory,
    deleteCategory,
    fetchCategories,
    updateCategory
} from "../../../redux-toolkit/category/category-thunks";
import { resetCategoryError } from "../../../redux-toolkit/category/category-slice";

const CategoryList: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const loading = useSelector(selectCategoriesLoading);
    const error = useSelector(selectCategoryError);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editing, setEditing] = useState<Category | null>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            notification.error({ message: "Lỗi", description: error });
            dispatch(resetCategoryError());
        }
    }, [error, dispatch]);

    const openAdd = (): void => {
        setEditing(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const openEdit = (category: Category): void => {
        setEditing(category);
        form.setFieldsValue(category);
        setIsModalOpen(true);
    };

    const onFinish = async (values: CategoryRequest): Promise<void> => {
        const action = editing
            ? updateCategory({ id: editing.id, data: values })
            : createCategory(values);
        const result: any = await dispatch(action as any);
        if (result?.meta?.requestStatus === "fulfilled") {
            notification.success({ message: editing ? "Đã cập nhật danh mục" : "Đã thêm danh mục" });
            setIsModalOpen(false);
        }
    };

    const onDelete = (id: number): void => {
        dispatch(deleteCategory(id));
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <ContentTitle title={"Danh mục"} titleLevel={4} icon={<AppstoreOutlined />} />
                <button
                    type="button"
                    onClick={openAdd}
                    className="mb-6 inline-flex h-10 items-center gap-1 rounded-lg bg-primary px-4 font-label-sm text-[14px] text-on-primary transition hover:bg-primary-container"
                >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    Thêm danh mục
                </button>
            </div>

            <Table
                rowKey={"id"}
                loading={loading}
                pagination={false}
                dataSource={categories}
                columns={[
                    {
                        title: "Thứ tự",
                        dataIndex: "sortOrder",
                        key: "sortOrder",
                        width: 90,
                        render: (_, category: Category) => category.sortOrder ?? "—"
                    },
                    {
                        title: "Tên danh mục",
                        dataIndex: "name",
                        key: "name",
                        render: (_, category: Category) => (
                            <span className="font-label-sm text-primary">{category.name}</span>
                        )
                    },
                    {
                        title: "Mô tả",
                        dataIndex: "description",
                        key: "description",
                        render: (_, category: Category) => (
                            <span className="text-on-surface-variant">{category.description || "—"}</span>
                        )
                    },
                    {
                        title: "Thao tác",
                        dataIndex: "actions",
                        key: "actions",
                        width: 160,
                        render: (_, category: Category) => (
                            <span className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => openEdit(category)}
                                    className="inline-flex items-center gap-1 font-label-sm text-[13px] text-secondary hover:text-primary"
                                >
                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                    Sửa
                                </button>
                                <Popconfirm
                                    title="Xóa danh mục này?"
                                    okText="Xóa"
                                    cancelText="Hủy"
                                    onConfirm={() => onDelete(category.id)}
                                >
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-1 font-label-sm text-[13px] text-[#b0442a] hover:text-error"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                        Xóa
                                    </button>
                                </Popconfirm>
                            </span>
                        )
                    }
                ]}
            />

            <Modal
                title={editing ? "Sửa danh mục" : "Thêm danh mục"}
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => form.submit()}
                okText={editing ? "Lưu" : "Thêm"}
                cancelText="Hủy"
                destroyOnClose
            >
                <Form form={form} layout="vertical" onFinish={onFinish} preserve={false}>
                    <Form.Item
                        name="name"
                        label="Tên danh mục"
                        rules={[{ required: true, message: "Nhập tên danh mục" }]}
                    >
                        <Input placeholder="VD: Wall Art" />
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả">
                        <Input.TextArea rows={2} placeholder="Mô tả ngắn (tùy chọn)" />
                    </Form.Item>
                    <Form.Item name="sortOrder" label="Thứ tự hiển thị">
                        <InputNumber min={0} style={{ width: "100%" }} placeholder="0" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CategoryList;
