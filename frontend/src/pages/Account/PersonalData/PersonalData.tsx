import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
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
    const { t } = useTranslation();
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
            <ContentTitle title={t("personalData.title")} titleLevel={4} icon={<ProfileOutlined />} />
            <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                    <AccountDataItem title={t("personalData.email")} text={usersData?.email} />
                    <AccountDataItem title={t("personalData.firstName")} text={usersData?.firstName} />
                    <AccountDataItem title={t("personalData.lastName")} text={usersData?.lastName} />
                    <AccountDataItem title={t("personalData.city")} text={usersData?.city} />
                    <AccountDataItem title={t("personalData.address")} text={usersData?.address} />
                    <AccountDataItem title={t("personalData.phone")} text={usersData?.phoneNumber} />
                    <AccountDataItem title={t("personalData.postIndex")} text={usersData?.postIndex} />
                    <Button
                        type={"primary"}
                        onClick={onClickShowUserData}
                        icon={showUserData ? <EyeInvisibleOutlined /> : <EditOutlined />}
                    >
                        {showUserData ? t("personalData.hide") : t("personalData.edit")}
                    </Button>
                </Col>
                <Col xs={24} md={12}>
                    {showUserData && (
                        <Form onFinish={onFormSubmit} form={form}>
                            <FormInput
                                title={t("personalData.firstNameLabel")}
                                titleSpan={6}
                                wrapperSpan={18}
                                name={"firstName"}
                                error={firstNameError}
                                placeholder={t("personalData.firstNamePlaceholder")}
                            />
                            <FormInput
                                title={t("personalData.lastNameLabel")}
                                titleSpan={6}
                                wrapperSpan={18}
                                name={"lastName"}
                                error={lastNameError}
                                placeholder={t("personalData.lastNamePlaceholder")}
                            />
                            <FormInput
                                title={t("personalData.cityLabel")}
                                titleSpan={6}
                                wrapperSpan={18}
                                name={"city"}
                                placeholder={t("personalData.cityPlaceholder")}
                            />
                            <FormInput
                                title={t("personalData.addressLabel")}
                                titleSpan={6}
                                wrapperSpan={18}
                                name={"address"}
                                placeholder={t("personalData.addressPlaceholder")}
                            />
                            <FormInput
                                title={t("personalData.phoneLabel")}
                                titleSpan={6}
                                wrapperSpan={18}
                                name={"phoneNumber"}
                                placeholder={t("personalData.phonePlaceholder")}
                            />
                            <FormInput
                                title={t("personalData.postIndexLabel")}
                                titleSpan={6}
                                wrapperSpan={18}
                                name={"postIndex"}
                                placeholder={t("personalData.postIndexPlaceholder")}
                            />
                            <IconButton title={t("personalData.save")} icon={<CheckOutlined />} />
                        </Form>
                    )}
                </Col>
            </Row>
        </>
    );
};

export default PersonalData;
