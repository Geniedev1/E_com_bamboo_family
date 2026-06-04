import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Pagination } from "antd";
import { Link, useLocation } from "react-router-dom";

import { selectIsProductsLoading, selectProducts } from "../../redux-toolkit/products/products-selector";
import { FilterParamsType, ProductResponse, SearchProduct } from "../../types/types";
import { fetchProductsByFilterParams, fetchProductsByInputText } from "../../redux-toolkit/products/products-thunks";
import { resetProductsState } from "../../redux-toolkit/products/products-slice";
import Spinner from "../../components/Spinner/Spinner";
import { MAX_PAGE_VALUE, usePagination } from "../../hooks/usePagination";
import { price } from "./MenuData";
import { useSearch } from "../../hooks/useSearch";
import { PRODUCT } from "../../constants/routeConstants";
import "./Menu.css";

export enum CheckboxCategoryFilter {
    VENDORS = "VENDORS",
    GENDERS = "GENDERS"
}

const categoryFilters = [
    "Tất cả sản phẩm",
    "Rổ & Giỏ đan",
    "Khay trà & Phụ kiện",
    "Đèn lồng trang trí"
];

const materialFilters = ["Mây tự nhiên", "Tre hun khói", "Nứa đan", "Kết hợp"];

const materialBadgeByIndex = ["Mây tự nhiên", "Tre hun khói", "Mây tự nhiên", "Nứa đan"];

const sortOptions = [
    { label: "Mới nhất", value: "false" },
    { label: "Giá tăng dần", value: "true" }
];

const searchTypeOptions = [
    { label: "Tên sản phẩm", value: SearchProduct.PRODUCT_TITLE },
    { label: "Thương hiệu", value: SearchProduct.BRAND },
    { label: "Xuất xứ", value: SearchProduct.COUNTRY }
];

type MenuProductCardProps = {
    product: ProductResponse;
    index: number;
};

type SoftDropdownProps = {
    value: string;
    options: Array<{ label: string; value: string }>;
    onChange: (value: string) => void;
    className?: string;
    buttonClassName?: string;
    placement?: "top" | "bottom";
};

