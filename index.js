const express = require('express');
const app = express();
const port = 3000; // Ganti sesuai kebutuhan

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
