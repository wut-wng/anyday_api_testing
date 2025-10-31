/**
 * Test Helper - Easy access to setup functions and test data
 */

const SetupManager = require("./setupManager");
const { cardTypes } = require("../config");

class TestHelper {
  constructor() {
    this.setupManager = new SetupManager();
  }

  // Quick setup methods for different test scenarios
  async setupForPaymentFlow() {
    return await this.setupManager.setupBasicTestData();
  }

  async setupAdminOnly() {
    return await this.setupManager.setupAdmin();
  }

  async setupMerchantOnly() {
    return await this.setupManager.setupForMerchantTests();
  }

  async setupDebtorOnly() {
    return await this.setupManager.setupForDebtorTests();
  }

  async setupDebtorWithCard(cardType) {
    await this.setupManager.setupAdmin();
    return await this.setupManager.setupDebtor(cardType);
  }

  // Payment flow helpers
  async createOrder(amount = 300) {
    if (!this.setupManager.data.merchant) {
      await this.setupManager.setupForMerchantTests();
    }
    return await this.setupManager.setupTransaction(amount);
  }

  async capturePayment(transactionId, amount = 300) {
    const { request, globals, env } = require("../config");

    return await request(env.baseUrl)
      .post(globals.publicPaymentsPath + `/${transactionId}/capture`)
      .set("Authorization", `Bearer ${this.setupManager.data.merchant.apiKey}`)
      .send({ Amount: amount })
      .expect(200);
  }

  async refundPayment(transactionId, amount = 300) {
    const { request, globals, env } = require("../config");

    return await request(env.baseUrl)
      .post(globals.publicPaymentsPath + `/${transactionId}/refund`)
      .set("Authorization", `Bearer ${this.setupManager.data.merchant.apiKey}`)
      .send({ Amount: amount })
      .expect(200);
  }

  async cancelPayment(transactionId) {
    const { request, globals, env } = require("../config");

    return await request(env.baseUrl)
      .post(globals.publicPaymentsPath + `/${transactionId}/cancel`)
      .set("Authorization", `Bearer ${this.setupManager.data.merchant.apiKey}`)
      .expect(200);
  }

  // Card testing helpers
  getCardTypes() {
    return cardTypes;
  }

  async changeDebtorCard(cardType, last4Digits = null) {
    if (!this.setupManager.data.debtor) {
      throw new Error("Debtor must be setup first");
    }

    const { request, globals, env, auth } = require("../config");
    const last4 = last4Digits || Math.floor(Math.random() * 9000) + 1000;
    const debtorEmail = encodeURIComponent(this.setupManager.data.debtor.email);

    // Handle both old string format and new object format
    const cardId = typeof cardTypes[cardType] === 'object' 
      ? cardTypes[cardType].id 
      : cardTypes[cardType];

    return await request(env.baseUrl)
      .post(globals.internalPath + "/testing/change-debtor-card")
      .set("Authorization", auth.getAuthHeader("admin"))
      .query({
        email: debtorEmail,
        quickPayCardId: cardId,
        last4Digit: last4,
      })
      .expect(200);
  }

  // Data access helpers
  getTestData() {
    return this.setupManager.data;
  }

  getAdminData() {
    return this.setupManager.data.admin;
  }

  getMerchantData() {
    return this.setupManager.data.merchant;
  }

  getDebtorData() {
    return this.setupManager.data.debtor;
  }

  getTransactionData() {
    return this.setupManager.data.transaction;
  }

  // Reset and cleanup
  reset() {
    this.setupManager.reset();
  }

  displaySummary() {
    this.setupManager.displaySummary();
  }
}

// Singleton instance for easy import
const testHelper = new TestHelper();

module.exports = testHelper;
