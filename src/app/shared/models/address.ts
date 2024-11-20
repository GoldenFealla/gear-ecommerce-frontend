export type Address = {
    id: string;
    street: string;
    region: string;
    city: string;
    postal: string;
    country: string;
    user_id: string;
};

export type AddAddressForm = {
    street: string;
    region: string;
    city: string;
    postal: string;
    country: string;
    user_id: string;
};

export type UpdateAddressForm = {
    street: string;
    region: string;
    city: string;
    postal: string;
    country: string;
};
