const { expect, env } = require("./config");
const testHelper = require("./utils/testHelper");

describe("Example API Tests - Using Refactored Setup", function () {
  this.timeout(30000);

  describe("Payment Flow Tests", function () {
    let testData;

    before(async function () {
      // Simple one-liner setup for payment tests
      testData = await testHelper.setupForPaymentFlow();
      console.log("✓ Payment flow setup completed");
    });

    it("should capture a payment successfully", async function () {
      const transactionId = testData.transaction.transactionId;
      const amount = testData.transaction.amount;

      const response = await testHelper.capturePayment(transactionId, amount);

      expect(response.status).to.equal(200);
      console.log("✓ Payment captured successfully");
    });

    it("should refund a payment", async function () {
      // Create a new transaction for refund test
      const newTransaction = await testHelper.createOrder(500);

      // Capture first
      await testHelper.capturePayment(newTransaction.transactionId, 500);

      // Then refund
      const response = await testHelper.refundPayment(
        newTransaction.transactionId,
        500
      );

      expect(response.status).to.equal(200);
      console.log("✓ Payment refunded successfully");
    });
  });

  describe("Card Type Tests", function () {
    it("should test different card types", async function () {
      await testHelper.setupAdminOnly();

      // Test with capture rejected card
      const debtorWithBadCard = await testHelper.setupDebtorWithCard(
        "captureRejected"
      );

      expect(debtorWithBadCard.email).to.include("@debtor.manaotest.com");
      console.log("✓ Debtor with capture rejected card created");

      // Change to approved card
      await testHelper.changeDebtorCard("approved");
      console.log("✓ Card changed to approved");
    });
  });

  describe("Environment Configuration Tests", function () {
    it("should display current environment info", function () {
      console.log(`\nTesting against: ${env.baseUrl}`);
      console.log(`API Version: ${env.version}`);

      const cardTypes = testHelper.getCardTypes();
      console.log(`Available card types: ${Object.keys(cardTypes).join(", ")}`);

      expect(env.baseUrl).to.include("yadyna.xyz");
    });
  });

  describe("Merchant Only Tests", function () {
    it("should setup merchant only for merchant-specific tests", async function () {
      const merchantData = await testHelper.setupMerchantOnly();

      expect(merchantData.merchant.email).to.include("@merchant.manaotest.com");
      expect(merchantData.merchant.webShopId).to.not.be.null;
      expect(merchantData.merchant.apiKey).to.not.be.null;

      console.log("✓ Merchant-only setup completed");
    });
  });

  after(function () {
    // Display final summary
    testHelper.displaySummary();
  });
});
