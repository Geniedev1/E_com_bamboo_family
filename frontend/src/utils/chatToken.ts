// Token định danh hội thoại chat cho MỌI khách (guest hoặc user), lưu localStorage.
const KEY = "chatToken";

export const getChatToken = (): string => {
    const existing = localStorage.getItem(KEY);
    if (existing) {
        return existing;
    }
    const cryptoObj = typeof window !== "undefined" ? (window.crypto as any) : undefined;
    const generated: string =
        cryptoObj && typeof cryptoObj.randomUUID === "function"
            ? cryptoObj.randomUUID()
            : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    localStorage.setItem(KEY, generated);
    return generated;
};
