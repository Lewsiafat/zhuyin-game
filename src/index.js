const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10007;
const BASE = process.env.BASE_PATH || '/zhuyin-game';

app.use(BASE, express.static(path.join(__dirname)));

app.get(BASE + '/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Zhuyin Game running at http://127.0.0.1:${PORT}${BASE}/`);
});
