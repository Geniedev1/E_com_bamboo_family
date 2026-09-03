import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "antd";
import { CheckOutlined, EditOutlined, EyeInvisibleOutlined, ProfileOutlined } from "@ant-design/icons";

import { selectUserEditErrors, selectUserFromUserState } from "../../../redux-toolkit/user/user-selector";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import AccountDataItem from "../../../components/AccountDataItem/AccountDataItem";
import FormInput from "../../../components/FormInput/FormInput";
import IconButton from "../../../components/IconButton/IconButton";
import { updateUserInfo } from "../../../redux-toolkit/user/user-thunks";
import { resetInputForm } from "../../../redux-toolkit/user/user-slice";

interface PersonalData {
    firstName: string;
    lastName: string;
    city: string;
    address: string;
    phoneNumber: string;
    postIndex: string;
}

const PersonalData: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const usersData = useSelector(selectUserFromUserState);
    const errors = useSelector(selectUserEditErrors);
    const [showUserData, setShowUserData] = useState<boolean>(false);
    const { firstNameError, lastNameError } = errors;

    const onClickShowUserData = (): void => {
        setShowUserData((prevState) => !prevState);
    };

    useEffect(() => {
        dispatch(resetInputForm());

        if (usersData) {
            form.setFieldsValue(usersData);
        }
    }, []);

    const onFormSubmit = (data: PersonalData): void => {
        dispatch(updateUserInfo({ id: usersData?.id, ...data }));
    };

    return (
        <>
            <ContentTitle title={"Thông tin cá nhân"} titleLevel={4} icon={<ProfileOutlined />} />
            <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                    <AccountDataItem title={"Email"} text={usersData?.email} />
                    <AccountDataItem title={"Họ"} text={usersData?.firstName} />
                    <AccountDataItem title={"Tên"} text={usersData?.lastName} />
                    <AccountDataItem title={"Thành phố"} text={usersData?.city} />
                    <AccountDataItem title={"Địa chỉ"} text={usersData?.address} />
                    <AccountDataItem title={"Số điện thoại"} text={usersData?.phoneNumber} />
                    <AccountDataItem title={"Mã bưu chính"} text={usersData?.postIndex} />
                    <Button
                        type={"primary"}
                        onClick={onClickShowUserData}
                        icon={showUserData ? <EyeInvisibleOutlined /> : <EditOutlined />}
                    >
                        {showUserData ? "Ẩn" : "Chỉnh sửa"}
                    </Button>
                </Col>
                <Col xs={24} md={12}>
                    {showUserData && (
                        <Form onFinish={onFormSubmit} form={form}>
                            <FormInput
                                title={"Họ:"}
                                titleSpan={6}
                                wrapperSpan={18}
                                name={"firstName"}
                                error={firstNameError}
                                placeholder={"Nhập họ"}
                            />
                            <FormInput
                                title={"Tên:"}
                                titleSpan={6}
                                wrapperSpan={18}
                                name={"lastName"}
                                error={lastNameError}
                                placeholder={"Nhập tên"}
                            />
                            <FormInput
                                title={"Thành phố:"}
                                titleSpan={6}
                                wrapperSpan={18}
                                name={"city"}
                                placeholder={"Nhập thành phố"}
                            />
                            <FormInput
                                title={"Địa chỉ:"}
                                titleSpan={6}
                                wrapperSpan={18}
                                name={"address"}
                                placeholder={"Nhập địa chỉ"}
                            />
                            <FormInput
                                title={"Số điện thoại:"}
                                titleSpan={6}
                                wrapperSpan={18}
                                name={"phoneNumber"}
                                placeholder={"Nhập số điện thoại"}
                            />
                            <FormInput
                                title={"Mã bưu chính:"}
                                titleSpan={6}
                                wrapperSpan={18}
                                name={"postIndex"}
                                placeholder={"Nhập mã bưu chính"}
                            />
                            <IconButton title={"Lưu"} icon={<CheckOutlined />} />
                        </Form>
                    )}
                </Col>
            </Row>
        </>
    );
};

export default PersonalData;
