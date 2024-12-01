export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
};

export const GearTypeList = [
    'PC',
    'Laptop',
    'MainBoard',
    'CPU',
    'GPU',
    'PSU',
    'RAM',
    'Fan',
    'Storage',
    'Monitor',
] as const;
export type GearType = typeof GearTypeList;
export type Gear = {
    id: string;
    name: string;
    type: GearType;
    brand: string;
    variety: string;
    price: number;
    discount: number;
    quantity: number;
    image_url: string;
};

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;

export type ListGearFilter = Partial<{
    page: number;
    limit: number;
    category: string;
    brand: string;
    variety: string;
    price: string;
    sort: 'asc' | 'desc';
}>;

export type ListGearFilterKey = keyof ListGearFilter;

export type AddGearForm = {
    name: string;
    type: GearType;
    brand: string;
    variety: string;
    price: number;
    discount: number;
    quantity: number;
    image_base64: string;
};
