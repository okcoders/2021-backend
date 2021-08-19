// import modules
const express = require('express');
const app = express();

const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/test', (req, res) => {
  res.json({
    success: true,
    data: [1, 2, 3, false, { a: 1, b: 2, c: 3, d: 4 }],
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
// export OR start a server
