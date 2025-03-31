import { SendSMSResponse, BrandNameResponse, BrandName, BalanceResponse, UbillAPIOptions, SendSMSRequest } from "./types";
export declare class UbillAPI {
    private client;
    private apiKey;
    constructor(options: UbillAPIOptions);
    sendSMS(request: SendSMSRequest): Promise<SendSMSResponse>;
    getAllBrandNames(): Promise<BrandNameResponse>;
    getBrandName(id: string): Promise<BrandName | null>;
    getBalance(): Promise<BalanceResponse>;
    private handleError;
}
