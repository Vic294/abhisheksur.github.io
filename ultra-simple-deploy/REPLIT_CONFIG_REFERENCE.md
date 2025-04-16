# Replit Configuration Reference

This file contains the recommended Replit configuration settings for deploying Abhishek Sur's personal website.

## Important Configuration

When setting up your Replit configuration, use these settings:

1. **Run Command:**
   ```
   ./run
   ```

2. **Environment Variables:**
   - `PORT=5000` (Required for Replit deployment)
   - `USE_ULTRA_SIMPLE=true` (Recommended for maximum compatibility)

3. **Deployment Settings:**
   - Deployment Target: cloudrun
   - Ignore Ports: false

## How to Configure in Replit

1. Go to the "Tools" menu
2. Select "Secrets"
3. Add the environment variable: `USE_ULTRA_SIMPLE` with value `true`
4. Configure the run command in the Replit configuration panel

## Complete Reference Configuration

For reference, here's what a complete `.replit` configuration would look like:

```
run = "./run"
hidden = [".config", "package-lock.json"]

[nix]
channel = "stable-22_11"

[env]
PATH = "/home/runner/$REPL_SLUG/.config/npm/node_global/bin:/home/runner/$REPL_SLUG/node_modules/.bin"
PORT = "5000"
USE_ULTRA_SIMPLE = "true"

[packager]
language = "nodejs"

[deployment]
run = ["sh", "-c", "./run"]
deploymentTarget = "cloudrun"
ignorePorts = false
```

**Note:** You cannot directly edit the `.replit` file, but you can use the Replit interface to configure these settings.