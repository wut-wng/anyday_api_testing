/**
 * Test Utilities - Replaces Postman's loadUtils functionality
 * Manages authentication tokens and test data for Anyday API testing
 */

class TestUtils {
  constructor() {
    this.tokens = {
      admin: null,
      merchant: null,
      debtor: null,
    };
    this.testData = {};
  }

  // Authentication Methods
  saveAdminToken(data) {
    console.log("✓ Saved admin token");
    this.tokens.admin = data;
    this.testData.adminUser = data.email;
    this.testData.currentAuth = "admin";
    return this;
  }

  saveMerchantToken(data) {
    console.log("✓ Saved merchant token");
    this.tokens.merchant = data;
    this.testData.merchantUser = data.email;
    this.testData.webShopId = data.webShopId;
    this.testData.apiKey = data.apiKey;
    this.testData.currentAuth = "merchant";
    return this;
  }

  saveDebtorToken(data) {
    console.log("✓ Saved debtor token");
    this.tokens.debtor = data;
    this.testData.debtorUser = data.email;
    this.testData.currentAuth = "debtor";
    return this;
  }

  useAdminToken() {
    console.log("Using admin token");
    if (!this.tokens.admin) {
      throw new Error("Admin token not available. Run admin login first.");
    }
    this.testData.currentToken = this.tokens.admin.auth.access_token;
    this.testData.currentUser = this.tokens.admin.email;
    this.testData.currentAuth = "admin";
    return this.getAuthHeader("admin");
  }

  useMerchantToken() {
    console.log("Using merchant token");
    if (!this.tokens.merchant) {
      throw new Error("Merchant token not available. Create merchant first.");
    }
    this.testData.currentToken = this.tokens.merchant.auth.access_token;
    this.testData.currentUser = this.tokens.merchant.email;
    this.testData.currentAuth = "merchant";
    return this.getAuthHeader("merchant");
  }

  useWebShopToken() {
    console.log("Using webshop API key");
    if (!this.tokens.merchant) {
      throw new Error("Merchant token not available. Create merchant first.");
    }
    this.testData.currentToken = this.tokens.merchant.apiKey;
    this.testData.currentUser = this.tokens.merchant.email;
    this.testData.currentAuth = "webshop";
    return `Bearer ${this.tokens.merchant.apiKey}`;
  }

  useDebtorToken() {
    console.log("Using debtor token");
    if (!this.tokens.debtor) {
      throw new Error("Debtor token not available. Create debtor first.");
    }
    this.testData.currentToken = this.tokens.debtor.auth.access_token;
    this.testData.currentUser = this.tokens.debtor.email;
    this.testData.currentAuth = "debtor";
    return this.getAuthHeader("debtor");
  }

  getAuthHeader(type) {
    const token = this.tokens[type];
    if (!token) {
      throw new Error(`${type} token not available`);
    }
    return `Bearer ${token.auth.access_token}`;
  }

  getWebShopAuthHeader() {
    if (!this.tokens.merchant || !this.tokens.merchant.apiKey) {
      throw new Error("Merchant API key not available");
    }
    return `Bearer ${this.tokens.merchant.apiKey}`;
  }

  // Data Management
  setTransactionId(transactionId) {
    this.testData.transactionId = transactionId;
    console.log(`Transaction ID set: ${transactionId}`);
  }

  getTransactionId() {
    if (!this.testData.transactionId) {
      throw new Error("Transaction ID not available. Create order first.");
    }
    return this.testData.transactionId;
  }

  // Verification Methods
  verifyVariable(name) {
    if (!this.testData[name]) {
      throw new Error(`No value for ${name} variable.`);
    }
    return this.testData[name];
  }

  verifyAdminToken() {
    if (!this.tokens.admin) {
      throw new Error("Admin authentication required. Run admin login first.");
    }
  }

  verifyMerchantToken() {
    if (!this.tokens.merchant) {
      throw new Error(
        "Merchant authentication required. Create merchant first."
      );
    }
  }

  verifyDebtorToken() {
    if (!this.tokens.debtor) {
      throw new Error("Debtor authentication required. Create debtor first.");
    }
  }

  // Random Data Generators (matching Postman's approach)
  generateCprNumber() {
    const prefix = "0102";
    const middle = Math.floor(Math.random() * (99 - 40 + 1)) + 40;
    const suffix = Math.floor(Math.random() * 9000) + 1000;
    return `${prefix}${middle}${suffix}`;
  }

  generatePhoneNumber() {
    const prefix = "+45";
    const number = Math.floor(Math.random() * 9000) + 1000;
    return `${prefix}${number}****`;
  }

  generatePostCode() {
    return (Math.floor(Math.random() * 9000) + 1000).toString();
  }

  generateOrderId() {
    return Math.floor(Math.random() * 9000000000) + 1000000000;
  }

  generateRandomEmail(type = "test") {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${type}_${timestamp}_${random}@${type}.manaotest.com`;
  }

  // Status and Info
  getCurrentUser() {
    return this.testData.currentUser || "No user authenticated";
  }

  getCurrentAuth() {
    return this.testData.currentAuth || "No authentication";
  }

  getStatus() {
    return {
      currentUser: this.getCurrentUser(),
      currentAuth: this.getCurrentAuth(),
      hasAdmin: !!this.tokens.admin,
      hasMerchant: !!this.tokens.merchant,
      hasDebtor: !!this.tokens.debtor,
      transactionId: this.testData.transactionId || null,
    };
  }

  printStatus() {
    const status = this.getStatus();
    console.log("\n=== TEST UTILS STATUS ===");
    console.log(`Current User: ${status.currentUser}`);
    console.log(`Current Auth: ${status.currentAuth}`);
    console.log(`Admin Available: ${status.hasAdmin}`);
    console.log(`Merchant Available: ${status.hasMerchant}`);
    console.log(`Debtor Available: ${status.hasDebtor}`);
    console.log(`Transaction ID: ${status.transactionId || "None"}`);
    console.log("========================\n");
  }
}

// Card Types (from Postman collection variables)
const CARD_TYPES = {
  APPROVED: "270387731",
  CAPTURE_REJECTED: "237940496",
  REFUND_REJECTED: "237940734",
  CANCEL_REJECTED: "237940762",
  RECURRING_REJECTED: "237940873",
  THREE_D_SECURE_REQUIRED: "237940883",
  AUTHORIZE_ONCE: "237940958",
  DELAYED_60S: "237940976",
};

// Test scenarios helper
const TEST_SCENARIOS = {
  BASIC_PAYMENT: {
    description: "Basic approved payment flow",
    cardId: CARD_TYPES.APPROVED,
    amount: 300,
  },
  CAPTURE_FAILURE: {
    description: "Payment that fails on capture",
    cardId: CARD_TYPES.CAPTURE_REJECTED,
    amount: 300,
  },
  REFUND_FAILURE: {
    description: "Payment that fails on refund",
    cardId: CARD_TYPES.REFUND_REJECTED,
    amount: 300,
  },
  THREE_D_SECURE: {
    description: "Payment requiring 3D Secure",
    cardId: CARD_TYPES.THREE_D_SECURE_REQUIRED,
    amount: 300,
  },
  DELAYED_PAYMENT: {
    description: "Payment with 60s delay",
    cardId: CARD_TYPES.DELAYED_60S,
    amount: 300,
  },
};

module.exports = {
  TestUtils,
  CARD_TYPES,
  TEST_SCENARIOS,
};
