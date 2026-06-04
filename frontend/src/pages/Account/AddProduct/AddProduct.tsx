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

type AddProductData = {
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

const AddProduct: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const isProductAdded = useSelector(selectIsProductAdded);
    const ispProductLoading = useSelector(selectIsAdminStateLoading);
    const productErrors = useSelector(selectAdminStateErrors);
    const [file, setFile] = React.useState<string>("");

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
                message: "Product added",
                description: "Product successfully added!"
            });
            dispatch(resetAdminState(LoadingStatus.SUCCESS));
        }
    }, [isProductAdded]);

    const onFormSubmit = (data: AddProductData): void => {
        const bodyFormData: FormData = new FormData();
        // @ts-ignore
        bodyFormData.append("file", { file });
        bodyFormData.append(
            "product",
            new Blob([JSON.stringify({ ...data, productRating: 0 })], { type: "application/json" })
        );

        dispatch(addProduct(bodyFormData));
    };

    const handleUpload = ({ file }: UploadChangeParam<any>): void => {
        setFile(file);
    };

    return (
        <>
            <ContentTitle title={"Add product"} titleLevel={4} icon={<PlusSquareOutlined />} />
            <Form onFinish={onFormSubmit}>
                <Row gutter={32}>
                    <Col span={12}>
                        <AddFormInput
                            title={"Product title"}
                            name={"productTitle"}
                            error={productErrors.productTitleError}
                            placeholder={"Enter the product title"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"Release year"}
                            name={"year"}
                            error={productErrors.yearError}
                            placeholder={"Enter the release year"}
                            disabled={ispProductLoading}
                        />
                        <AddFormSelect
                            title={"Product type"}
                            name={"type"}
                            error={productErrors.typeError}
                            placeholder={"Handmade"}
                            disabled={ispProductLoading}
                            values={["Handmade", "Home decor", "Kitchenware", "Accessory"]}
                        />
                        <AddFormSelect
                            title={"Audience"}
                            name={"gender"}
                            error={productErrors.genderError}
                            placeholder={"all"}
                            disabled={ispProductLoading}
                            values={["all", "male", "female", "unisex"]}
                        />
                        <AddFormInput
                            title={"Key details"}
                            name={"middleDescription"}
                            error={productErrors.middleDescriptionError}
                            placeholder={"Enter key product details"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"Price"}
                            name={"price"}
                            error={productErrors.priceError}
                            placeholder={"Enter the price"}
                            disabled={ispProductLoading}
                        />
                    </Col>
                    <Col span={12}>
                        <AddFormInput
                            title={"Brand"}
                            name={"vendor"}
                            error={productErrors.vendorError}
                            placeholder={"Enter the brand"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"Manufacturer country"}
                            name={"country"}
                            error={productErrors.countryError}
                            placeholder={"Enter the manufacturer country"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"Volume"}
                            name={"volume"}
                            error={productErrors.volumeError}
                            placeholder={"Enter the volume"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"Short description"}
                            name={"topDescription"}
                            error={productErrors.topDescriptionError}
                            placeholder={"Enter a short description"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"Materials / care"}
                            name={"baseDescription"}
                            error={productErrors.baseDescriptionError}
                            placeholder={"Enter materials or care notes"}
                            disabled={ispProductLoading}
                        />
                        <Upload name={"file"} onChange={handleUpload} beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />} style={{ marginTop: 22 }}>
                                Click to Upload
                            </Button>
                        </Upload>
                    </Col>
                </Row>
                <IconButton title={"Add"} icon={<PlusSquareFilled />} />
            </Form>
        </>
    );
};

export default AddProduct;
