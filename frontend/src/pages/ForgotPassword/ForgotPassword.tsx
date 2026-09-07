import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Col, Divider, Form, Row, Typography } from "antd";
import { KeyOutlined, MailOutlined, SendOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import {
    selectErrorMessage,
    selectIsAuthLoading,
    selectSuccessMessage
} from "../../redux-toolkit/auth/auth-selector";
import { setAuthLoadingState } from "../../redux-toolkit/auth/auth-slice";
import { LoadingStatus } from "../../types/types";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import ContentTitle from "../../components/ContentTitle/ContentTitle";
import FormInput from "../../components/FormInput/FormInput";
import IconButton from "../../components/IconButton/IconButton";
import { forgotPassword } from "../../redux-toolkit/auth/auth-thunks";

const ForgotPassword: FC = (): ReactElement => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const error = useSelector(selectErrorMessage);
    const success = useSelector(selectSuccessMessage);
    const isLoading = useSelector(selectIsAuthLoading);

    useEffect(() => {
        dispatch(setAuthLoadingState(LoadingStatus.LOADED));
    }, []);

    useEffect(() => {
        form.resetFields();
    }, [success]);

    const onClickSend = (value: { email: string }): void => {
        dispatch(forgotPassword(value.email));
    };

    return (
        <ContentWrapper>
            <ContentTitle icon={<KeyOutlined />} title={t("forgotPassword.title")} />
            <Row gutter={32}>
                <Col span={12}>
                    <Form form={form} onFinish={onClickSend}>
                        <Divider />
                        <Typography.Text style={{ display: "block", marginBottom: 16 }}>
                            {t("forgotPassword.instructions")}
                        </Typography.Text>
                        {error && <Alert type="error" message={error} />}
                        {success && <Alert type="success" message={success} />}
                        <FormInput
                            title={t("forgotPassword.email")}
                            icon={<MailOutlined />}
                            titleSpan={8}
                            wrapperSpan={16}
                            name={"email"}
                            placeholder={t("forgotPassword.emailPlaceholder")}
                            rule={[{ required: true, message: t("forgotPassword.emailRequired") }]}
                        />
                        <IconButton disabled={isLoading} title={t("forgotPassword.send")} icon={<SendOutlined />} />
                    </Form>
                </Col>
            </Row>
        </ContentWrapper>
    );
};

export default ForgotPassword;
