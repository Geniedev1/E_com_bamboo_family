import React, {FC, ReactElement, useEffect} from "react";
import { Col, Row, Typography } from "antd";
import { FacebookFilled, InfoCircleOutlined, InstagramFilled, PinterestFilled } from "@ant-design/icons";

import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import ContentTitle from "../../components/ContentTitle/ContentTitle";

const socialLinks = [
    { label: "Facebook", href: "https://www.facebook.com/share/1J1VHMWV2Z/?mibextid=wwXIfr", icon: <FacebookFilled /> },
    { label: "Pinterest", href: "https://pin.it/4GzH2MDLR", icon: <PinterestFilled /> },
    { label: "Instagram", href: "https://www.instagram.com/dongocminh200412", icon: <InstagramFilled /> }
];

const Contacts: FC = (): ReactElement => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <ContentWrapper>
            <ContentTitle icon={<InfoCircleOutlined />} title={"Liên hệ"} />
            <Row gutter={32}>
                <Col span={12}>
                    <div>
                        <Typography.Text strong>{"Điện thoại: "}</Typography.Text>
                        <Typography.Text>0325 738 794 (FB/Zalo)</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text strong>{"Email: "}</Typography.Text>
                        <Typography.Text>rattanovi@gmail.com</Typography.Text>
                    </div>
                    <div style={{ marginTop: 16 }}>
                        <Typography.Text strong>Giờ làm việc</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text>
                            Cửa hàng mở cửa từ 08:00 đến 20:00, tất cả các ngày trong tuần. <br />
                            Đơn hàng online được tiếp nhận 24/7.
                        </Typography.Text>
                    </div>
                    <div style={{ marginTop: 16 }}>
                        <Typography.Text strong>Giao hàng</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text>Đơn hàng được giao qua dịch vụ vận chuyển.</Typography.Text>
                    </div>
                    <div style={{ marginTop: 16 }}>
                        <Typography.Text strong>Kết nối với chúng tôi</Typography.Text>
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
