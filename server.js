const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Middleware for health checks
app.use((req, res, next) => {
  // Log incoming requests
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Health check endpoint for Replit Deployments
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Serve static files from the root directory
app.use(express.static(__dirname));

// Serve attached_assets for images and other assets
app.use('/attached_assets', express.static(path.join(__dirname, 'attached_assets')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Explicit route handler for the root path - this is critical for health checks
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route handlers for HTML pages with both .html extension and without
app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'blog.html'));
});

app.get('/blog.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'blog.html'));
});

app.get('/blog-post', (req, res) => {
  res.sendFile(path.join(__dirname, 'blog-post.html'));
});

app.get('/blog-post.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'blog-post.html'));
});

app.get('/blog-ai-blockchain', (req, res) => {
  res.sendFile(path.join(__dirname, 'blog-ai-blockchain.html'));
});

app.get('/blog-ai-blockchain.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'blog-ai-blockchain.html'));
});

// Handle 404 errors
app.use((req, res) => {
  console.log(`404 Not Found: ${req.url}`);
  const filePath = path.join(__dirname, 'index.html');
  if (fs.existsSync(filePath)) {
    res.status(404).sendFile(filePath);
  } else {
    res.status(404).send('Page not found');
  }
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
  console.log(`Health check endpoint available at http://localhost:${port}/health`);
});