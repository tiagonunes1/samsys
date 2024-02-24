export interface ClientDTO {
    name: string;
    phoneNumber: string;
    birthDate: string | null;
    isActive: boolean;
    concurrencyToken: string;
}