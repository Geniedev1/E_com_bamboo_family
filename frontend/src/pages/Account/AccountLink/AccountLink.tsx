import React, { FC, ReactElement } from "react";
import { NavLink } from "react-router-dom";

type PropsType = {
    link: string;
    title: string;
    icon?: string;
};

const AccountLink: FC<PropsType> = ({ link, title, icon }): ReactElement => {
    return (
        <NavLink
            to={link}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-label-sm text-[14px] text-on-surface-variant transition hover:bg-surface-container-low hover:text-primary hover:no-underline"
            activeClassName="!bg-primary-fixed !text-primary"
        >
            {icon && <span className="material-symbols-outlined text-[20px]">{icon}</span>}
            <span className="truncate">{title}</span>
        </NavLink>
    );
};

export default AccountLink;
