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
    price: number;
    discount: number;
    quantity: number;
    image_url: string;
};

export type AddGearForm = {
    name: string;
    type: GearType;
    brand: string;
    price: number;
    discount: number;
    quantity: number;
    image_base64: string;
};
