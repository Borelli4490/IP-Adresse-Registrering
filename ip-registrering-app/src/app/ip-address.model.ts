export interface IPAddress {
    id: number | null;
    ip: string;
    description: string | null;
    creator: string | null;
    creationTime: string | null;
}

export interface IPAddressCreate{
    ip: string;
    description: string | null;
    creator: string | null;
}