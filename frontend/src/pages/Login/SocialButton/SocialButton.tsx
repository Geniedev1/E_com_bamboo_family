import React, { FC, ReactElement } from "react";

import { BASE_URL } from "../../../constants/urlConstants";

type PropsType = {
    socialNetwork: string;
    image: string;
};

const SocialButton: FC<PropsType> = ({ socialNetwork, image }): ReactElement => {
    return (
        <a
            href={`${BASE_URL}/oauth2/authorize/${socialNetwork}`}
            className="flex items-center justify-center gap-sm py-sm px-md border border-outline-variant/40 rounded-xl hover:bg-surface-container-low transition-colors"
        >
            <img src={image} alt={socialNetwork} className="w-5 h-5 object-contain" />
            <span className="font-label-sm text-label-sm text-on-surface capitalize">{socialNetwork}</span>
        </a>
    );
};

export default SocialButton;
