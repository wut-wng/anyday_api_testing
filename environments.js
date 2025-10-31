/**
 * Environment Configuration File
 * Maps Postman environments to Node.js configuration
 * 
 * Last Updated: October 31, 2025
 * Updated based on: Postman/Anyday.postman_collection_v2.1.json
 * 
 * This file is automatically synchronized with the Postman collection files:
 * - Environment URLs from *.postman_environment.json files
 * - Card types from collection variables
 * - Global settings from Anyday.postman_globals.json
 */

const environments = {
  qa1: {
    baseUrl: "https://anyday-qa1.yadyna.xyz",
    version: "v1",
    description: "QA Environment 1",
    portals: {
      api: "https://anyday-qa1.yadyna.xyz",
      admin: "https://admin-qa1.yadyna.xyz",
      shopper: "https://shopper-qa1.yadyna.xyz",
      merchant: "https://merchant-qa1.yadyna.xyz"
    }
  },
  "qa1-aws": {
    baseUrl: "https://anyday-qa1.yadyna.xyz",
    version: "v1", 
    description: "QA Environment 1 - AWS",
    portals: {
      api: "https://anyday-qa1.yadyna.xyz",
      admin: "https://admin-qa1-aws.yadyna.xyz",
      shopper: "https://shopper-qa1-aws.yadyna.xyz",
      merchant: "https://merchant-qa1-aws.yadyna.xyz"
    }
  },
  qa2: {
    baseUrl: "https://anyday-qa2.yadyna.xyz",
    version: "v1",
    description: "QA Environment 2",
    portals: {
      api: "https://anyday-qa2.yadyna.xyz",
      admin: "https://admin-qa2.yadyna.xyz",
      shopper: "https://shopper-qa2.yadyna.xyz",
      merchant: "https://merchant-qa2.yadyna.xyz"
    }
  },
  qa3: {
    baseUrl: "https://anyday-qa3.yadyna.xyz",
    version: "v1",
    description: "QA Environment 3",
    portals: {
      api: "https://anyday-qa3.yadyna.xyz",
      admin: "https://admin-qa3.yadyna.xyz",
      shopper: "https://shopper-qa3.yadyna.xyz",
      merchant: "https://merchant-qa3.yadyna.xyz"
    }
  },
  "qa3-aws": {
    baseUrl: "https://anyday-qa3.yadyna.xyz",
    version: "v1",
    description: "QA Environment 3 - AWS",
    portals: {
      api: "https://anyday-qa3.yadyna.xyz",
      admin: "https://admin-qa3-aws.yadyna.xyz",
      shopper: "https://shopper-qa3-aws.yadyna.xyz",
      merchant: "https://merchant-qa3-aws.yadyna.xyz"
    }
  },
  qa4: {
    baseUrl: "https://anyday-qa4.yadyna.xyz",
    version: "v1",
    description: "QA Environment 4",
    portals: {
      api: "https://anyday-qa4.yadyna.xyz",
      admin: "https://admin-qa4.yadyna.xyz",
      shopper: "https://shopper-qa4.yadyna.xyz",
      merchant: "https://merchant-qa4.yadyna.xyz"
    }
  },
  "qa4-aws": {
    baseUrl: "https://anyday-qa4.yadyna.xyz",
    version: "v1",
    description: "QA Environment 4 - AWS",
    portals: {
      api: "https://anyday-qa4.yadyna.xyz",
      admin: "https://admin-qa4-aws.yadyna.xyz",
      shopper: "https://shopper-qa4-aws.yadyna.xyz",
      merchant: "https://merchant-qa4-aws.yadyna.xyz"
    }
  },
  qa5: {
    baseUrl: "https://anyday-qa5.yadyna.xyz",
    version: "v1",
    description: "QA Environment 5 (Default)",
    portals: {
      api: "https://anyday-qa5.yadyna.xyz",
      admin: "https://admin-qa5.yadyna.xyz",
      shopper: "https://shopper-qa5.yadyna.xyz",
      merchant: "https://merchant-qa5.yadyna.xyz"
    }
  },
  qa6: {
    baseUrl: "https://anyday-qa6.yadyna.xyz",
    version: "v1",
    description: "QA Environment 6",
    portals: {
      api: "https://anyday-qa6.yadyna.xyz",
      admin: "https://admin-qa6.yadyna.xyz",
      shopper: "https://shopper-qa6.yadyna.xyz",
      merchant: "https://merchant-qa6.yadyna.xyz"
    }
  },
  qa7: {
    baseUrl: "https://anyday-qa7.yadyna.xyz",
    version: "v1",
    description: "QA Environment 7",
    portals: {
      api: "https://anyday-qa7.yadyna.xyz",
      admin: "https://admin-qa7.yadyna.xyz",
      shopper: "https://shopper-qa7.yadyna.xyz",
      merchant: "https://merchant-qa7.yadyna.xyz"
    }
  },
  qa8: {
    baseUrl: "https://anyday-qa8.yadyna.xyz",
    version: "v1",
    description: "QA Environment 8",
    portals: {
      api: "https://anyday-qa8.yadyna.xyz",
      admin: "https://admin-qa8.yadyna.xyz",
      shopper: "https://shopper-qa8.yadyna.xyz",
      merchant: "https://merchant-qa8.yadyna.xyz"
    }
  },
  qa9: {
    baseUrl: "https://anyday-qa9.yadyna.xyz",
    version: "v1",
    description: "QA Environment 9",
    portals: {
      api: "https://anyday-qa9.yadyna.xyz",
      admin: "https://admin-qa9.yadyna.xyz",
      shopper: "https://shopper-qa9.yadyna.xyz",
      merchant: "https://merchant-qa9.yadyna.xyz"
    }
  },
  qa10: {
    baseUrl: "https://anyday-qa10.yadyna.xyz",
    version: "v1",
    description: "QA Environment 10",
    portals: {
      api: "https://anyday-qa10.yadyna.xyz",
      admin: "https://admin-qa10.yadyna.xyz",
      shopper: "https://shopper-qa10.yadyna.xyz",
      merchant: "https://merchant-qa10.yadyna.xyz"
    }
  },
  dev: {
    baseUrl: "https://anyday-accpetance.yadyna.xyz",
    version: "v1",
    description: "Development Environment",
    portals: {
      api: "https://anyday-accpetance.yadyna.xyz",
      admin: "https://admin-accpetance.yadyna.xyz",
      shopper: "https://shopper-accpetance.yadyna.xyz",
      merchant: "https://merchant-accpetance.yadyna.xyz"
    }
  },
  sandbox: {
    baseUrl: "https://anyday-accpetance.yadyna.xyz",
    version: "v1",
    description: "Sandbox Environment",
    portals: {
      api: "https://anyday-accpetance.yadyna.xyz",
      admin: "https://admin-sandbox.yadyna.xyz",
      shopper: "https://shopper-sandbox.yadyna.xyz",
      merchant: "https://merchant-sandbox.yadyna.xyz"
    }
  },
  local: {
    baseUrl: "https://localhost:56747",
    version: "v1",
    description: "Local Development Environment",
    portals: {
      api: "https://localhost:56747",
      admin: "https://localhost:56748",
      shopper: "https://localhost:56749",
      merchant: "https://localhost:56750"
    }
  },
};

