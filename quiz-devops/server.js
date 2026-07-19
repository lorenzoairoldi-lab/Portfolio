const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE = path.join(__dirname);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

http.createServer((req, res) => {
  let url = req.url === '/' ? '/index.html' : req.url;
  let filePath = path.join(BASE, url);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 - File non trovato');
      return;
    }
    let ext = path.extname(filePath).toLowerCase();
    let contentType = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log('✅ Server in esecuzione su http://localhost:' + PORT);
});
