const { expect, env } = require("./config");
const SetupManager = require("./utils/setupManager");

describe("Initial Setup", function () {
  this.timeout(60000); // Increase timeout for setup operations

  let setupManager;

  before(function () {
    setupManager = new SetupManager();
  });

  describe("Basic Test Data Creation", function () {
    it("should create all basic test data", async function () {
      console.log(`\n🚀 Setting up test data on ${env.baseUrl}\n`);

      const testData = await setupManager.setupBasicTestData();

      // Export to global for other tests
      setupManager.exportToGlobal();

      // Display summary
      setupManager.displaySummary();

      // Verify all data was created
      expect(testData.admin).to.not.be.null;
      expect(testData.merchant).to.not.be.null;
      expect(testData.debtor).to.not.be.null;
      expect(testData.transaction).to.not.be.null;

      console.log("✅ Setup completed successfully\n");
    });
  });

  describe("Verify System Health", function () {
    it("should verify API is accessible", async function () {
      const { request, globals } = require("./config");

      const response = await request(env.baseUrl)
        .get(globals.internalPath + "/version")
        .expect(200);

      console.log(`✓ API Version check passed: ${response.status}`);
    });
  });
});
