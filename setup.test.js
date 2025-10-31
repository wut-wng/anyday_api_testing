const {
  request,
  expect,
  globals,
  auth,
  endpoints,
  env,
  cardTypes,
} = require("./config");

describe("Initial Setup - Basic Data Creation", function () {
  this.timeout(30000); // Increase timeout for setup operations

  let testData = {
    adminToken: null,
    merchantData: null,
    debtorData: null,
    transactionId: null,
  };

  // Card IDs for different test scenarios (from Postman collection)
  const cardTypesForDisplay = cardTypes;

  describe("1. Initialize System", function () {
    it("should check API version endpoint", async function () {
      console.log(`Testing against: ${env.baseUrl}`);
      console.log(`API Version: ${env.version}`);

      const response = await request(env.baseUrl)
        .get(globals.internalPath + "/version")
        .expect(200);

      console.log("API Version Response:", response.body);
      expect(response.status).to.equal(200);
    });
  });

  describe("2. Admin Authentication", function () {
    it("should login as superadmin", async function () {
      const response = await request(env.baseUrl)
        .post(globals.internalPath + "/testing/login")
        .send({
          email: globals.adminUsername,
          userType: "admin",
        })
        .expect(200);

      expect(response.body).to.have.property("auth");
      expect(response.body.auth).to.have.property("access_token");

      // Store admin token
      testData.adminToken = response.body;
      auth.setToken("admin", response.body);

      console.log("✓ Admin login successful");
      console.log(`Admin email: ${response.body.email}`);
    });
  });

  describe("3. Create Test Merchant", function () {
    it("should create a test merchant", async function () {
      const merchantData = {
        merchantName: `TestMerchant_${Date.now()}`,
        webshopName: `TestShop_${Date.now()}`,
        webshopUrl: "https://test-shop.example.com",
        approveMerchantAML: true,
        email: `merchant_${Date.now()}@merchant.manaotest.com`,
        transactionFee: 0,
        transactionVat: 0,
      };

      const response = await request(env.baseUrl)
        .post(globals.internalPath + "/testing/create-test-case-merchant")
        .set("Authorization", auth.getAuthHeader("admin"))
        .send(merchantData)
        .expect(200);

      expect(response.body).to.have.property("auth");
      expect(response.body).to.have.property("apiKey");
      expect(response.body).to.have.property("webShopId");

      // Store merchant data
      testData.merchantData = response.body;
      auth.setToken("merchant", response.body);

      console.log("✓ Merchant created successfully");
      console.log(`Merchant email: ${response.body.email}`);
      console.log(`WebShop ID: ${response.body.webShopId}`);
    });
  });

  describe("4. Create Test Debtor", function () {
    it("should create a test debtor with approved card", async function () {
      // Generate random test data
      const cprNumber =
        "0102" +
        Math.floor(Math.random() * (99 - 40 + 1)) +
        40 +
        Math.floor(Math.random() * 9000) +
        1000;
      const phoneNumber =
        "+45" + Math.floor(Math.random() * 9000) + 1000 + "****";
      const postCode = (Math.floor(Math.random() * 9000) + 1000).toString();
      const timestamp = Date.now();

      const debtorData = {
        id: `test-debtor-${timestamp}`,
        cprNumber: cprNumber,
        quickPayCardId: cardTypes.approved,
        email: `debtor_${timestamp}@debtor.manaotest.com`,
        language: "en",
        phoneNumber: phoneNumber,
        firstName: `TestDebtor${timestamp}`,
        lastName: "TestUser",
        streetAddress: "123 Test Street",
        city: "Test City",
        postCode: postCode,
      };

      const response = await request(env.baseUrl)
        .post(globals.internalPath + "/testing/create-test-case-debtor")
        .set("Authorization", auth.getAuthHeader("admin"))
        .send(debtorData)
        .expect(200);

      expect(response.body).to.have.property("auth");
      expect(response.body.auth).to.have.property("access_token");

      // Store debtor data
      testData.debtorData = response.body;
      auth.setToken("debtor", response.body);

      console.log("✓ Debtor created successfully");
      console.log(`Debtor email: ${response.body.email}`);
    });

    it("should confirm debtor email", async function () {
      const debtorEmail = encodeURIComponent(testData.debtorData.email);

      const response = await request(env.baseUrl)
        .post(globals.internalPath + "/testing/confirm-debtor-email")
        .set("Authorization", auth.getAuthHeader("admin"))
        .query({ email: debtorEmail })
        .expect(200);

      console.log("✓ Debtor email confirmed");
    });
  });

  describe("5. Test Payment Flow Setup", function () {
    it("should create a test order for checkout", async function () {
      const orderId = Math.floor(Math.random() * 9000000000) + 1000000000;

      const orderData = {
        Amount: 300,
        Currency: "DKK",
        OrderId: orderId.toString(),
        CallbackUrl: `${env.baseUrl}${globals.internalPath}/testing/external-orders/callback`,
        SuccessRedirectUrl: `${env.baseUrl}${globals.internalPath}/testing/external-orders/${orderId}/success`,
        CancelRedirectUrl: `${env.baseUrl}${globals.internalPath}/testing/external-orders/${orderId}/cancel`,
      };

      // Use webshop API key instead of Bearer token
      const response = await request(env.baseUrl)
        .post(globals.publicPaymentsPath)
        .set("Authorization", `Bearer ${testData.merchantData.apiKey}`)
        .send(orderData)
        .expect(200);

      expect(response.body).to.have.property("purchaseOrderId");

      testData.transactionId = response.body.purchaseOrderId;

      console.log("✓ Test order created");
      console.log(`Order ID: ${orderId}`);
      console.log(`Transaction ID: ${testData.transactionId}`);
    });

    it("should authorize the payment", async function () {
      const authData = {
        checkoutId: testData.transactionId,
        acceptPurchaseOrderTermsAndConditions: true,
      };

      const response = await request(env.baseUrl)
        .post(globals.internalPath + "/checkout/authorize-payment")
        .set("Authorization", auth.getAuthHeader("debtor"))
        .send(authData)
        .expect(200);

      console.log("✓ Payment authorized");
    });

    it("should update authorize payment status", async function () {
      const response = await request(env.baseUrl)
        .post(
          globals.internalPath +
            `/testing/pending-payment/${testData.transactionId}`
        )
        .set("Authorization", auth.getAuthHeader("admin"))
        .send({})
        .expect(200);

      console.log("✓ Payment status updated to authorized");
    });
  });

  describe("6. Summary", function () {
    it("should display all created test data", function () {
      console.log("\n=== TEST DATA SUMMARY ===");
      console.log(`Environment: ${env.baseUrl}`);
      console.log(`Admin: ${testData.adminToken?.email}`);
      console.log(`Merchant: ${testData.merchantData?.email}`);
      console.log(`Merchant WebShop ID: ${testData.merchantData?.webShopId}`);
      console.log(`Debtor: ${testData.debtorData?.email}`);
      console.log(`Transaction ID: ${testData.transactionId}`);
      console.log("========================\n");

      // Export test data for use in other tests
      global.testData = testData;

      // Verify all required data is present
      expect(testData.adminToken).to.not.be.null;
      expect(testData.merchantData).to.not.be.null;
      expect(testData.debtorData).to.not.be.null;
      expect(testData.transactionId).to.not.be.null;
    });
  });

  // Export card types for use in other tests
  describe("7. Card Types Reference", function () {
    it("should provide card types for testing scenarios", function () {
      console.log("\n=== AVAILABLE CARD TYPES ===");
      Object.entries(cardTypesForDisplay).forEach(([name, id]) => {
        console.log(`${name}: ${id}`);
      });
      console.log("===========================\n");

      global.cardTypes = cardTypesForDisplay;
    });
  });
});
