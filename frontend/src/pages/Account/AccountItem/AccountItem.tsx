import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectIsUserLoading, selectUserFromUserState } from "../../../redux-toolkit/user/user-selector";
import Spinner from "../../../components/Spinner/Spinner";
import { UserRoles } from "../../../types/types";
import {
    ACCOUNT_ADMIN_ADD,
    ACCOUNT_ADMIN_CATEGORIES,
    ACCOUNT_ADMIN_ORDERS,
    ACCOUNT_ADMIN_PRODUCTS,
    ACCOUNT_ADMIN_USERS,
    ACCOUNT_USER_INFO,
    ACCOUNT_USER_ORDERS
} from "../../../constants/routeConstants";

type QuickLink = {
    to: string;
    icon: string;
    title: string;
    desc: string;
};

const adminLinks: QuickLink[] = [
    { to: ACCOUNT_ADMIN_ORDERS, icon: "receipt_long", title: "Đơn hàng", desc: "Xem và xử lý đơn của khách" },
    { to: ACCOUNT_ADMIN_PRODUCTS, icon: "inventory_2", title: "Sản phẩm", desc: "Quản lý, sửa & xóa sản phẩm" },
    { to: ACCOUNT_ADMIN_CATEGORIES, icon: "category", title: "Danh mục", desc: "Thêm/sửa/xóa danh mục sản phẩm" },
    { to: ACCOUNT_ADMIN_ADD, icon: "add_box", title: "Thêm sản phẩm", desc: "Đăng sản phẩm mới lên cửa hàng" },
    { to: ACCOUNT_ADMIN_USERS, icon: "group", title: "Người dùng", desc: "Danh sách tài khoản khách hàng" }
];

const userLinks: QuickLink[] = [
    { to: ACCOUNT_USER_ORDERS, icon: "receipt_long", title: "Đơn hàng của tôi", desc: "Theo dõi các đơn đã đặt" },
    { to: ACCOUNT_USER_INFO, icon: "person", title: "Thông tin cá nhân", desc: "Cập nhật thông tin giao hàng" }
];

const AccountItem: FC = (): ReactElement => {
    const usersData = useSelector(selectUserFromUserState);
    const loading = useSelector(selectIsUserLoading);
    const isAdmin = usersData?.roles?.[0] === UserRoles.ADMIN;
    const links = isAdmin ? adminLinks : userLinks;

    if (loading) {
        return <Spinner />;
    }

    return (
        <div>
            <p className="font-label-sm text-label-sm uppercase text-secondary">
                {isAdmin ? "Bảng điều khiển" : "Tài khoản"}
            </p>
            <h1 className="mt-xs font-headline-lg text-[28px] leading-tight text-primary">
                Xin chào, {usersData?.firstName} {usersData?.lastName}!
            </h1>
            <p className="mt-sm max-w-2xl font-body-md text-body-md text-on-surface-variant">
                {isAdmin
                    ? "Chọn một mục bên dưới để quản lý cửa hàng Làng Nghề Việt."
                    : "Chào mừng bạn quay lại. Quản lý đơn hàng và thông tin cá nhân của bạn tại đây."}
            </p>

            <div className="mt-lg grid gap-gutter sm:grid-cols-2">
                {links.map((link) => (
                    <Link
                        key={link.to}
                        to={link.to}
                        className="group flex items-start gap-4 rounded-2xl border border-outline-variant/50 bg-surface p-5 transition hover:-translate-y-0.5 hover:border-secondary/40 hover:no-underline hover:shadow-[0_18px_36px_-26px_rgba(23,49,36,0.55)]"
                    >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-fixed text-primary transition group-hover:bg-primary group-hover:text-on-primary">
                            <span className="material-symbols-outlined text-[24px]">{link.icon}</span>
                        </span>
                        <span className="min-w-0">
                            <span className="block font-label-sm text-[15px] text-primary">{link.title}</span>
                            <span className="mt-0.5 block font-body-md text-[13px] text-on-surface-variant">
                                {link.desc}
                            </span>
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AccountItem;
