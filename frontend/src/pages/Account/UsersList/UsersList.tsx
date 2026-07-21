import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TeamOutlined } from "@ant-design/icons";
import { Table } from "antd";

import {
    selectAdminStateUsers,
    selectIsAdminStateLoading,
    selectTotalElements
} from "../../../redux-toolkit/admin/admin-selector";
import { fetchAllUsers } from "../../../redux-toolkit/admin/admin-thunks";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import { BaseUserResponse, LoadingStatus } from "../../../types/types";
import { ACCOUNT_ADMIN_USERS } from "../../../constants/routeConstants";
import { resetAdminState } from "../../../redux-toolkit/admin/admin-slice";
import { useTablePagination } from "../../../hooks/useTablePagination";

const UsersList: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const users = useSelector(selectAdminStateUsers);
    const isLoading = useSelector(selectIsAdminStateLoading);
    const totalElements = useSelector(selectTotalElements);
    const handleTableChange = useTablePagination<BaseUserResponse, number>(fetchAllUsers);

    useEffect(() => {
        dispatch(fetchAllUsers(0));

        return () => {
            dispatch(resetAdminState(LoadingStatus.LOADING));
        };
    }, []);

    return (
        <div>
            <ContentTitle title={"Người dùng"} titleLevel={4} icon={<TeamOutlined />} />
            <Table
                rowKey={"id"}
                onChange={handleTableChange}
                loading={isLoading}
                pagination={{
                    total: totalElements,
                    position: ["bottomRight", "topRight"]
                }}
                dataSource={users}
                columns={[
                    {
                        title: "Mã",
                        dataIndex: "id",
                        key: "id",
                        render: (_, user: BaseUserResponse) => <span className="font-label-sm text-primary">#{user.id}</span>
                    },
                    {
                        title: "Tên",
                        dataIndex: "firstName",
                        key: "firstName"
                    },
                    {
                        title: "Email",
                        dataIndex: "email",
                        key: "email"
                    },
                    {
                        title: "Vai trò",
                        dataIndex: "roles",
                        key: "roles",
                        render: (_, user: BaseUserResponse) => (user.roles[0] === "ADMIN" ? "Quản trị viên" : "Khách hàng")
                    },
                    {
                        title: "Đăng nhập qua",
                        dataIndex: "provider",
                        key: "provider"
                    },
                    {
                        title: "Thao tác",
                        dataIndex: "amount",
                        key: "amount",
                        render: (_, user: BaseUserResponse) => (
                            <Link
                                to={`${ACCOUNT_ADMIN_USERS}/${user.id}`}
                                className="inline-flex items-center gap-1 font-label-sm text-secondary hover:text-primary hover:no-underline"
                            >
                                <span className="material-symbols-outlined text-[18px]">visibility</span>
                                Xem chi tiết
                            </Link>
                        )
                    }
                ]}
            />
        </div>
    );
};

export default UsersList;
