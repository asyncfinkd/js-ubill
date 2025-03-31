js-ubill

A JavaScript/TypeScript client for the Ubill API that simplifies SMS messaging operations.

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) [![npm version](https://img.shields.io/npm/v/js-ubill.svg?style=flat)](https://www.npmjs.com/package/js-ubill)

## Installation

```bash
npm install js-ubill
```

## Features:

- Send SMS messages through the Ubill API
- Retrieve brand names
- Check account balance
- TypeScript support with full type definitions

## Usage

### Initialize the client

```typescript
import { UbillAPI } from "js-ubill";

const ubill = new UbillAPI({
  apiKey: "your-api-key",
  // Optional: override the default base URL
  // baseUrl: 'https://custom-api-endpoint.com/v1'
});
```

### Send SMS

```typescript
async function sendMessage() {
  try {
    const response = await ubill.sendSMS({
      brandID: 1,
      numbers: [99555555555, 995555444111],
      message: "Hello from Ubill!",
      stopList: false, // optional: stopList flag
    });

    console.log("Message sent:", response);
  } catch (error) {
    console.error("Failed to send message:", error);
  }
}
```

### Get all brand names

```typescript
async function getBrands() {
  try {
    const response = await ubill.getAllBrandNames();
    console.log("Available brands:", response.brands);
  } catch (error) {
    console.error("Failed to get brands:", error);
  }
}
```

### Get a specific brand name

```typescript
async function getBrand(brandId) {
  try {
    const brand = await ubill.getBrandName(brandId);
    if (brand) {
      console.log("Brand details:", brand);
    } else {
      console.log("Brand not found");
    }
  } catch (error) {
    console.error("Failed to get brand:", error);
  }
}
```

### Check account balance

```typescript
async function checkBalance() {
  try {
    const balance = await ubill.getBalance();
    console.log("Current SMS balance:", balance.sms);
  } catch (error) {
    console.error("Failed to get balance:", error);
  }
}
```

## API Reference

### Constructor

```typescript
new UbillAPI(options: UbillAPIOptions)
```

- options.apiKey (required): Your Ubill API key
- options.baseUrl (optional): Custom API base URL (defaults to "https://api.ubill.dev/v1")

### Methods

##### sendSMS

```typescript
sendSMS(request: SendSMSRequest): Promise<SendSMSResponse>
```

Sends an SMS message to one or more recipients.

##### getAllBrandNames

```typescript
getAllBrandNames(): Promise<BrandNameResponse>
```

Retrieves all available brand names.

##### getBrandName

```typescript
getBrandName(id: string): Promise<BrandName | null>
```

Retrieves a specific brand name by ID.

##### getBalance

```typescript
getBalance(): Promise<BalanceResponse>
```

Retrieves the current account balance.
