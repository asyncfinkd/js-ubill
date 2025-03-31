"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UbillAPI = void 0;
const axios_1 = __importDefault(require("axios"));
/**
 * Client for interacting with the Ubill API
 * Provides methods for sending SMS messages, retrieving brand names, and checking account balance
 */
class UbillAPI {
    /**
     * Creates a new Ubill API client
     * @param options - Configuration options for the API client
     * @param options.apiKey - Your Ubill API key
     * @param options.baseUrl - Optional custom API base URL (defaults to "https://api.ubill.dev/v1")
     */
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
    /**
     * Sends an SMS message to one or more recipients
     * @param request - The SMS request details
     * @param request.brandID - The ID of the brand to use as sender
     * @param request.numbers - Array of recipient phone numbers
     * @param request.text - The message content to send
     * @param request.stopList - Optional flag to check numbers against stop list
     * @returns Promise resolving to the API response
     * @throws Error if the API request fails
     */
    async sendSMS(request) {
        try {
            const response = await this.client.post("/sms/send", request);
            return response.data;
        }
        catch (error) {
            this.handleError("Error sending SMS", error);
        }
    }
    /**
     * Retrieves all available brand names
     * @returns Promise resolving to the brand names response
     * @throws Error if the API request fails
     */
    async getAllBrandNames() {
        try {
            const response = await this.client.get("/sms/brandNames");
            return response.data;
        }
        catch (error) {
            this.handleError("Error getting all brand names", error);
        }
    }
    /**
     * Retrieves a specific brand name by ID
     * @param id - The ID of the brand to retrieve
     * @returns Promise resolving to the brand name or null if not found
     * @throws Error if the API request fails
     */
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
    /**
     * Retrieves the current account balance
     * @returns Promise resolving to the balance response
     * @throws Error if the API request fails
     */
    async getBalance() {
        try {
            const { data } = await this.client.get("/sms/balance");
            return data;
        }
        catch (error) {
            this.handleError("Error getting balance", error);
        }
    }
    /**
     * Handles and transforms errors from API requests
     * @param message - The error message prefix
     * @param error - The error object
     * @throws Formatted error with details
     */
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
//# sourceMappingURL=UbillAPI.js.map