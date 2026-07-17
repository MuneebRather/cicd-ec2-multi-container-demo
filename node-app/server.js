const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let visitCount = 0;

app.get('/', (req, res) => {
  visitCount++;
  const now = new Date().toISOString();

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CI/CD Multi-Container Demo - Node App</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1e3a5f, #0c1e33);
          font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
          color: #e2e8f0;
        }
        .card {
          max-width: 500px;
          padding: 2.5rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }
        h1 { font-size: 1.5rem; margin-bottom: 1rem; }
        p { line-height: 1.6; color: #94a3b8; }
        .stats {
          margin: 1.5rem 0;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }
        .stats p { color: #e2e8f0; font-size: 0.9rem; }
        .meta {
          margin-top: 1.5rem;
          font-size: 0.8rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #475569;
        }
      </style>
    </head>
    <body>
      <main class="card">
        <h1>⬢ Node / Express container</h1>
        <p>One of two containers deployed from this repo via GitHub Actions.</p>
        <div class="stats">
          <p><strong>Server time:</strong> ${now}</p>
          <p><strong>Visits this session:</strong> ${visitCount}</p>
        </div>
        <p class="meta">cicd-ec2-multi-container-demo / node-app</p>
        <p><strong>- Muneeb Rather -</p>
      </main>
    </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});