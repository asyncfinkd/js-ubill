export interface SendSMSResponse {
    statusID: number;
    smsID: number;
    message: string;
}
export interface BrandName {
    id: string;
    name: string;
    authorized: string;
    createdAt: string;
}
export interface BrandNameResponse {
    statusID: number;
    brands: BrandName[];
}
export interface BalanceResponse {
    statusID: number;
    sms: number;
}
export interface UbillAPIOptions {
    apiKey: string;
    baseUrl?: string;
}
export interface SendSMSRequest {
    brandID: number;
    numbers: number[];
    text: string;
    stopList?: boolean;
}