const SoftDropdown: FC<SoftDropdownProps> = ({
    value,
    options,
    onChange,
    className = "",
    buttonClassName = "",
    placement = "bottom"
}): ReactElement => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const selectedOption = options.find((option) => option.value === value) || options[0];

    useEffect(() => {
        const closeOnOutsideClick = (event: MouseEvent): void => {
            if (!dropdownRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", closeOnOutsideClick);
        return () => document.removeEventListener("mousedown", closeOnOutsideClick);
    }, []);

    return (
        <div ref={dropdownRef} className={`relative ${className}`}>
            <button
                type="button"
                className={`flex w-full items-center justify-between rounded-full px-sm text-left font-body-md text-body-md text-on-surface transition ${buttonClassName}`}
                onClick={() => setIsOpen((prevState) => !prevState)}
                aria-expanded={isOpen}
            >
                <span className="truncate">{selectedOption.label}</span>
                <span
                    className={`material-symbols-outlined text-[20px] text-on-surface-variant transition ${
                        isOpen ? "rotate-180" : ""
                    }`}
                >
                    expand_more
                </span>
            </button>

            {isOpen && (
                <div
                    className={`absolute left-0 right-0 z-40 overflow-hidden rounded-[18px] bg-white p-[5px] shadow-[0_22px_54px_-34px_rgba(23,49,36,0.75)] ring-1 ring-outline-variant/40 ${
                        placement === "top" ? "bottom-[calc(100%+6px)]" : "top-[calc(100%+6px)]"
                    }`}
                >
                    {options.map((option) => {
                        const isSelected = option.value === value;

                        return (
                            <button
                                key={option.value}
                                type="button"
                                className={`flex h-9 w-full items-center justify-between rounded-[14px] px-sm text-left font-body-md text-body-md transition ${
                                    isSelected
                                        ? "bg-primary-fixed text-primary"
                                        : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
                                }`}
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                aria-pressed={isSelected}
                            >
                                <span className="truncate">{option.label}</span>
                                {isSelected && (
                                    <span className="material-symbols-outlined text-[17px] text-secondary">check</span>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const MenuProductCard: FC<MenuProductCardProps> = ({ product, index }): ReactElement => {
    const material = product.category || materialBadgeByIndex[index % materialBadgeByIndex.length];

    return (
        <Link
            className="group flex min-h-[460px] flex-col overflow-hidden rounded-lg border border-[#eadfca] bg-[#fffdf6] text-on-surface shadow-[0_8px_18px_-14px_rgba(83,61,31,0.32)] transition duration-300 hover:-translate-y-1 hover:text-on-surface hover:no-underline hover:shadow-[0_16px_28px_-20px_rgba(83,61,31,0.46)]"
            to={`${PRODUCT}/${product.id}`}
        >
            <div className="relative aspect-[1.28/1] overflow-hidden bg-[#f7f0e4]">
                <span className="absolute left-sm top-sm z-10 rounded-full bg-[#2e633f] px-sm py-[3px] font-label-sm text-[11px] uppercase leading-none text-white">
                    New
                </span>
                <span className="absolute right-sm top-sm z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-primary shadow-[0_8px_18px_-13px_rgba(83,61,31,0.48)] transition group-hover:text-secondary">
                    <span className="material-symbols-outlined text-[22px]">favorite</span>
                </span>
                <img
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    src={product.filename}
                    alt={product.productTitle}
                />
            </div>

            <div className="flex flex-1 flex-col p-sm">
                <h3 className="min-h-[52px] font-headline-md text-[18px] font-semibold leading-[1.45] text-primary">
                    {product.productTitle}
                </h3>

                <div className="mt-sm space-y-xs font-body-md text-[14px] leading-6 text-[#6b5b45]">
                    <div className="flex items-center gap-xs font-label-sm text-[15px] text-primary">
                        <span className="material-symbols-outlined text-[17px] text-[#7d8b54]">paid</span>
                        {product.price.toLocaleString("vi-VN")}.000 đ
                    </div>
                    <div className="flex items-center gap-xs">
                        <span className="material-symbols-outlined text-[17px] text-[#8c955f]">straighten</span>
                        <span className="truncate">{product.volume || "Kích thước đang cập nhật"}</span>
                    </div>
                    <div className="flex items-center gap-xs">
                        <span className="material-symbols-outlined text-[17px] text-[#8c955f]">palette</span>
                        <span>Chưa có màu</span>
                    </div>
                    <div className="flex items-center gap-xs">
                        <span className="material-symbols-outlined text-[17px] text-[#8c955f]">layers</span>
                        <span className="truncate">{material || product.vendor}</span>
                    </div>
                </div>

                <span className="mt-auto flex h-10 items-center justify-center rounded-lg border border-[#b59c72] font-label-sm text-[14px] text-primary transition group-hover:bg-primary group-hover:text-white">
                    Xem chi tiết
                </span>
            </div>
        </Link>
    );
};

const Menu: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const isProductsLoading = useSelector(selectIsProductsLoading);
    const location = useLocation<{ id: string }>();
    const [filterParams, setFilterParams] = useState<FilterParamsType>({
        vendors: [],
        genders: [],
        prices: price[0].array
    });
    const [activeMaterial, setActiveMaterial] = useState<string>(materialFilters[0]);
    const [sortByPrice, setSortByPrice] = useState<boolean>(false);
    const { currentPage, totalElements, handleChangePagination, resetPagination } = usePagination();
    const { searchValue, searchTypeValue, resetFields, form, onSearch, handleChangeSelect } = useSearch();

    useEffect(() => {
        const productData = location.state?.id || "all";

        if (productData === "female" || productData === "male") {
            dispatch(
                fetchProductsByFilterParams({
                    ...filterParams,
                    genders: [...filterParams.genders, productData],
                    sortByPrice,
                    currentPage: 0
                })
            );
            setFilterParams((prevState) => ({ ...prevState, genders: [...prevState.genders, productData] }));
        } else if (productData === "all") {
            dispatch(fetchProductsByFilterParams({ ...filterParams, sortByPrice, currentPage: 0 }));
        } else {
            dispatch(
                fetchProductsByFilterParams({
                    ...filterParams,
                    vendors: [...filterParams.vendors, productData],
                    sortByPrice,
                    currentPage: 0
                })
            );
            setFilterParams((prevState) => ({ ...prevState, vendors: [...prevState.vendors, productData] }));
        }
        window.scrollTo(0, 0);

        return () => {
            dispatch(resetProductsState());
        };
    }, []);

    useEffect(() => {
        resetPagination();
    }, [filterParams, sortByPrice]);

    const handleChangeSortSelect = (value: boolean): void => {
        dispatch(fetchProductsByFilterParams({ ...filterParams, sortByPrice: value, currentPage: 0 }));
        setSortByPrice(value);
        resetFields();
    };

    const resetFilter = (): void => {
        const nextFilter = { vendors: [], genders: [], prices: price[0].array };
        setFilterParams(nextFilter);
        dispatch(fetchProductsByFilterParams({ ...nextFilter, sortByPrice, currentPage: 0 }));
        resetFields();
    };

    const changePagination = (page: number, pageSize: number): void => {
        if (searchValue) {
            dispatch(
                fetchProductsByInputText({ searchType: searchTypeValue, text: searchValue, currentPage: page - 1 })
            );
        } else {
            dispatch(fetchProductsByFilterParams({ ...filterParams, sortByPrice, currentPage: page - 1 }));
        }
        handleChangePagination(page, pageSize);
    };

    const handleSearchSubmit = (data: { searchValue: string }): void => {
        onSearch(data);
        resetPagination();
    };

    return (
        <div className="bg-background text-on-surface">
            <section>
                <div className="px-margin-mobile pb-xl pt-lg text-center md:px-[56px]">
                    <h1 className="font-headline-xl text-[40px] leading-tight text-primary md:text-headline-xl">
                        Bộ sưu tập Mây Tre
                    </h1>
                    <p className="mx-auto mt-sm max-w-2xl font-body-md text-body-md text-on-surface-variant">
                        Khám phá vẻ đẹp mộc mạc và tinh tế của các sản phẩm thủ công truyền thống, mang hơi thở
                        thiên nhiên vào không gian sống hiện đại.
                    </p>
                </div>
            </section>

            <section className="grid items-start gap-gutter px-margin-mobile pb-xl md:grid-cols-[225px_minmax(0,1fr)] md:px-[56px]">
                <aside className="sticky top-[92px] h-fit overflow-visible pr-xs">
                    <div>
                        <h2 className="border-b border-outline-variant pb-xs font-label-sm text-label-sm uppercase text-on-surface">
                            Danh mục
                        </h2>
                        <div className="mt-sm flex w-full flex-col gap-sm">
                            {categoryFilters.map((category, index) => {
                                const isChecked = index === 0 && !filterParams.vendors.length && !filterParams.genders.length;

                                return (
                                    <button
                                        key={category}
                                        type="button"
                                        className="group flex items-center gap-xs text-left font-body-md text-body-md text-on-surface-variant transition hover:text-primary"
                                        onClick={index === 0 ? resetFilter : undefined}
                                        aria-pressed={isChecked}
                                    >
                                        <span
                                            className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border transition ${
                                                isChecked
                                                    ? "border-secondary bg-secondary text-white shadow-[0_8px_16px_-12px_rgba(152,71,33,0.9)]"
                                                    : "border-outline-variant bg-white/80 group-hover:border-secondary/70 group-hover:bg-surface-container-lowest"
                                            }`}
                                        >
                                            {isChecked && (
                                                <span className="material-symbols-outlined text-[15px] leading-none">
                                                    check
                                                </span>
                                            )}
                                        </span>
                                        <span>{category}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-lg">
                        <h2 className="border-b border-outline-variant pb-xs font-label-sm text-label-sm uppercase text-on-surface">
                            Chất liệu
                        </h2>
                        <div className="mt-sm flex flex-wrap gap-xs">
                            {materialFilters.map((material, index) => (
                                <button
                                    key={material}
                                    type="button"
                                    className={`rounded-full px-sm py-xs font-body-md text-[13px] shadow-[0_8px_20px_-18px_rgba(23,49,36,0.7)] transition ${
                                        activeMaterial === material
                                            ? "bg-primary-fixed text-primary"
                                            : "bg-surface-container-lowest text-on-surface-variant ring-1 ring-outline-variant/50 hover:bg-surface-container-low"
                                    }`}
                                    onClick={() => setActiveMaterial(material)}
                                >
                                    {material}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-lg">
                        <h2 className="border-b border-outline-variant pb-xs font-label-sm text-label-sm uppercase text-on-surface">
                            Sắp xếp
                        </h2>
                        <SoftDropdown
                            className="mt-sm w-full"
                            buttonClassName="h-10 bg-surface-container-lowest shadow-[0_10px_26px_-22px_rgba(23,49,36,0.55)] ring-1 ring-outline-variant/45 hover:bg-surface-container-low"
                            value={String(sortByPrice)}
                            options={sortOptions}
                            onChange={(value) => handleChangeSortSelect(value === "true")}
                            placement="top"
                        />
                    </div>
                </aside>

                <div className="min-w-0">
                    <Form form={form} onFinish={handleSearchSubmit} className="mb-md">
                        <div className="flex flex-col gap-xs rounded-full bg-white/95 p-xs shadow-[0_18px_44px_-36px_rgba(23,49,36,0.55)] ring-1 ring-outline-variant/35 md:flex-row md:items-center">
                            <div className="flex min-w-0 flex-1 items-center rounded-full bg-surface-container-low px-sm">
                                <span className="material-symbols-outlined mr-xs text-[21px] text-on-surface-variant">
                                    search
                                </span>
                                <Form.Item name="searchValue" noStyle>
                                    <Input
                                        bordered={false}
                                        className="h-11 bg-transparent px-0 font-body-md text-body-md"
                                        placeholder="Tìm sản phẩm..."
                                    />
                                </Form.Item>
                            </div>
                            <SoftDropdown
                                className="w-full md:w-[170px]"
                                buttonClassName="h-11 bg-surface-container-low hover:bg-surface-container"
                                value={searchTypeValue}
                                options={searchTypeOptions}
                                onChange={(value) => handleChangeSelect(value as SearchProduct)}
                            />
                            <button
                                type="submit"
                                className="h-11 rounded-full bg-secondary px-lg font-label-sm text-label-sm text-white shadow-[0_12px_24px_-16px_rgba(152,71,33,0.9)] transition hover:bg-on-secondary-container"
                            >
                                Tìm kiếm
                            </button>
                        </div>
                    </Form>

                    {isProductsLoading ? (
                        <div className="flex min-h-[360px] items-center justify-center">
                            <Spinner />
                        </div>
                    ) : (
                        <div className="grid gap-gutter sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                            {products.map((product, index) => (
                                <MenuProductCard key={product.id} product={product} index={index} />
                            ))}
                        </div>
                    )}

                    <div className="mt-xl flex justify-center">
                        <Pagination
                            current={currentPage}
                            pageSize={MAX_PAGE_VALUE}
                            total={totalElements}
                            showSizeChanger={false}
                            onChange={changePagination}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Menu;
