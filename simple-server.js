const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Directly handle the root path for health checks
// This is THE most important route - Replit health checks rely on this
app.get('/', (req, res) => {
  console.log('Root path accessed');
  
  // Handle health check detection
  if (req.query.health === 'true' || 
      req.headers['x-health-check'] === 'true' || 
      req.headers['user-agent']?.toLowerCase().includes('health')) {
    // This is likely a health check
    console.log('Treating root path as health check');
    
    // Always respond with OK for health checks
    return res.status(200)
       .set('Content-Type', 'text/plain')
       .set('Cache-Control', 'no-cache, no-store, must-revalidate')
       .send('OK');
  }
  
  // For normal users, serve redirect.html to redirect them to index.html
  console.log('Serving redirect page for normal users');
  res.sendFile(path.join(__dirname, 'redirect.html'));
});

// Also provide a dedicated health endpoint
app.get('/health', (req, res) => {
  console.log('Health endpoint accessed');
  res.status(200).send('OK');
});

// Add a specific route for index.html for regular website visitors
app.get('/index.html', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log('Serving index.html');
    return res.sendFile(indexPath);
  } else {
    res.status(404).send('Index not found');
  }
});

// Serve static files for all other content
app.use(express.static(__dirname));

// Serve specific paths
app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'blog.html'));
});

app.get('/blog-post', (req, res) => {
  res.sendFile(path.join(__dirname, 'blog-post.html'));
});

app.get('/blog-ai-blockchain', (req, res) => {
  res.sendFile(path.join(__dirname, 'blog-ai-blockchain.html'));
});

// Handle 404s
app.use((req, res) => {
  console.log(`404 for ${req.url}`);
  res.status(404).send('Not found');
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Root path (health check): http://localhost:${PORT}/`);
  console.log(`Health endpoint: http://localhost:${PORT}/health`);
});