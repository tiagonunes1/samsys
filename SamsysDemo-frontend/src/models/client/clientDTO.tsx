export interface ClientDTO {
    name: string;
    phoneNumber: string;
    DateBirth: string | null;
    isActive: boolean;
    concurrencyToken: string;
}