import React, { FC, ReactElement, ReactNode } from "react";

type PropsType = {
    icon?: ReactNode;
    title: string;
    titleLevel?: 1 | 2 | 3 | 4 | 5;
};

const sizeByLevel: Record<number, string> = {
    1: "text-[30px]",
    2: "text-[26px]",
    3: "text-[22px]",
    4: "text-[20px]",
    5: "text-[17px]"
};

const ContentTitle: FC<PropsType> = ({ icon, title, titleLevel = 4 }): ReactElement => {
    return (
        <div className="mb-6 flex items-center gap-3">
            {icon && (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-fixed text-[22px] text-primary">
                    {icon}
                </span>
            )}
            <h2 className={`font-headline-md font-semibold text-primary ${sizeByLevel[titleLevel]}`}>{title}</h2>
        </div>
    );
};

export default ContentTitle;
