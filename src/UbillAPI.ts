import axios, { AxiosInstance } from "axios";
import {
  SendSMSResponse,
  BrandNameResponse,
  BrandName,
  BalanceResponse,
  UbillAPIOptions,
  SendSMSRequest,
} from "./types";

/**
 * Client for interacting with the Ubill API
 * Provides methods for sending SMS messages, retrieving brand names, and checking account balance
 */
export class UbillAPI {
  private client: AxiosInstance;
  private apiKey: string;

  /**
   * Creates a new Ubill API client
   * @param options - Configuration options for the API client
   * @param options.apiKey - Your Ubill API key
   * @param options.baseUrl - Optional custom API base URL (defaults to "https://api.ubill.dev/v1")
   */
  constructor(options: UbillAPIOptions) {
    this.apiKey = options.apiKey;

    this.client = axios.create({
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
  async sendSMS(request: SendSMSRequest): Promise<SendSMSResponse> {
    try {
      const response = await this.client.post<SendSMSResponse>(
        "/sms/send",
        request
      );

      return response.data;
    } catch (error) {
      this.handleError("Error sending SMS", error);
    }
  }

  /**
   * Retrieves all available brand names
   * @returns Promise resolving to the brand names response
   * @throws Error if the API request fails
   */
  async getAllBrandNames(): Promise<BrandNameResponse> {
    try {
      const response = await this.client.get<BrandNameResponse>(
        "/sms/brandNames"
      );
      return response.data;
    } catch (error) {
      this.handleError("Error getting all brand names", error);
    }
  }

  /**
   * Retrieves a specific brand name by ID
   * @param id - The ID of the brand to retrieve
   * @returns Promise resolving to the brand name or null if not found
   * @throws Error if the API request fails
   */
  async getBrandName(id: string): Promise<BrandName | null> {
    try {
      const { data } = await this.client.get<BrandNameResponse>(
        "/sms/brandNames"
      );
      const brand = data.brands.find((value) => value.id === id);
      return brand || null;
    } catch (error) {
      this.handleError("Error getting brand name", error);
    }
  }

  /**
   * Retrieves the current account balance
   * @returns Promise resolving to the balance response
   * @throws Error if the API request fails
   */
  async getBalance(): Promise<BalanceResponse> {
    try {
      const { data } = await this.client.get<BalanceResponse>("/sms/balance");
      return data;
    } catch (error) {
      this.handleError("Error getting balance", error);
    }
  }

  /**
   * Handles and transforms errors from API requests
   * @param message - The error message prefix
   * @param error - The error object
   * @throws Formatted error with details
   */
  private handleError(message: string, error: unknown): never {
    console.error(message, error);

    if (axios.isAxiosError(error)) {
      throw new Error(
        `${message}: ${error.response?.data?.message || error.message}`
      );
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(`${message}: ${String(error)}`);
  }
}
