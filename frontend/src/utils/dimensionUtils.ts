import { ProductResponse } from "../types/types";

export type DimensionEntry = { label: string; value: number };

type DimensionSource = Pick<ProductResponse, "length" | "width" | "height" | "diameter">;

// Chỉ trả về những chiều thực sự có giá trị (> 0) - chiều nào = 0/không có thì
// ẩn hẳn (không hiện cả tên lẫn giá trị).
export const getVisibleDimensions = (product: DimensionSource, t: (key: string) => string): DimensionEntry[] => {
    const candidates: Array<[number | undefined | null, string]> = [
        [product.length, t("product.length")],
        [product.width, t("product.width")],
        [product.height, t("product.height")],
        [product.diameter, t("product.diameter")]
    ];

    return candidates
        .filter((entry): entry is [number, string] => !!entry[0] && entry[0] > 0)
        .map(([value, label]) => ({ label, value }));
};

export const formatDimensions = (product: DimensionSource, t: (key: string) => string): string =>
    getVisibleDimensions(product, t)
        .map(({ label, value }) => `${label}: ${value} cm`)
        .join(", ");
