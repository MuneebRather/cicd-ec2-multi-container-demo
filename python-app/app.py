from flask import Flask
from datetime import datetime

app = Flask(__name__)
visit_count = 0

@app.route('/')
def home():
    global visit_count
    visit_count += 1
    now = datetime.utcnow().isoformat()

    return f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CI/CD Multi-Container Demo - Python App</title>
      <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #14532d, #052e16);
          font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
          color: #e2e8f0;
        }}
        .card {{
          max-width: 500px;
          padding: 2.5rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }}
        h1 {{ font-size: 1.5rem; margin-bottom: 1rem; }}
        p {{ line-height: 1.6; color: #94a3b8; }}
        .stats {{
          margin: 1.5rem 0;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }}
        .stats p {{ color: #e2e8f0; font-size: 0.9rem; }}
        .meta {{
          margin-top: 1.5rem;
          font-size: 0.8rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #475569;
        }}
      </style>
    </head>
    <body>
      <main class="card">
        <h1>🐍 Python / Flask container</h1>
        <p>One of two containers deployed from this repo via GitHub Actions.</p>
        <div class="stats">
          <p><strong>Server time:</strong> {now}</p>
          <p><strong>Visits this session:</strong> {visit_count}</p>
        </div>
        <p class="meta">cicd-ec2-multi-container-demo / python-app</p>
      </main>
    </body>
    </html>
    """

@app.route('/health')
def health():
    return {"status": "ok"}, 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)