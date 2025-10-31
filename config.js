const request = require("supertest");
const expect = require("chai").expect;
const { environments, globals, getEnvironment } = require("./environments");

// Get current environment (default to qa5)
const currentEnv = process.env.TEST_ENV || "qa5";
const env = getEnvironment(currentEnv);

// Global variables (from Postman globals)
const apiGlobals = {
  adminUsername: process.env.ADMIN_USERNAME || globals.adminUsername,
  internalPath: `/api/${env.version}/internal`,
  publicPath: `/api/${env.version}`,
  publicPaymentsPath: `/api/${env.version}/orders`,

  // Utility URLs
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

  // Global variables
  globals: apiGlobals,
  cardTypes: globals.cards,

  // Authentication
  auth,

  // Helper methods
  getFullUrl: (path) => `${env.baseUrl}${path}`,

  // API endpoints
  endpoints: {
    internal: apiGlobals.internalApiUrl,
    public: apiGlobals.baseApiUrl,
    payments: apiGlobals.paymentsApiUrl,
    version: apiGlobals.dummyUrl,
  },
};
