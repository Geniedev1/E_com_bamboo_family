import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, notification, Row, Upload } from "antd";
import { PlusSquareFilled, PlusSquareOutlined, UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/lib/upload/interface";

import {
    selectAdminStateErrors,
    selectIsAdminStateLoading,
    selectIsProductAdded
} from "../../../redux-toolkit/admin/admin-selector";
import { resetAdminState, setAdminLoadingState } from "../../../redux-toolkit/admin/admin-slice";
import { LoadingStatus } from "../../../types/types";
import { addProduct } from "../../../redux-toolkit/admin/admin-thunks";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import AddFormInput from "./AddFormInput";
import AddFormSelect from "./AddFormSelect";
import IconButton from "../../../components/IconButton/IconButton";
import { PRODUCT_CATEGORIES } from "../../../constants/categories";

type AddProductData = {
    productTitle: string;
    vendor: string;
    year: string;
    country: string;
    type: string;
    volume: string;
    gender: string;
    category: string;
    topDescription: string;
    middleDescription: string;
    baseDescription: string;
    price: string;
};

const AddProduct: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const isProductAdded = useSelector(selectIsProductAdded);
    const ispProductLoading = useSelector(selectIsAdminStateLoading);
    const productErrors = useSelector(selectAdminStateErrors);
    const [fileList, setFileList] = React.useState<any[]>([]);

    useEffect(() => {
        dispatch(setAdminLoadingState(LoadingStatus.LOADED));

        return () => {
            dispatch(resetAdminState(LoadingStatus.LOADING));
        };
    }, []);

    useEffect(() => {
        if (isProductAdded) {
            window.scrollTo(0, 0);
            notification.success({
                message: "Đã thêm sản phẩm",
                description: "Thêm sản phẩm thành công!"
            });
            dispatch(resetAdminState(LoadingStatus.SUCCESS));
        }
    }, [isProductAdded]);

    const onFormSubmit = (data: AddProductData): void => {
        const bodyFormData: FormData = new FormData();
        fileList.forEach((item) => {
            const raw = item.originFileObj || item;
            if (raw) {
                bodyFormData.append("files", raw);
            }
        });
        bodyFormData.append(
            "product",
            new Blob([JSON.stringify({ ...data, productRating: 0 })], { type: "application/json" })
        );

        dispatch(addProduct(bodyFormData));
    };

    const handleUpload = ({ fileList: newFileList }: UploadChangeParam<any>): void => {
        setFileList(newFileList.slice(0, 5));
    };

    return (
        <>
            <ContentTitle title={"Thêm sản phẩm"} titleLevel={4} icon={<PlusSquareOutlined />} />
            <Form onFinish={onFormSubmit}>
                <Row gutter={32}>
                    <Col xs={24} md={12}>
                        <AddFormInput
                            title={"Tên sản phẩm"}
                            name={"productTitle"}
                            error={productErrors.productTitleError}
                            placeholder={"Nhập tên sản phẩm"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"Năm sản xuất"}
                            name={"year"}
                            error={productErrors.yearError}
                            placeholder={"Nhập năm sản xuất"}
                            disabled={ispProductLoading}
                        />
                        <AddFormSelect
                            title={"Loại sản phẩm"}
                            name={"type"}
                            error={productErrors.typeError}
                            placeholder={"Handmade"}
                            disabled={ispProductLoading}
                            values={["Handmade", "Home decor", "Kitchenware", "Accessory"]}
                        />
                        <AddFormSelect
                            title={"Đối tượng"}
                            name={"gender"}
                            error={productErrors.genderError}
                            placeholder={"all"}
                            disabled={ispProductLoading}
                            values={["all", "male", "female", "unisex"]}
                        />
                        <AddFormSelect
                            title={"Danh mục"}
                            name={"category"}
                            placeholder={"Chọn danh mục"}
                            disabled={ispProductLoading}
                            values={PRODUCT_CATEGORIES}
                        />
                        <AddFormInput
                            title={"Chi tiết nổi bật"}
                            name={"middleDescription"}
                            error={productErrors.middleDescriptionError}
                            placeholder={"Nhập chi tiết nổi bật"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"Giá"}
                            name={"price"}
                            error={productErrors.priceError}
                            placeholder={"Nhập giá (đơn vị nghìn đồng)"}
                            disabled={ispProductLoading}
                        />
                    </Col>
                    <Col xs={24} md={12}>
                        <AddFormInput
                            title={"Thương hiệu"}
                            name={"vendor"}
                            error={productErrors.vendorError}
                            placeholder={"Nhập thương hiệu"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"Xuất xứ"}
                            name={"country"}
                            error={productErrors.countryError}
                            placeholder={"Nhập xuất xứ"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"Kích thước"}
                            name={"volume"}
                            error={productErrors.volumeError}
                            placeholder={"Nhập kích thước"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"Mô tả ngắn"}
                            name={"topDescription"}
                            error={productErrors.topDescriptionError}
                            placeholder={"Nhập mô tả ngắn"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"Chất liệu / bảo quản"}
                            name={"baseDescription"}
                            error={productErrors.baseDescriptionError}
                            placeholder={"Nhập chất liệu hoặc cách bảo quản"}
                            disabled={ispProductLoading}
                        />
                        <Upload
                            name={"files"}
                            multiple
                            maxCount={5}
                            listType={"picture"}
                            accept={"image/*"}
                            fileList={fileList}
                            onChange={handleUpload}
                            beforeUpload={() => false}
                        >
                            <Button icon={<UploadOutlined />} style={{ marginTop: 22 }} disabled={fileList.length >= 5}>
                                Chọn ảnh (tối đa 5)
                            </Button>
                        </Upload>
                    </Col>
                </Row>
                <IconButton title={"Thêm sản phẩm"} icon={<PlusSquareFilled />} />
            </Form>
        </>
    );
};

export default AddProduct;
