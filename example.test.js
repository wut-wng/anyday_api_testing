const { request, expect, globals, auth, endpoints, env } = require("./config");

describe("Anyday API Tests - Example Usage", function () {
  // Test environment configuration
  describe("Environment Configuration", function () {
    it("should use correct environment settings", function () {
      console.log(`Testing against: ${env.baseUrl}`);
      console.log(`API Version: ${env.version}`);
      console.log(`Current Environment: ${process.env.TEST_ENV || "local"}`);

      expect(env.baseUrl).to.include("yadyna.xyz");
      expect(env.version).to.equal("v1");
    });
  });

  // Test API endpoints construction
  describe("API Endpoints", function () {
    it("should construct correct endpoint URLs", function () {
      expect(globals.publicPath).to.equal("/api/v1");
      expect(globals.internalPath).to.equal("/api/v1/internal");
      expect(globals.publicPaymentsPath).to.equal("/api/v1/orders");
      expect(endpoints.version).to.include("/api/v1/internal/version");
    });
  });

  // Example API test using the configuration
  describe("Version Endpoint Test", function () {
    it("should check API version", async function () {
      const response = await request(env.baseUrl)
        .get(globals.internalPath + "/version")
        .expect(200);

      // Add your assertions here based on expected response
      console.log("Version response:", response.body);
    });
  });

  // Example authentication test
  describe("Authentication Tests", function () {
    it("should handle admin authentication", function () {
      // Example of setting and using tokens
      auth.setToken("admin", { access_token: "mock-admin-token" });

      const authHeader = auth.getAuthHeader("admin");
      expect(authHeader).to.equal("Bearer mock-admin-token");

      console.log(`Admin username: ${globals.adminUsername}`);
    });
  });

  // Example test with different endpoints
  describe("Multiple Endpoint Tests", function () {
    it("should test public API endpoint", async function () {
      // This would test the public API
      // Uncomment and modify based on actual endpoints

      /*
      const response = await request(env.baseUrl)
        .get(globals.publicPath + '/some-endpoint')
        .set('Authorization', auth.getAuthHeader('admin'))
        .expect(200);
      
      expect(response.body).to.have.property('data');
      */

      console.log(`Would test: ${endpoints.public}/some-endpoint`);
    });

    it("should test payments endpoint", async function () {
      // This would test the payments API
      console.log(`Would test: ${endpoints.payments}/some-payment-endpoint`);
    });
  });
});
