import i18n from "../i18n";

// Sản phẩm/danh mục chỉ có 1 bản gốc tiếng Việt; bản tiếng Anh là tùy chọn do admin nhập.
// Khi ở chế độ tiếng Anh mà admin chưa nhập bản dịch, hiển thị lại bản tiếng Việt gốc.
export const localize = (vi?: string | null, en?: string | null): string | undefined => {
    if (i18n.language === "en" && en && en.trim()) {
        return en;
    }
    return vi || undefined;
};
