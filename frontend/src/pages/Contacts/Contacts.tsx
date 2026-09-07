import React, {FC, ReactElement, useEffect} from "react";
import { Col, Row, Typography } from "antd";
import { FacebookFilled, InfoCircleOutlined, InstagramFilled, PinterestFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import ContentTitle from "../../components/ContentTitle/ContentTitle";

const socialLinks = [
    { label: "Facebook", href: "https://www.facebook.com/share/1J1VHMWV2Z/?mibextid=wwXIfr", icon: <FacebookFilled /> },
    { label: "Pinterest", href: "https://pin.it/4GzH2MDLR", icon: <PinterestFilled /> },
    { label: "Instagram", href: "https://www.instagram.com/dongocminh200412", icon: <InstagramFilled /> }
];

const Contacts: FC = (): ReactElement => {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <ContentWrapper>
            <ContentTitle icon={<InfoCircleOutlined />} title={t("contacts.title")} />
            <Row gutter={32}>
                <Col span={12}>
                    <div>
                        <Typography.Text strong>{t("contacts.phone")}</Typography.Text>
                        <Typography.Text>{t("contacts.phoneValue")}</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text strong>{t("contacts.email")}</Typography.Text>
                        <Typography.Text>rattanovi@gmail.com</Typography.Text>
                    </div>
                    <div style={{ marginTop: 16 }}>
                        <Typography.Text strong>{t("contacts.workingHours")}</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text>
                            {t("contacts.workingHoursText")} <br />
                            {t("contacts.onlineOrders")}
                        </Typography.Text>
                    </div>
                    <div style={{ marginTop: 16 }}>
                        <Typography.Text strong>{t("contacts.delivery")}</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text>{t("contacts.deliveryText")}</Typography.Text>
                    </div>
                    <div style={{ marginTop: 16 }}>
                        <Typography.Text strong>{t("contacts.connectWithUs")}</Typography.Text>
                    </div>
                    <div style={{ marginTop: 8 }}>
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={link.label}
                                style={{ marginRight: 16, fontSize: 22 }}
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </Col>
            </Row>
        </ContentWrapper>
    );
};

export default Contacts;
