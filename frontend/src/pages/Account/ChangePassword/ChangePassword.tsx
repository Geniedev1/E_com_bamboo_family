import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Col, Form, Row } from "antd";
import { KeyOutlined, UndoOutlined } from "@ant-design/icons";

import { selectSuccessMessage, selectUserResetPasswordErrors } from "../../../redux-toolkit/user/user-selector";
import { resetInputForm } from "../../../redux-toolkit/user/user-slice";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import FormInput from "../../../components/FormInput/FormInput";
import IconButton from "../../../components/IconButton/IconButton";
import { updateUserPassword } from "../../../redux-toolkit/user/user-thunks";

const ChangePassword: FC = (): ReactElement => {
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
            <ContentTitle title={"Đổi mật khẩu"} titleLevel={4} icon={<KeyOutlined />} />
            <Form onFinish={onFormSubmit} form={form}>
                <Row>
                    <Col xs={24} md={14}>
                        {successMessage && (
                            <Alert type="success" message={successMessage} style={{ marginBottom: 16 }} />
                        )}
                        <FormInput
                            title={"Mật khẩu mới"}
                            titleSpan={10}
                            wrapperSpan={14}
                            name={"password"}
                            error={passwordError}
                            placeholder={"Mật khẩu"}
                            inputPassword
                        />
                        <FormInput
                            title={"Xác nhận mật khẩu"}
                            titleSpan={10}
                            wrapperSpan={14}
                            name={"password2"}
                            error={password2Error}
                            placeholder={"Mật khẩu"}
                            inputPassword
                        />
                        <IconButton title={"Đổi mật khẩu"} icon={<UndoOutlined />} />
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default ChangePassword;
