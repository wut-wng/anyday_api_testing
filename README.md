# Anyday API Testing Framework

This project provides a comprehensive API testing framework for the Anyday payment system, converted from Postman collections to Node.js with Mocha, Chai, and SuperTest.

## 🏗️ Project Structure

```
├── config.js                 # Main configuration file
├── environments.js           # Environment and test scenario definitions
├── setup.test.js            # Initial setup and data creation tests
├── example.test.js          # Example usage tests
├── utils/
│   └── testUtils.js         # Test utilities (replaces Postman loadUtils)
├── Postman/                 # Original Postman collections
│   ├── Anyday.postman_collection.json
│   ├── Anyday.postman_globals.json
│   └── *.postman_environment.json
├── cli.js                   # Command line interface
├── package.json             # Project dependencies and scripts
└── README.md               # This file
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Initial Setup
```bash
# Setup test data on QA5 (default)
npm run setup

# Or setup on specific environment
TEST_ENV=qa1 npm run setup
```

### 3. Run Tests
```bash
# Run all tests
npm test

# Run tests on specific environment
TEST_ENV=dev npm test

# Run specific test types
npm run test:payments
npm run test:merchants
npm run test:debtors
```

## 🌍 Environment Management

### Available Environments
- `qa1` through `qa10` - QA environments
- `dev` - Development environment
- `local` - Local development environment

### Environment Variables
- `TEST_ENV` - Environment to test against (default: qa5)
- `ADMIN_USERNAME` - Admin username override

### Switch Environments
```bash
# PowerShell
$env:TEST_ENV="qa1"; npm test

# Command Prompt
set TEST_ENV=qa1 && npm test

# Using CLI tool
node cli.js test qa1
```

## 🃏 Card Types for Testing

The framework includes predefined card types for different test scenarios:

| Card Type | ID | Use Case |
|-----------|----|---------| 
| `approved` | 270387731 | Standard approved payments |
| `captureRejected` | 237940496 | Payment fails during capture |
| `refundRejected` | 237940734 | Payment fails during refund |
| `cancelRejected` | 237940762 | Payment fails during cancel |
| `recurringRejected` | 237940873 | Recurring payments fail |
| `threeDSecureRequired` | 237940883 | Requires 3D Secure |
| `authorizeOnce` | 237940958 | Single authorization only |
| `delayed60s` | 237940976 | 60-second processing delay |

## 🛠️ CLI Commands

```bash
# List all available environments
node cli.js list-envs

# List all card types
node cli.js list-cards

# List test scenarios
node cli.js list-scenarios

# Run setup on specific environment
node cli.js setup qa5

# Run tests on specific environment
node cli.js test dev

# Show help
node cli.js help
```

## 🔧 Configuration Files

### Main Config (`config.js`)
- Request utilities (SuperTest)
- Environment settings  
- Authentication helpers
- API endpoints

### Environment Config (`environments.js`)
- All available environments
- Global variables
- Test scenarios
- Helper functions

### Test Utilities (`utils/testUtils.js`)
- Authentication token management
- Test data generators
- Utility functions (replaces Postman's loadUtils)

## 📄 License

MIT

