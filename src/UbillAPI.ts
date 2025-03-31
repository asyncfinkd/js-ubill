import axios, { AxiosInstance } from "axios";
import {
  SendSMSResponse,
  BrandNameResponse,
  BrandName,
  BalanceResponse,
  UbillAPIOptions,
} from "./types";

export class UbillAPI {
  private client: AxiosInstance;
  private apiKey: string;

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

  async sendSMS(
    brandID: number,
    numbers: number[],
    text: string,
    stopList: boolean = false
  ): Promise<SendSMSResponse> {
    try {
      const response = await this.client.post<SendSMSResponse>("/sms/send", {
        brandID,
        numbers,
        text,
        stopList,
      });

      return response.data;
    } catch (error) {
      this.handleError("Error sending SMS", error);
    }
  }

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

  async getBalance(): Promise<BalanceResponse> {
    try {
      const { data } = await this.client.get<BalanceResponse>("/sms/balance");
      return data;
    } catch (error) {
      this.handleError("Error getting balance", error);
    }
  }

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
