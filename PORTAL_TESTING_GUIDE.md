# Portal Testing Guide

This guide explains how to use the enhanced environment configuration with multiple portal support for comprehensive testing of the Anyday payment system.

## Overview

Each environment now supports multiple portals:
- **API Portal**: Backend API services
- **Admin Portal**: Administrative dashboard
- **Shopper Portal**: Customer-facing payment interface
- **Merchant Portal**: Merchant management dashboard

## Environment Structure

Each environment is configured with multiple portal URLs:

```javascript
local: {
  baseUrl: "https://localhost:56747",
  version: "v1", 
  description: "Local Development Environment (Default)",
  portals: {
    api: "https://localhost:56747",
    admin: "https://localhost:56748", 
    shopper: "https://localhost:56749",
    merchant: "https://localhost:56750"
  }
}
```

## Available Environments

### Standard Environments
- `qa1` through `qa10` - QA environments
- `dev` - Development environment  
- `sandbox` - Sandbox environment
- `local` - Local development environment

### AWS Variants
- `qa1-aws`, `qa3-aws`, `qa4-aws` - AWS-specific deployments

## CLI Commands

### List Environments with Portals
```bash
node cli.js list-envs
```
Shows all environments with their portal URLs.

### List Portals for Specific Environment
```bash
node cli.js list-portals local
```

### List All Environment-Portal Combinations
```bash
node cli.js list-combinations
```

### Updated Test Scenarios
```bash
node cli.js list-scenarios
```
Shows test scenarios with portal requirements.

## Using Portals in Tests

### Basic Portal Access
```javascript
const { getPortalUrl, getAllPortals } = require("./config");

// Get specific portal URL
const adminUrl = getPortalUrl("admin");
const shopperUrl = getPortalUrl("shopper");

// Get all portals for current environment
const portals = getAllPortals();
```

### Environment Variables

#### TEST_ENV
Set the environment to test against:
```bash
TEST_ENV=local npm test
TEST_ENV=dev npm test
```

#### TEST_PORTAL  
Set the default portal type:
```bash
TEST_PORTAL=admin npm test
TEST_PORTAL=shopper npm test
```

### Cross-Portal Testing Example

```javascript
describe("Payment Flow Across Portals", function() {
  it("should process payment across multiple portals", async function() {
    // 1. Create order via API
    const apiUrl = getPortalUrl("api");
    const order = await request(apiUrl)
      .post("/api/v1/orders")
      .send(orderData);

    // 2. Process payment via Shopper portal  
    const shopperUrl = getPortalUrl("shopper");
    const payment = await request(shopperUrl)
      .post("/payment/process")
      .send(paymentData);

    // 3. Verify via Merchant portal
    const merchantUrl = getPortalUrl("merchant");
    const transaction = await request(merchantUrl)
      .get(`/transactions/${order.id}`)
      .expect(200);
  });
});
```

## Portal-Specific Test Scenarios

### API Portal Tests
- Payment processing endpoints
- Order management APIs
- Authentication services
- Internal system APIs

### Admin Portal Tests  
- User management
- System configuration
- Audit logs and monitoring
- Reports and analytics

### Shopper Portal Tests
- Payment flows
- Account management  
- Transaction history
- Payment method setup

### Merchant Portal Tests
- Order management
- Refund processing
- Settlement reports
- Integration settings

## Configuration Examples

### Switch Environment and Portal
```javascript
// Set environment
process.env.TEST_ENV = "qa7";

// Set portal
process.env.TEST_PORTAL = "admin";

// Get portal URL
const url = getPortalUrl("admin"); // Uses current environment
```

### Test Multiple Environments
```javascript
const environments = ["local", "qa7", "dev"];

environments.forEach(env => {
  describe(`Testing ${env}`, function() {
    before(function() {
      process.env.TEST_ENV = env;
    });
    
    it("should access all portals", function() {
      const portals = getAllPortals();
      Object.entries(portals).forEach(([type, url]) => {
        console.log(`${type}: ${url}`);
      });
    });
  });
});
```

## Portal URL Patterns

### QA Environments
- API: `https://anyday-{env}.yadyna.xyz`
- Admin: `https://admin-{env}.yadyna.xyz`
- Shopper: `https://shopper-{env}.yadyna.xyz`
- Merchant: `https://merchant-{env}.yadyna.xyz`

### AWS Variants
- API: `https://anyday-{env}.yadyna.xyz`
- Admin: `https://admin-{env}-aws.yadyna.xyz`
- Shopper: `https://shopper-{env}-aws.yadyna.xyz`
- Merchant: `https://merchant-{env}-aws.yadyna.xyz`

### Local Development
- API: `https://localhost:56747`
- Admin: `https://localhost:56748`
- Shopper: `https://localhost:56749`
- Merchant: `https://localhost:56750`

## Best Practices

1. **Environment Isolation**: Always specify the target environment
2. **Portal Separation**: Test each portal's functionality independently
3. **Cross-Portal Flows**: Test complete user journeys across portals
4. **Error Handling**: Account for portal-specific error responses
5. **Authentication**: Manage tokens per portal type

## Migration from Single URL

Existing tests will continue to work with `env.baseUrl`. For portal-specific testing, update to use:

```javascript
// Old way
const url = env.baseUrl;

// New way - specific portal
const apiUrl = getPortalUrl("api");
const adminUrl = getPortalUrl("admin");
```

## Examples

See `portal-example.test.js` for complete examples of:
- Portal discovery and listing
- Cross-portal payment flows
- Environment switching
- Portal-specific test scenarios