/**
 * Global variables (from Postman globals.json and collection variables)
 * These are consistent across all environments
 */
const globals = {
  adminUsername: "superadmin@manaotest.com",
  
  // API path templates (from Postman globals)
  internalPath: "/api/{{version}}/internal",
  publicPath: "/api/{{version}}",
  publicPaymentsPath: "/api/{{version}}/orders",
};

/**
 * Card types for testing different payment scenarios
 * Based on collection variables from Postman collection
 */
const cardTypes = {
  approved: {
    id: "270387731",
    name: "Approved Card",
    description: "Standard approved payments",
    expectedBehavior: "All operations succeed",
  },
  captureRejected: {
    id: "237940496", 
    name: "Capture Rejected Card",
    description: "Payment fails during capture",
    expectedBehavior: "Authorization succeeds, capture fails",
  },
  refundRejected: {
    id: "237940734",
    name: "Refund Rejected Card", 
    description: "Payment fails during refund",
    expectedBehavior: "Authorization and capture succeed, refund fails",
  },
  cancelRejected: {
    id: "237940762",
    name: "Cancel Rejected Card",
    description: "Payment fails during cancel", 
    expectedBehavior: "Authorization succeeds, cancel fails",
  },
  recurringRejected: {
    id: "237940873",
    name: "Recurring Rejected Card",
    description: "Recurring payments fail",
    expectedBehavior: "Initial payment may succeed, recurring payments fail",
  },
  threeDSecureRequired: {
    id: "237940883", 
    name: "3D Secure Required Card",
    description: "Requires 3D Secure authentication",
    expectedBehavior: "Requires additional authentication step",
  },
  authorizeOnce: {
    id: "237940958",
    name: "Authorize Once Card", 
    description: "Single authorization only",
    expectedBehavior: "Only one authorization allowed",
  },
  delayed60s: {
    id: "237940976",
    name: "Delayed Processing Card",
    description: "60-second processing delay", 
    expectedBehavior: "Introduces 60-second delay in processing",
  },
};

