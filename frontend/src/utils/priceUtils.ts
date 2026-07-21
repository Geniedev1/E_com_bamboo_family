export const formatVnd = (value: number): string => `${(value || 0).toLocaleString("vi-VN")} đ`;

// Product prices are stored as "thousands" in the seed data (e.g. 35 -> 35.000 đ),
// matching how the catalogue (Menu) displays them. Keep card/listing prices consistent.
export const formatProductPrice = (value: number): string => `${(value || 0).toLocaleString("vi-VN")}.000 đ`;
