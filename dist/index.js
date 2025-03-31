"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  UbillAPI: () => UbillAPI
});
module.exports = __toCommonJS(index_exports);

// src/UbillAPI.ts
var import_axios = __toESM(require("axios"));
var UbillAPI = class {
  /**
   * Creates a new Ubill API client
   * @param options - Configuration options for the API client
   * @param options.apiKey - Your Ubill API key
   * @param options.baseUrl - Optional custom API base URL (defaults to "https://api.ubill.dev/v1")
   */
  constructor(options) {
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
    this.sendSMS = async (request) => await this.request(
      () => this.client.post("/sms/send", request),
      "Error sending SMS"
    );
    /**
     * Retrieves the current account balance
     * @returns Promise resolving to the balance response
     * @throws Error if the API request fails
     */
    this.getBalance = async () => await this.request(
      () => this.client.get("/sms/balance"),
      "Error getting balance"
    );
    this.apiKey = options.apiKey;
    this.client = import_axios.default.create({
      baseURL: options.baseUrl || "https://api.ubill.dev/v1",
      headers: {
        "Content-Type": "application/json"
      }
    });
    this.client.interceptors.request.use((config) => {
      config.headers.key = this.apiKey;
      return config;
    });
  }
  /**
   * Retrieves all available brand names
   * @returns Promise resolving to the brand names response
   * @throws Error if the API request fails
   */
  async getAllBrandNames() {
    return await this.request(
      () => this.client.get("/sms/brandNames"),
      "Error getting all brand names"
    );
  }
  /**
   * Retrieves a specific brand name by ID
   * @param id - The ID of the brand to retrieve
   * @returns Promise resolving to the brand name or null if not found
   * @throws Error if the API request fails
   */
  async getBrandName(id) {
    const response = await this.request(
      () => this.client.get("/sms/brandNames"),
      "Error getting brand name"
    );
    const brand = response.brands.find((value) => value.id === id);
    return brand || null;
  }
  async request(action, errorMsg) {
    try {
      const response = await action();
      return response.data;
    } catch (error) {
      this.handleError(errorMsg, error);
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
    if (import_axios.default.isAxiosError(error)) {
      throw new Error(
        `${message}: ${((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || error.message}`
      );
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`${message}: ${String(error)}`);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UbillAPI
});
//# sourceMappingURL=index.js.map