import { SendSMSResponse, BrandNameResponse, BrandName, BalanceResponse, UbillAPIOptions, SendSMSRequest } from "./types";
/**
 * Client for interacting with the Ubill API
 * Provides methods for sending SMS messages, retrieving brand names, and checking account balance
 */
export declare class UbillAPI {
    private client;
    private apiKey;
    /**
     * Creates a new Ubill API client
     * @param options - Configuration options for the API client
     * @param options.apiKey - Your Ubill API key
     * @param options.baseUrl - Optional custom API base URL (defaults to "https://api.ubill.dev/v1")
     */
    constructor(options: UbillAPIOptions);
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
    sendSMS: (request: SendSMSRequest) => Promise<SendSMSResponse>;
    /**
     * Retrieves all available brand names
     * @returns Promise resolving to the brand names response
     * @throws Error if the API request fails
     */
    getAllBrandNames(): Promise<BrandNameResponse>;
    /**
     * Retrieves a specific brand name by ID
     * @param id - The ID of the brand to retrieve
     * @returns Promise resolving to the brand name or null if not found
     * @throws Error if the API request fails
     */
    getBrandName(id: string): Promise<BrandName | null>;
    /**
     * Retrieves the current account balance
     * @returns Promise resolving to the balance response
     * @throws Error if the API request fails
     */
    getBalance: () => Promise<BalanceResponse>;
    private request;
    /**
     * Handles and transforms errors from API requests
     * @param message - The error message prefix
     * @param error - The error object
     * @throws Formatted error with details
     */
    private handleError;
}
