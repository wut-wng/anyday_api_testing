/**
 * Environment Configuration File
 * Maps Postman environments to Node.js configuration
 * Based on Postman environment files in /Postman folder
 */

const environments = {
  qa1: {
    baseUrl: "https://anyday-qa1.yadyna.xyz",
    version: "v1",
    description: "QA Environment 1",
  },
  qa2: {
    baseUrl: "https://anyday-qa2.yadyna.xyz",
    version: "v1",
    description: "QA Environment 2",
  },
  qa3: {
    baseUrl: "https://anyday-qa3.yadyna.xyz",
    version: "v1",
    description: "QA Environment 3",
  },
  qa4: {
    baseUrl: "https://anyday-qa4.yadyna.xyz",
    version: "v1",
    description: "QA Environment 4",
  },
  qa5: {
    baseUrl: "https://anyday-qa5.yadyna.xyz",
    version: "v1",
    description: "QA Environment 5 (Default)",
  },
  qa6: {
    baseUrl: "https://anyday-qa6.yadyna.xyz",
    version: "v1",
    description: "QA Environment 6",
  },
  qa7: {
    baseUrl: "https://anyday-qa7.yadyna.xyz",
    version: "v1",
    description: "QA Environment 7",
  },
  qa8: {
    baseUrl: "https://anyday-qa8.yadyna.xyz",
    version: "v1",
    description: "QA Environment 8",
  },
  qa9: {
    baseUrl: "https://anyday-qa9.yadyna.xyz",
    version: "v1",
    description: "QA Environment 9",
  },
  qa10: {
    baseUrl: "https://anyday-qa10.yadyna.xyz",
    version: "v1",
    description: "QA Environment 10",
  },
  dev: {
    baseUrl: "https://anyday-dev.yadyna.xyz",
    version: "v1",
    description: "Development Environment",
  },
  local: {
    baseUrl: "http://localhost:3000",
    version: "v1",
    description: "Local Development Environment",
  },
};

/**
 * Global variables (from Postman globals.json)
 * These are consistent across all environments
 */
const globals = {
  adminUsername: "superadmin@manaotest.com",

  // Card IDs for different test scenarios
  cards: {
    approved: "270387731",
    captureRejected: "237940496",
    refundRejected: "237940734",
    cancelRejected: "237940762",
    recurringRejected: "237940873",
    threeDSecureRequired: "237940883",
    authorizeOnce: "237940958",
    delayed60s: "237940976",
  },
};

/**
 * Test scenarios for different card types
 */
const testScenarios = {
  basicPayment: {
    name: "Basic Payment Flow",
    description: "Standard approved payment flow",
    cardId: globals.cards.approved,
    amount: 300,
    expectedFlow: ["checkout", "authorize", "capture"],
  },
  captureFailure: {
    name: "Capture Failure",
    description: "Payment that fails during capture",
    cardId: globals.cards.captureRejected,
    amount: 300,
    expectedFlow: ["checkout", "authorize", "capture_fail"],
  },
  refundFailure: {
    name: "Refund Failure",
    description: "Payment that fails during refund",
    cardId: globals.cards.refundRejected,
    amount: 300,
    expectedFlow: ["checkout", "authorize", "capture", "refund_fail"],
  },
  threeDSecure: {
    name: "3D Secure Required",
    description: "Payment requiring 3D Secure authentication",
    cardId: globals.cards.threeDSecureRequired,
    amount: 300,
    expectedFlow: ["checkout", "authorize_3ds", "capture"],
  },
  delayedPayment: {
    name: "Delayed Payment",
    description: "Payment with simulated processing delay",
    cardId: globals.cards.delayed60s,
    amount: 300,
    expectedFlow: ["checkout", "authorize_delayed", "capture"],
  },
};

module.exports = {
  environments,
  globals,
  testScenarios,

  // Helper functions
  getEnvironment: (envName = "qa5") => {
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

  listEnvironments: () => {
    console.log("\n=== AVAILABLE ENVIRONMENTS ===");
    Object.entries(environments).forEach(([key, env]) => {
      console.log(`${key.padEnd(6)} - ${env.description} (${env.baseUrl})`);
    });
    console.log("==============================\n");
  },

  listCardTypes: () => {
    console.log("\n=== AVAILABLE CARD TYPES ===");
    Object.entries(globals.cards).forEach(([name, id]) => {
      console.log(`${name.padEnd(20)} - ${id}`);
    });
    console.log("============================\n");
  },

  listTestScenarios: () => {
    console.log("\n=== TEST SCENARIOS ===");
    Object.entries(testScenarios).forEach(([key, scenario]) => {
      console.log(`${scenario.name}`);
      console.log(`  Description: ${scenario.description}`);
      console.log(`  Card ID: ${scenario.cardId}`);
      console.log(`  Flow: ${scenario.expectedFlow.join(" → ")}`);
      console.log("");
    });
    console.log("=====================\n");
  },
};
