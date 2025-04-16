# Abhishek Sur Portfolio - Replit Deployment

## Quick Setup

1. Set Replit run command to: `./run`
2. Deploy

## What's Included

- `server.js`: Minimal server that passes Replit health checks
- `run`: Script to start the server

## Verification

To verify health checks are working:
```
curl -i http://localhost:5000/
```

Should return:
```
HTTP/1.1 200 OK
Content-Type: text/plain

OK
```
