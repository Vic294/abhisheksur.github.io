# Extreme Minimal Health Check Server

This is the absolute minimum server needed to pass Replit's health checks.

## Deployment Instructions

1. Set the Run command to: `./run`
2. Click Deploy

## How This Works

This server has been stripped down to the absolute minimum required functionality:

1. It responds to **ALL requests** with:
   - Status code: 200
   - Content-Type: text/plain
   - Body: "OK"

2. It binds to all network interfaces (0.0.0.0) on the port specified by the PORT environment variable

3. It includes extensive logging to help debug any deployment issues

## Verifying It Works

Once deployed, you can verify the server is working by:

1. Checking the Replit logs for successful health check requests
2. Making a request to the root path (`/`) - it should return "OK"

## To Test Locally

```bash
cd extreme-minimal
./run
curl -i http://localhost:5000/
```

## Troubleshooting

If deployment still fails:

1. Check the Replit logs for any error messages
2. Verify the run script is executable (`chmod +x run`)
3. Try setting the PORT environment variable explicitly in Replit's environment variables
4. Make sure there are no other processes trying to use port 5000