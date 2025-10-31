# Environment Configuration Usage

## How to Switch Environments

Set the `TEST_ENV` environment variable before running tests:

```powershell
# Test against QA5 (default)
npm test

# Test against QA1
$env:TEST_ENV="qa1"; npm test

# Test against Dev environment
$env:TEST_ENV="dev"; npm test

# Test against Local environment
$env:TEST_ENV="local"; npm test
```

## Available Environments

- `qa1` through `qa10` - QA environments
- `dev` - Development environment  
- `local` - Local development environment

## Configuration Structure

### Environment Variables
- `baseUrl` - The base URL for the API
- `version` - API version (currently v1)

### Global Variables
- `adminUsername` - Admin user email
- `internalPath` - Internal API path
- `publicPath` - Public API path
- `publicPaymentsPath` - Payments API path

### Endpoints
- `endpoints.internal` - Internal API base URL
- `endpoints.public` - Public API base URL
- `endpoints.payments` - Payments API base URL
- `endpoints.version` - Version check URL

## Usage in Tests

```javascript
const { request, expect, globals, auth, endpoints, env } = require('./config');

describe('My API Tests', function() {
  it('should test an endpoint', async function() {
    const response = await request(env.baseUrl)
      .get(globals.publicPath + '/some-endpoint')
      .set('Authorization', auth.getAuthHeader('admin'))
      .expect(200);
    
    expect(response.body).to.have.property('data');
  });
});
```

## Authentication

```javascript
// Set authentication tokens
auth.setToken('admin', { access_token: 'your-admin-token' });
auth.setToken('merchant', { access_token: 'your-merchant-token' });

// Use in requests
.set('Authorization', auth.getAuthHeader('admin'))
```

## Custom Environment Variables

You can also override specific settings:

```powershell
$env:ADMIN_USERNAME="custom@admin.com"; npm test
```