import React, { FC, memo, ReactElement } from "react";
import { useTranslation } from "react-i18next";

type PropsType = {
    productId: number;
    deleteFromCart: (productId: number) => void;
};

const RemoveButton: FC<PropsType> = memo(({ productId, deleteFromCart }): ReactElement => {
    const { t } = useTranslation();

    return (
        <button
            type="button"
            onClick={() => deleteFromCart(productId)}
            className="inline-flex items-center gap-xs font-label-sm text-[13px] text-on-surface-variant transition-colors hover:text-error"
        >
            <span className="material-symbols-outlined text-[18px]">delete</span>
            {t("cart.remove")}
        </button>
    );
});

export default RemoveButton;
