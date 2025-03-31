"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UbillAPI = void 0;
const axios_1 = __importDefault(require("axios"));
class UbillAPI {
    constructor(options) {
        this.apiKey = options.apiKey;
        this.client = axios_1.default.create({
            baseURL: options.baseUrl || "https://api.ubill.dev/v1",
            headers: {
                "Content-Type": "application/json",
            },
        });
        this.client.interceptors.request.use((config) => {
            config.headers.key = this.apiKey;
            return config;
        });
    }
    async sendSMS(request) {
        try {
            const response = await this.client.post("/sms/send", request);
            return response.data;
        }
        catch (error) {
            this.handleError("Error sending SMS", error);
        }
    }
    async getAllBrandNames() {
        try {
            const response = await this.client.get("/sms/brandNames");
            return response.data;
        }
        catch (error) {
            this.handleError("Error getting all brand names", error);
        }
    }
    async getBrandName(id) {
        try {
            const { data } = await this.client.get("/sms/brandNames");
            const brand = data.brands.find((value) => value.id === id);
            return brand || null;
        }
        catch (error) {
            this.handleError("Error getting brand name", error);
        }
    }
    async getBalance() {
        try {
            const { data } = await this.client.get("/sms/balance");
            return data;
        }
        catch (error) {
            this.handleError("Error getting balance", error);
        }
    }
    handleError(message, error) {
        var _a, _b;
        console.error(message, error);
        if (axios_1.default.isAxiosError(error)) {
            throw new Error(`${message}: ${((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error.message}`);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error(`${message}: ${String(error)}`);
    }
}
exports.UbillAPI = UbillAPI;