/**
 * Test scenarios for different card types and portal combinations
 * Based on the card types available in the Postman collection
 */
const testScenarios = {
  basicPayment: {
    name: "Basic Payment Flow",
    description: "Standard approved payment flow",
    cardId: cardTypes.approved.id,
    cardType: "approved",
    amount: 300,
    expectedFlow: ["checkout", "authorize", "capture"],
    portals: ["api", "shopper"]
  },
  captureFailure: {
    name: "Capture Failure",
    description: "Payment that fails during capture",
    cardId: cardTypes.captureRejected.id,
    cardType: "captureRejected", 
    amount: 300,
    expectedFlow: ["checkout", "authorize", "capture_fail"],
    portals: ["api", "shopper"]
  },
  refundFailure: {
    name: "Refund Failure",
    description: "Payment that fails during refund",
    cardId: cardTypes.refundRejected.id,
    cardType: "refundRejected",
    amount: 300,
    expectedFlow: ["checkout", "authorize", "capture", "refund_fail"],
    portals: ["api", "merchant"]
  },
  cancelFailure: {
    name: "Cancel Failure",
    description: "Payment that fails during cancel",
    cardId: cardTypes.cancelRejected.id,
    cardType: "cancelRejected",
    amount: 300,
    expectedFlow: ["checkout", "authorize", "cancel_fail"],
    portals: ["api", "merchant"]
  },
  threeDSecure: {
    name: "3D Secure Required",
    description: "Payment requiring 3D Secure authentication",
    cardId: cardTypes.threeDSecureRequired.id,
    cardType: "threeDSecureRequired",
    amount: 300,
    expectedFlow: ["checkout", "authorize_3ds", "capture"],
    portals: ["api", "shopper"]
  },
  recurringFailure: {
    name: "Recurring Payment Failure",
    description: "Recurring payment that fails",
    cardId: cardTypes.recurringRejected.id,
    cardType: "recurringRejected", 
    amount: 300,
    expectedFlow: ["checkout", "authorize", "capture", "recurring_fail"],
    portals: ["api", "merchant"]
  },
  singleAuthorization: {
    name: "Single Authorization Only",
    description: "Card that allows only one authorization",
    cardId: cardTypes.authorizeOnce.id,
    cardType: "authorizeOnce",
    amount: 300, 
    expectedFlow: ["checkout", "authorize", "authorize_fail_second"],
    portals: ["api", "shopper"]
  },
  delayedPayment: {
    name: "Delayed Payment",
    description: "Payment with simulated processing delay",
    cardId: cardTypes.delayed60s.id,
    cardType: "delayed60s",
    amount: 300,
    expectedFlow: ["checkout", "authorize_delayed", "capture"],
    timeout: 90000, // 90 seconds to account for 60s delay
    portals: ["api", "shopper"]
  },
  adminTesting: {
    name: "Admin Portal Testing",
    description: "Admin dashboard and management functions",
    cardId: cardTypes.approved.id,
    cardType: "approved",
    amount: 300,
    expectedFlow: ["admin_login", "view_transactions", "manage_merchants"],
    portals: ["admin"]
  },
  merchantDashboard: {
    name: "Merchant Dashboard Testing", 
    description: "Merchant portal functionality testing",
    cardId: cardTypes.approved.id,
    cardType: "approved",
    amount: 300,
    expectedFlow: ["merchant_login", "view_orders", "process_refunds"],
    portals: ["merchant"]
  },
};

