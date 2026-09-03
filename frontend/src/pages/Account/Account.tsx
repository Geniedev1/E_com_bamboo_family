import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import { selectIsUserLoading, selectUserFromUserState } from "../../redux-toolkit/user/user-selector";
import { resetAuthState } from "../../redux-toolkit/auth/auth-slice";
import { fetchUserInfo } from "../../redux-toolkit/user/user-thunks";
import { UserRoles } from "../../types/types";
import Spinner from "../../components/Spinner/Spinner";
import {
    ACCOUNT,
    ACCOUNT_ADMIN_ADD,
    ACCOUNT_ADMIN_CATEGORIES,
    ACCOUNT_ADMIN_CHAT,
    ACCOUNT_ADMIN_ORDERS,
    ACCOUNT_ADMIN_PRODUCTS,
    ACCOUNT_ADMIN_USERS,
    ACCOUNT_USER_EDIT,
    ACCOUNT_USER_INFO,
    ACCOUNT_USER_ORDERS,
    LOGIN
} from "../../constants/routeConstants";
import AccountLink from "./AccountLink/AccountLink";
import AccountItem from "./AccountItem/AccountItem";
import PersonalData from "./PersonalData/PersonalData";
import AddProduct from "./AddProduct/AddProduct";
import ProductList from "./ProductList/ProductList";
import CategoryList from "./CategoryList/CategoryList";
import ChatInbox from "./ChatInbox/ChatInbox";
import EditProduct from "./EditProduct/EditProduct";
import OrdersList from "./OrdersList/OrdersList";
import ManageUserOrder from "./ManageUserOrder/ManageUserOrder";
import UsersList from "./UsersList/UsersList";
import ManageUser from "./ManageUser/ManageUser";
import ChangePassword from "./ChangePassword/ChangePassword";
import PersonalOrdersList from "./PersonalOrdersList/PersonalOrdersList";

const Account: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const usersData = useSelector(selectUserFromUserState);
    const loading = useSelector(selectIsUserLoading);

    useEffect(() => {
        dispatch(resetAuthState());
        dispatch(fetchUserInfo());
    }, [dispatch]);

    if (!localStorage.getItem("token")) {
        return <Redirect to={LOGIN} />;
    }

    const isAdmin = usersData?.roles?.[0] === UserRoles.ADMIN;
    // Wait for the profile before routing so a refresh/deep-link doesn't bounce
    // to the dashboard (or Home) before we know the user's role.
    const isReady = !loading && !!usersData;
    const fullName = [usersData?.firstName, usersData?.lastName].filter(Boolean).join(" ") || "Tài khoản";
    const initial = (usersData?.firstName || usersData?.email || "?").charAt(0).toUpperCase();

    return (
        <div className="min-h-[calc(100vh-72px)] bg-background">
            <div className="mx-auto max-w-7xl px-margin-mobile py-lg md:px-margin-desktop">
                <div className="grid items-start gap-gutter md:grid-cols-[264px_minmax(0,1fr)]">
                    <aside className="rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-4 shadow-[0_18px_40px_-30px_rgba(23,49,36,0.6)] md:sticky md:top-[92px]">
                        <div className="flex items-center gap-3 border-b border-outline-variant/50 pb-4">
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary font-headline-md text-[20px] font-bold text-on-primary">
                                {initial}
                            </span>
                            <div className="min-w-0">
                                <p className="truncate font-label-sm text-[15px] text-primary">{fullName}</p>
                                <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-primary-fixed px-2 py-[2px] font-label-sm text-[11px] text-primary">
                                    <span className="material-symbols-outlined text-[13px]">
                                        {isAdmin ? "shield_person" : "person"}
                                    </span>
                                    {isAdmin ? "Quản trị viên" : "Khách hàng"}
                                </span>
                            </div>
                        </div>

                        <nav className="mt-4 flex flex-col gap-1">
                            <AccountLink link={ACCOUNT_USER_INFO} title="Thông tin cá nhân" icon="person" />
                            {isAdmin ? (
                                <>
                                    <AccountLink link={ACCOUNT_ADMIN_ADD} title="Thêm sản phẩm" icon="add_box" />
                                    <AccountLink link={ACCOUNT_ADMIN_PRODUCTS} title="Danh sách sản phẩm" icon="inventory_2" />
                                    <AccountLink link={ACCOUNT_ADMIN_CATEGORIES} title="Danh mục" icon="category" />
                                    <AccountLink link={ACCOUNT_ADMIN_ORDERS} title="Đơn hàng" icon="receipt_long" />
                                    <AccountLink link={ACCOUNT_ADMIN_CHAT} title="Hộp thư" icon="forum" />
                                    <AccountLink link={ACCOUNT_ADMIN_USERS} title="Người dùng" icon="group" />
                                </>
                            ) : (
                                <>
                                    <AccountLink link={ACCOUNT_USER_EDIT} title="Đổi mật khẩu" icon="lock" />
                                    <AccountLink link={ACCOUNT_USER_ORDERS} title="Đơn hàng của tôi" icon="receipt_long" />
                                </>
                            )}
                        </nav>
                    </aside>

                    <section className="min-h-[520px] rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-6 shadow-[0_18px_40px_-30px_rgba(23,49,36,0.6)] md:p-8">
                        {!isReady ? (
                            <div className="flex min-h-[420px] items-center justify-center">
                                <Spinner />
                            </div>
                        ) : (
                            <Switch>
                                <Route exact path={ACCOUNT} component={AccountItem} />
                                <Route path={ACCOUNT_USER_INFO} component={PersonalData} />
                                <Route path={ACCOUNT_USER_EDIT} component={ChangePassword} />
                                <Route exact path={ACCOUNT_USER_ORDERS} component={PersonalOrdersList} />
                                <Route exact path={`${ACCOUNT_USER_ORDERS}/:id`} component={ManageUserOrder} />
                                {isAdmin && <Route path={ACCOUNT_ADMIN_ADD} component={AddProduct} />}
                                {isAdmin && <Route exact path={ACCOUNT_ADMIN_PRODUCTS} component={ProductList} />}
                                {isAdmin && <Route exact path={`${ACCOUNT_ADMIN_PRODUCTS}/:id`} component={EditProduct} />}
                                {isAdmin && <Route exact path={ACCOUNT_ADMIN_CATEGORIES} component={CategoryList} />}
                                {isAdmin && <Route exact path={ACCOUNT_ADMIN_ORDERS} component={OrdersList} />}
                                {isAdmin && <Route exact path={ACCOUNT_ADMIN_CHAT} component={ChatInbox} />}
                                {isAdmin && <Route exact path={ACCOUNT_ADMIN_USERS} component={UsersList} />}
                                {isAdmin && <Route exact path={`${ACCOUNT_ADMIN_USERS}/:id`} component={ManageUser} />}
                                <Redirect to={ACCOUNT} />
                            </Switch>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Account;
