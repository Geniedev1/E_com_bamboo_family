import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Alert, Col, Form, Row } from "antd";
import { KeyOutlined, UndoOutlined } from "@ant-design/icons";

import { selectSuccessMessage, selectUserResetPasswordErrors } from "../../../redux-toolkit/user/user-selector";
import { resetInputForm } from "../../../redux-toolkit/user/user-slice";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import FormInput from "../../../components/FormInput/FormInput";
import IconButton from "../../../components/IconButton/IconButton";
import { updateUserPassword } from "../../../redux-toolkit/user/user-thunks";

const ChangePassword: FC = (): ReactElement => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const errors = useSelector(selectUserResetPasswordErrors);
    const successMessage = useSelector(selectSuccessMessage);
    const { passwordError, password2Error } = errors;

    useEffect(() => {
        dispatch(resetInputForm());
    }, []);

    useEffect(() => {
        if (successMessage) {
            form.resetFields();
        }
    }, [successMessage]);

    const onFormSubmit = (data: { password: string; password2: string }): void => {
        dispatch(updateUserPassword({ ...data }));
    };

    return (
        <>
            <ContentTitle title={t("changePassword.title")} titleLevel={4} icon={<KeyOutlined />} />
            <Form onFinish={onFormSubmit} form={form}>
                <Row>
                    <Col xs={24} md={14}>
                        {successMessage && (
                            <Alert type="success" message={successMessage} style={{ marginBottom: 16 }} />
                        )}
                        <FormInput
                            title={t("changePassword.newPassword")}
                            titleSpan={10}
                            wrapperSpan={14}
                            name={"password"}
                            error={passwordError}
                            placeholder={t("changePassword.passwordPlaceholder")}
                            inputPassword
                        />
                        <FormInput
                            title={t("changePassword.confirmPassword")}
                            titleSpan={10}
                            wrapperSpan={14}
                            name={"password2"}
                            error={password2Error}
                            placeholder={t("changePassword.passwordPlaceholder")}
                            inputPassword
                        />
                        <IconButton title={t("changePassword.submit")} icon={<UndoOutlined />} />
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default ChangePassword;
