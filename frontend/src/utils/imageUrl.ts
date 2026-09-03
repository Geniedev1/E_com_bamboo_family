import { BASE_URL } from "../constants/urlConstants";

export const getImageUrl = (url?: string): string => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
        return url;
    }
    // Remove leading slash if BASE_URL already has one or if url has one, to avoid double slash
    const cleanBase = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
    const cleanUrl = url.startsWith("/") ? url : `/${url}`;
    const separator = cleanUrl.includes("?") ? "&" : "?";
    return `${cleanBase}${cleanUrl}${separator}v=8`;
};
