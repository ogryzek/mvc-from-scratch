const express = require('express');
const app = express();
const port = 3000;


app.get('/', (req, res) => {
  res.send('Hello World!');
}); 

app.get('/api/v1/toys', (req, res) => {
  const toys = require('./toys.json');
  res.json(toys);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
