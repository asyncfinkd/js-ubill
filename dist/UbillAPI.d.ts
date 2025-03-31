import { SendSMSResponse, BrandNameResponse, BrandName, BalanceResponse, UbillAPIOptions } from "./types";
export declare class UbillAPI {
    private client;
    private apiKey;
    constructor(options: UbillAPIOptions);
    sendSMS(brandID: number, numbers: number[], text: string, stopList?: boolean): Promise<SendSMSResponse>;
    getAllBrandNames(): Promise<BrandNameResponse>;
    getBrandName(id: string): Promise<BrandName | null>;
    getBalance(): Promise<BalanceResponse>;
    private handleError;
}
