import React, { FC, ReactElement, ReactNode } from "react";

type PropsType = {
    title: string;
    icon: ReactNode;
    disabled?: boolean;
};

const IconButton: FC<PropsType> = ({ title, icon, disabled }): ReactElement => {
    return (
        <button
            type="submit"
            disabled={disabled}
            className="inline-flex items-center justify-center gap-base rounded-xl bg-primary px-lg py-sm font-label-sm text-label-sm text-on-primary transition-colors hover:bg-primary-container disabled:opacity-60"
        >
            {icon}
            <span>{title}</span>
        </button>
    );
};

export default IconButton;
