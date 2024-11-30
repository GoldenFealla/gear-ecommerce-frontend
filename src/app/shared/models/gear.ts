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

export type ListGearFilter = {
    page: number;
    limit: number;
    category: string;
    brand: string | undefined;
    variety: string | undefined;
    start_price: number | undefined;
    end_price: number | undefined;
    sort: 'asc' | 'desc' | undefined;
};

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
