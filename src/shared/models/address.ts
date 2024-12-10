export type Address = {
    id: string;
    address: string;
    country: string;
    user_id: string;
};

export type AddAddressForm = {
    address: string;
    country: string;
    user_id: string;
};

export type UpdateAddressForm = {
    address: string;
    country: string;
};