module.exports = {
  environments,
  globals,
  cardTypes,
  testScenarios,

  // Helper functions
  getEnvironment: (envName = "local") => {
    const env = environments[envName];
    if (!env) {
      throw new Error(
        `Environment '${envName}' not found. Available: ${Object.keys(
          environments
        ).join(", ")}`
      );
    }
    return env;
  },

  getPortalUrl: (envName = "local", portalType = "api") => {
    const env = environments[envName];
    if (!env) {
      throw new Error(
        `Environment '${envName}' not found. Available: ${Object.keys(
          environments
        ).join(", ")}`
      );
    }
    
    const portal = env.portals[portalType];
    if (!portal) {
      throw new Error(
        `Portal '${portalType}' not found for environment '${envName}'. Available: ${Object.keys(
          env.portals
        ).join(", ")}`
      );
    }
    
    return portal;
  },

  getAllPortals: (envName = "local") => {
    const env = environments[envName];
    if (!env) {
      throw new Error(
        `Environment '${envName}' not found. Available: ${Object.keys(
          environments
        ).join(", ")}`
      );
    }
    return env.portals;
  },

  getCardType: (cardName) => {
    const card = cardTypes[cardName];
    if (!card) {
      throw new Error(
        `Card type '${cardName}' not found. Available: ${Object.keys(
          cardTypes
        ).join(", ")}`
      );
    }
    return card;
  },

  getTestScenario: (scenarioName) => {
    const scenario = testScenarios[scenarioName];
    if (!scenario) {
      throw new Error(
        `Test scenario '${scenarioName}' not found. Available: ${Object.keys(
          testScenarios
        ).join(", ")}`
      );
    }
    return scenario;
  },

  listEnvironments: () => {
    console.log("\n=== AVAILABLE ENVIRONMENTS ===");
    Object.entries(environments).forEach(([key, env]) => {
      console.log(`${key.padEnd(12)} - ${env.description}`);
      console.log(`${" ".repeat(15)}API: ${env.portals.api}`);
      console.log(`${" ".repeat(15)}Admin: ${env.portals.admin}`);
      console.log(`${" ".repeat(15)}Shopper: ${env.portals.shopper}`);
      console.log(`${" ".repeat(15)}Merchant: ${env.portals.merchant}`);
      console.log("");
    });
    console.log("==============================\n");
  },

  listPortals: (envName = null) => {
    if (envName) {
      const env = environments[envName];
      if (!env) {
        console.log(`Environment '${envName}' not found.`);
        return;
      }
      console.log(`\n=== PORTALS FOR ${envName.toUpperCase()} ===`);
      Object.entries(env.portals).forEach(([portalType, url]) => {
        console.log(`${portalType.padEnd(10)} - ${url}`);
      });
      console.log("==============================\n");
    } else {
      console.log("\n=== ALL PORTALS ===");
      Object.entries(environments).forEach(([envKey, env]) => {
        console.log(`${envKey}:`);
        Object.entries(env.portals).forEach(([portalType, url]) => {
          console.log(`  ${portalType.padEnd(8)} - ${url}`);
        });
        console.log("");
      });
      console.log("==================\n");
    }
  },

  listCardTypes: () => {
    console.log("\n=== AVAILABLE CARD TYPES ===");
    console.log("Card Type".padEnd(20) + " | " + "Card ID".padEnd(12) + " | Description");
    console.log("-".repeat(70));
    Object.entries(cardTypes).forEach(([name, card]) => {
      console.log(`${name.padEnd(20)} | ${card.id.padEnd(12)} | ${card.description}`);
    });
    console.log("============================\n");
  },

  listTestScenarios: () => {
    console.log("\n=== TEST SCENARIOS ===");
    Object.entries(testScenarios).forEach(([key, scenario]) => {
      console.log(`${scenario.name}`);
      console.log(`  Description: ${scenario.description}`);
      console.log(`  Card ID: ${scenario.cardId} (${scenario.cardType})`);
      console.log(`  Amount: $${scenario.amount}`);
      console.log(`  Flow: ${scenario.expectedFlow.join(" → ")}`);
      console.log(`  Portals: ${scenario.portals.join(", ")}`);
      if (scenario.timeout) {
        console.log(`  Timeout: ${scenario.timeout}ms`);
      }
      console.log("");
    });
    console.log("=====================\n");
  },

  // Utility function to get card ID by name (for backward compatibility)
  getCardId: (cardName) => {
    const card = cardTypes[cardName];
    return card ? card.id : null;
  },

  // Get all card IDs as a simple object (for backward compatibility)
  getAllCardIds: () => {
    const cardIds = {};
    Object.entries(cardTypes).forEach(([name, card]) => {
      cardIds[name] = card.id;
    });
    return cardIds;
  },

  // Portal testing utilities
  createPortalTestUrl: (envName, portalType, path = "") => {
    const portalUrl = module.exports.getPortalUrl(envName, portalType);
    return `${portalUrl}${path}`;
  },

  // Get environment and portal combinations for comprehensive testing
  getAllEnvPortalCombinations: () => {
    const combinations = [];
    Object.entries(environments).forEach(([envName, env]) => {
      Object.keys(env.portals).forEach(portalType => {
        combinations.push({
          environment: envName,
          portal: portalType,
          url: env.portals[portalType],
          description: `${env.description} - ${portalType} portal`
        });
      });
    });
    return combinations;
  },
};
