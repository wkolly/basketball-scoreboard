const path = require("path");
const fs = require("fs");
const { createServer } = require("http");
const { parse } = require("url");

const buildPath = path.join(__dirname, "../build");
const indexPath = path.join(buildPath, "index.html");

// Check if build directory exists
if (!fs.existsSync(buildPath)) {
  console.error("Build directory does not exist!");
  process.exit(1);
}

const server = createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  const { pathname } = parsedUrl;

  // Serve static files
  const filePath = path.join(
    buildPath,
    pathname === "/" ? "index.html" : pathname
  );

  try {
    if (fs.existsSync(filePath)) {
      const stat = fs.statSync(filePath);
      if (stat.isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        const mimeTypes = {
          ".html": "text/html",
          ".js": "text/javascript",
          ".css": "text/css",
          ".json": "application/json",
          ".png": "image/png",
          ".jpg": "image/jpg",
          ".gif": "image/gif",
          ".svg": "image/svg+xml",
          ".wav": "audio/wav",
          ".mp4": "video/mp4",
          ".woff": "application/font-woff",
          ".ttf": "application/font-ttf",
          ".eot": "application/vnd.ms-fontobject",
          ".otf": "application/font-otf",
          ".wasm": "application/wasm",
        };

        const contentType = mimeTypes[ext] || "application/octet-stream";
        res.writeHead(200, { "Content-Type": contentType });
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
        return;
      }
    }

    // If file not found, serve index.html (for SPA routing)
    fs.readFile(indexPath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading index.html");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    });
  } catch (err) {
    res.writeHead(500);
    res.end(`Server Error: ${err.message}`);
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = server;
