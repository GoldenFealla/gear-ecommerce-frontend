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
    'Mainboard',
    'CPU',
    'GPU',
    'PSU',
    'RAM',
    'Fan',
    'Storage',
    'Monitor',
] as const;

export const GearTypeMapper: Record<string, GearType> = {
    PERSONAL_COMPUTER: 'PC',
    LAPTOP: 'Laptop',
    MAINBOARD: 'Mainboard',
    CENTRAL_PROCESSING_UNIT: 'CPU',
    GRAPHICS_PROCESSING_UNIT: 'GPU',
    POWER_SUPPLY_UNIT: 'PSU',
    RANDOM_ACCESS_MEMORY: 'RAM',
    FAN: 'Fan',
    STORAGE: 'Storage',
    MONITOR: 'Monitor',
};

export type GearType = (typeof GearTypeList)[number];
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

export type UpdateGearForm = {
    name: string;
    type: GearType;
    brand: string;
    variety: string;
    price: number;
    discount: number;
    quantity: number;
    image_base64?: string;
};
