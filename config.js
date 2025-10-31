const request = require("supertest");
const expect = require("chai").expect;
const { environments, globals, cardTypes, getEnvironment, getPortalUrl, getAllPortals } = require("./environments");

// Get current environment (default to local)
const currentEnv = process.env.TEST_ENV || "local";
const currentPortal = process.env.TEST_PORTAL || "api";
const env = getEnvironment(currentEnv);

// Global variables (from Postman globals)
const apiGlobals = {
  adminUsername: process.env.ADMIN_USERNAME || globals.adminUsername,
  internalPath: `/api/${env.version}/internal`,
  publicPath: `/api/${env.version}`,
  publicPaymentsPath: `/api/${env.version}/orders`,

  // Portal URLs
  get apiUrl() {
    return getPortalUrl(currentEnv, "api");
  },
  get adminUrl() {
    return getPortalUrl(currentEnv, "admin");
  },
  get shopperUrl() {
    return getPortalUrl(currentEnv, "shopper");
  },
  get merchantUrl() {
    return getPortalUrl(currentEnv, "merchant");
  },

  // Current portal URL
  get currentPortalUrl() {
    return getPortalUrl(currentEnv, currentPortal);
  },

  // Utility URLs (backward compatibility)
  get dummyUrl() {
    return `${env.baseUrl}${this.internalPath}/version`;
  },
  get baseApiUrl() {
    return `${env.baseUrl}${this.publicPath}`;
  },
  get internalApiUrl() {
    return `${env.baseUrl}${this.internalPath}`;
  },
  get paymentsApiUrl() {
    return `${env.baseUrl}${this.publicPaymentsPath}`;
  },
};

// Authentication utilities (simplified from Postman loadUtils)
const auth = {
  tokens: {
    admin: null,
    merchant: null,
    debtor: null,
  },

  setToken(type, tokenData) {
    this.tokens[type] = tokenData;
  },

  getToken(type) {
    return this.tokens[type];
  },

  getAuthHeader(type) {
    const token = this.getToken(type);
    if (!token) return null;

    // Handle different token structures
    const accessToken = token.access_token || token.auth?.access_token || token;
    return `Bearer ${accessToken}`;
  },
};

module.exports = {
  // Test utilities
  request: (baseUrl = env.baseUrl) => request(baseUrl),
  expect,

  // Environment config
  env,
  environments,
  currentEnv,
  currentPortal,

  // Global variables
  globals: apiGlobals,
  cardTypes,

  // Authentication
  auth,

  // Portal utilities
  getPortalUrl: (portalType) => getPortalUrl(currentEnv, portalType),
  getAllPortals: () => getAllPortals(currentEnv),
  switchPortal: (portalType) => {
    process.env.TEST_PORTAL = portalType;
    return getPortalUrl(currentEnv, portalType);
  },

  // Helper methods
  getFullUrl: (path) => `${env.baseUrl}${path}`,
  getPortalFullUrl: (portalType, path) => `${getPortalUrl(currentEnv, portalType)}${path}`,

  // API endpoints (backward compatibility)
  endpoints: {
    internal: apiGlobals.internalApiUrl,
    public: apiGlobals.baseApiUrl,
    payments: apiGlobals.paymentsApiUrl,
    version: apiGlobals.dummyUrl,
    // Portal endpoints
    api: apiGlobals.apiUrl,
    admin: apiGlobals.adminUrl,
    shopper: apiGlobals.shopperUrl,
    merchant: apiGlobals.merchantUrl,
  },
};
