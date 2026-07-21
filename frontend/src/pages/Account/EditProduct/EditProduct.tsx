import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, notification, Row, Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload/interface";

import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import FormInput from "../../../components/FormInput/FormInput";
import { selectProduct } from "../../../redux-toolkit/product/product-selector";
import {
    selectAdminStateErrors,
    selectIsAdminStateLoading,
    selectIsProductEdited
} from "../../../redux-toolkit/admin/admin-selector";
import { LoadingStatus } from "../../../types/types";
import { resetAdminState, setAdminLoadingState } from "../../../redux-toolkit/admin/admin-slice";
import { fetchProduct } from "../../../redux-toolkit/product/product-thunks";
import IconButton from "../../../components/IconButton/IconButton";
import EditProductSelect from "./EditProductSelect";
import { updateProduct } from "../../../redux-toolkit/admin/admin-thunks";
import "./EditProduct.css";

type EditProductData = {
    productTitle: string;
    vendor: string;
    year: string;
    country: string;
    type: string;
    volume: string;
    gender: string;
    topDescription: string;
    middleDescription: string;
    baseDescription: string;
    price: string;
};

const EditProduct: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const params = useParams<{ id: string }>();
    const productData = useSelector(selectProduct);
    const isLoading = useSelector(selectIsAdminStateLoading);
    const errors = useSelector(selectAdminStateErrors);
    const isProductEdited = useSelector(selectIsProductEdited);
    const [file, setFile] = React.useState<string>("");

    useEffect(() => {
        dispatch(setAdminLoadingState(LoadingStatus.LOADED));
        dispatch(fetchProduct(params.id));

        return () => {
            dispatch(resetAdminState(LoadingStatus.LOADING));
        };
    }, []);
    
    useEffect(() => {
        if (productData) {
            form.setFieldsValue(productData);
        }
    }, [productData])

    useEffect(() => {
        if (isProductEdited) {
            window.scrollTo(0, 0);
            notification.success({
                message: "Đã cập nhật sản phẩm",
                description: "Cập nhật sản phẩm thành công!"
            });
            dispatch(resetAdminState(LoadingStatus.SUCCESS));
        }
    }, [isProductEdited]);

    const onFormSubmit = (data: EditProductData): void => {
        const bodyFormData: FormData = new FormData();
        // @ts-ignore
        bodyFormData.append("file", { file });
        bodyFormData.append(
            "product",
            new Blob([JSON.stringify({ ...data, id: productData?.id })], { type: "application/json" })
        );

        dispatch(updateProduct(bodyFormData));
    };

    const handleUpload = ({ file }: UploadChangeParam<any>): void => {
        setFile(file);
    };

    return (
        <div>
            <ContentTitle title={"Sửa sản phẩm"} titleLevel={4} icon={<EditOutlined />} />
            <Form onFinish={onFormSubmit} form={form}>
                <Row gutter={32}>
                    <Col xs={24} md={12}>
                        <FormInput
                            title={"Tên sản phẩm"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"productTitle"}
                            error={errors.productTitleError}
                            disabled={isLoading}
                            placeholder={"Tên sản phẩm"}
                        />
                        <FormInput
                            title={"Thương hiệu"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"vendor"}
                            error={errors.vendorError}
                            disabled={isLoading}
                            placeholder={"Thương hiệu"}
                        />
                        <FormInput
                            title={"Năm sản xuất"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"year"}
                            error={errors.yearError}
                            disabled={isLoading}
                            placeholder={"Năm sản xuất"}
                        />
                        <FormInput
                            title={"Xuất xứ"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"country"}
                            error={errors.countryError}
                            disabled={isLoading}
                            placeholder={"Xuất xứ"}
                        />
                        <EditProductSelect
                            title={"Loại sản phẩm"}
                            name={"type"}
                            placeholder={"Loại sản phẩm"}
                            error={errors.typeError}
                            disabled={isLoading}
                            values={["Handmade", "Home decor", "Kitchenware", "Accessory"]}
                        />
                        <EditProductSelect
                            title={"Đối tượng"}
                            name={"gender"}
                            placeholder={"Đối tượng"}
                            disabled={isLoading}
                            values={["all", "male", "female", "unisex"]}
                        />
                        <FormInput
                            title={"Kích thước"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"volume"}
                            error={errors.volumeError}
                            disabled={isLoading}
                            placeholder={"Kích thước"}
                        />
                        <FormInput
                            title={"Mô tả ngắn"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"topDescription"}
                            error={errors.topDescriptionError}
                            disabled={isLoading}
                            placeholder={"Mô tả ngắn"}
                        />
                        <FormInput
                            title={"Chi tiết nổi bật"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"middleDescription"}
                            error={errors.middleDescriptionError}
                            disabled={isLoading}
                            placeholder={"Chi tiết nổi bật"}
                        />
                        <FormInput
                            title={"Chất liệu / bảo quản"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"baseDescription"}
                            error={errors.baseDescriptionError}
                            disabled={isLoading}
                            placeholder={"Chất liệu / bảo quản"}
                        />
                        <FormInput
                            title={"Giá"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"price"}
                            error={errors.priceError}
                            disabled={isLoading}
                            placeholder={"Giá (đơn vị nghìn đồng)"}
                        />
                    </Col>
                    <Col xs={24} md={12}>
                        <Upload name={"file"} onChange={handleUpload} beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />}>Chọn ảnh sản phẩm</Button>
                        </Upload>
                        <div className={"edit-product-image-wrapper"}>
                            <img
                                className={"edit-product-image"}
                                src={productData.filename}
                                alt={productData.productTitle}
                            />
                        </div>
                    </Col>
                </Row>
                <IconButton title={"Lưu thay đổi"} icon={<EditOutlined />} disabled={isLoading} />
            </Form>
        </div>
    );
};

export default EditProduct;
