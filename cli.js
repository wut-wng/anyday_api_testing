#!/usr/bin/env node

/**
 * CLI tool for managing Anyday API test environments
 * Usage: node cli.js [command] [options]
 */

const {
  environments,
  globals,
  testScenarios,
  listEnvironments,
  listCardTypes,
  listTestScenarios,
  listPortals,
  getAllEnvPortalCombinations,
} = require("./environments");

const commands = {
  "list-envs": {
    description: "List all available environments",
    action: listEnvironments,
  },
  "list-cards": {
    description: "List all available card types for testing",
    action: listCardTypes,
  },
  "list-scenarios": {
    description: "List all predefined test scenarios",
    action: listTestScenarios,
  },
  "list-portals": {
    description: "List all portals (optionally for specific environment)",
    action: listPortalsCommand,
  },
  "list-combinations": {
    description: "List all environment-portal combinations",
    action: listCombinations,
  },
  test: {
    description: "Run tests with specific environment",
    action: runTests,
  },
  setup: {
    description: "Run setup tests to create initial data",
    action: runSetup,
  },
  help: {
    description: "Show this help message",
    action: showHelp,
  },
};

function runTests() {
  const env = process.argv[3] || "local";
  console.log(`\n🚀 Running tests against ${env} environment...\n`);

  process.env.TEST_ENV = env;
  const { spawn } = require("child_process");

  const testProcess = spawn("npm", ["test"], {
    stdio: "inherit",
    env: { ...process.env, TEST_ENV: env },
  });

  testProcess.on("close", (code) => {
    console.log(`\nTests completed with code ${code}`);
  });
}

function runSetup() {
  const env = process.argv[3] || "local";
  console.log(`\n🔧 Running setup for ${env} environment...\n`);

  process.env.TEST_ENV = env;
  const { spawn } = require("child_process");

  const setupProcess = spawn("npm", ["run", "setup"], {
    stdio: "inherit",
    env: { ...process.env, TEST_ENV: env },
  });

  setupProcess.on("close", (code) => {
    console.log(`\nSetup completed with code ${code}`);
  });
}

function showHelp() {
  console.log("\n=== Anyday API Test CLI ===\n");
  console.log("Available commands:");

  Object.entries(commands).forEach(([cmd, info]) => {
    console.log(`  ${cmd.padEnd(18)} - ${info.description}`);
  });

  console.log("\nExamples:");
  console.log("  node cli.js list-envs              # List environments");
  console.log("  node cli.js test local             # Run tests on local");
  console.log("  node cli.js setup dev              # Run setup on Dev");
  console.log("  node cli.js list-cards             # List card types");
  console.log("  node cli.js list-portals           # List all portals");
  console.log("  node cli.js list-portals local     # List portals for local");
  console.log("  node cli.js list-combinations      # List env-portal combinations");
  console.log("\nEnvironment Variables:");
  console.log("  TEST_ENV       - Environment to test against (default: local)");
  console.log("  ADMIN_USERNAME - Admin username override");
  console.log("  TEST_PORTAL    - Portal type to test (api, admin, shopper, merchant)");
  console.log("");
}

function listPortalsCommand() {
  const envName = process.argv[3];
  listPortals(envName);
}

function listCombinations() {
  const combinations = getAllEnvPortalCombinations();
  console.log("\n=== ENVIRONMENT-PORTAL COMBINATIONS ===");
  console.log("Environment".padEnd(12) + " | " + "Portal".padEnd(10) + " | URL");
  console.log("-".repeat(70));
  
  combinations.forEach(combo => {
    console.log(`${combo.environment.padEnd(12)} | ${combo.portal.padEnd(10)} | ${combo.url}`);
  });
  
  console.log(`\nTotal combinations: ${combinations.length}`);
  console.log("======================================\n");
}

// Main execution
const command = process.argv[2];

if (!command || command === "help") {
  showHelp();
} else if (commands[command]) {
  commands[command].action();
} else {
  console.log(`\n❌ Unknown command: ${command}`);
  console.log('Run "node cli.js help" for available commands\n');
}

module.exports = commands;
