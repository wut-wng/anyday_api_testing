/**
 * Simplified Setup Manager for Anyday API Testing
 * Provides reusable setup functions for test data creation
 */

const { request, globals, auth, env, cardTypes } = require("../config");

class SetupManager {
  constructor() {
    this.data = {
      admin: null,
      merchant: null,
      debtor: null,
      transaction: null,
    };
  }

  // Core setup function - runs all basic setup steps
  async setupBasicTestData() {
    console.log("🚀 Starting basic test data setup...");

    await this.setupAdmin();
    await this.setupMerchant();
    await this.setupDebtor();
    await this.setupTransaction();

    console.log("✅ Basic test data setup completed");
    return this.data;
  }

  // Individual setup functions for granular control
  async setupAdmin() {
    console.log("Setting up admin...");

    const response = await request(env.baseUrl)
      .post(globals.internalPath + "/testing/login")
      .send({
        email: globals.adminUsername,
        userType: "admin",
      })
      .expect(200);

    this.data.admin = response.body;
    auth.setToken("admin", response.body);

    console.log(`✓ Admin setup complete: ${response.body.email}`);
    return this.data.admin;
  }

  async setupMerchant() {
    if (!this.data.admin) {
      throw new Error("Admin must be setup first");
    }

    console.log("Setting up merchant...");

    const timestamp = Date.now();
    const merchantData = {
      merchantName: `TestMerchant_${timestamp}`,
      webshopName: `TestShop_${timestamp}`,
      webshopUrl: "https://test-shop.example.com",
      approveMerchantAML: true,
      email: `merchant_${timestamp}@merchant.manaotest.com`,
      transactionFee: 0,
      transactionVat: 0,
    };

    const response = await request(env.baseUrl)
      .post(globals.internalPath + "/testing/create-test-case-merchant")
      .set("Authorization", auth.getAuthHeader("admin"))
      .send(merchantData)
      .expect(200);

    this.data.merchant = response.body;
    auth.setToken("merchant", response.body);

    console.log(`✓ Merchant setup complete: ${response.body.email}`);
    return this.data.merchant;
  }

  async setupDebtor(cardType = "approved") {
    if (!this.data.admin) {
      throw new Error("Admin must be setup first");
    }

    console.log(`Setting up debtor with ${cardType} card...`);

    const timestamp = Date.now();
    const debtorData = {
      id: `test-debtor-${timestamp}`,
      cprNumber: this.generateCprNumber(),
      quickPayCardId: cardTypes[cardType],
      email: `debtor_${timestamp}@debtor.manaotest.com`,
      language: "en",
      phoneNumber: this.generatePhoneNumber(),
      firstName: `TestDebtor${timestamp}`,
      lastName: "TestUser",
      streetAddress: "123 Test Street",
      city: "Test City",
      postCode: this.generatePostCode(),
    };

    const response = await request(env.baseUrl)
      .post(globals.internalPath + "/testing/create-test-case-debtor")
      .set("Authorization", auth.getAuthHeader("admin"))
      .send(debtorData)
      .expect(200);

    this.data.debtor = response.body;
    auth.setToken("debtor", response.body);

    // Confirm debtor email
    await this.confirmDebtorEmail(response.body.email);

    console.log(`✓ Debtor setup complete: ${response.body.email}`);
    return this.data.debtor;
  }

  async setupTransaction(amount = 300) {
    if (!this.data.merchant || !this.data.debtor) {
      throw new Error("Merchant and Debtor must be setup first");
    }

    console.log("Setting up test transaction...");

    const orderId = this.generateOrderId();
    const orderData = {
      Amount: amount,
      Currency: "DKK",
      OrderId: orderId.toString(),
      CallbackUrl: `${env.baseUrl}${globals.internalPath}/testing/external-orders/callback`,
      SuccessRedirectUrl: `${env.baseUrl}${globals.internalPath}/testing/external-orders/${orderId}/success`,
      CancelRedirectUrl: `${env.baseUrl}${globals.internalPath}/testing/external-orders/${orderId}/cancel`,
    };

    // Create order with webshop API key
    const orderResponse = await request(env.baseUrl)
      .post(globals.publicPaymentsPath)
      .set("Authorization", `Bearer ${this.data.merchant.apiKey}`)
      .send(orderData)
      .expect(200);

    const transactionId = orderResponse.body.purchaseOrderId;

    // Authorize payment
    await request(env.baseUrl)
      .post(globals.internalPath + "/checkout/authorize-payment")
      .set("Authorization", auth.getAuthHeader("debtor"))
      .send({
        checkoutId: transactionId,
        acceptPurchaseOrderTermsAndConditions: true,
      })
      .expect(200);

    // Update payment status
    await request(env.baseUrl)
      .post(globals.internalPath + `/testing/pending-payment/${transactionId}`)
      .set("Authorization", auth.getAuthHeader("admin"))
      .send({})
      .expect(200);

    this.data.transaction = {
      orderId,
      transactionId,
      amount,
    };

    console.log(`✓ Transaction setup complete: ${transactionId}`);
    return this.data.transaction;
  }

  // Helper functions
  async confirmDebtorEmail(email) {
    const encodedEmail = encodeURIComponent(email);

    await request(env.baseUrl)
      .post(globals.internalPath + "/testing/confirm-debtor-email")
      .set("Authorization", auth.getAuthHeader("admin"))
      .query({ email: encodedEmail })
      .expect(200);
  }

  // Data generators
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

  // Quick setup functions for specific scenarios
  async setupForPaymentTests() {
    return await this.setupBasicTestData();
  }

  async setupForMerchantTests() {
    await this.setupAdmin();
    await this.setupMerchant();
    return {
      admin: this.data.admin,
      merchant: this.data.merchant,
    };
  }

  async setupForDebtorTests() {
    await this.setupAdmin();
    await this.setupDebtor();
    return {
      admin: this.data.admin,
      debtor: this.data.debtor,
    };
  }

  // Reset function
  reset() {
    this.data = {
      admin: null,
      merchant: null,
      debtor: null,
      transaction: null,
    };
    auth.tokens = {
      admin: null,
      merchant: null,
      debtor: null,
    };
  }

  // Export data to global for use in other tests
  exportToGlobal() {
    global.testData = this.data;
    global.setupManager = this;
    console.log("✓ Test data exported to global scope");
  }

  // Display summary
  displaySummary() {
    console.log("\n=== TEST DATA SUMMARY ===");
    console.log(`Environment: ${env.baseUrl}`);
    console.log(`Admin: ${this.data.admin?.email || "Not setup"}`);
    console.log(`Merchant: ${this.data.merchant?.email || "Not setup"}`);
    console.log(`Debtor: ${this.data.debtor?.email || "Not setup"}`);
    console.log(
      `Transaction: ${this.data.transaction?.transactionId || "Not setup"}`
    );
    console.log("========================\n");
  }
}

module.exports = SetupManager;
