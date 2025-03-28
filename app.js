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

app.get('/toys', (req, res) => {
  const toys = require('./toys.json');
  let html = `<ul>`;
  toys.forEach(toy => {
    html += `<li>${toy.id}</li>`;
    html += `<ul>`;
    html += `<li>${toy.name}</li>`;
    html += `<li>${toy.price}</li>`;
    html += `<li>${toy.description}</li>`;
    html += `<li>${toy.image}</li>`;
    html += `</ul>`;
  });
  html += `</ul>`;
  res.send(html);
});

app.get('/toy/:id', (req, res) => {
  const toys = require('./toys.json');
  const toy = toys.find(toy => toy.id === parseInt(req.params.id));
  if (!toy) {
    res.status(404).send('Toy not found');
  } else {
    res.send(`
      <h1>${toy.name}</h1>
      <ul>
        <li>${toy.price}</li>
        <li>${toy.description}</li>
        <li>${toy.image}</li>
      </ul>
      `);
  }
});

app.get('/api/v1/toy/:id', (req, res) => {
  const toys = require('./toys.json');
  const toy = toys.find(toy => toy.id === parseInt(req.params.id));
  if (!toy) {
    res.status(404).send('Toy not found');
  } else {
    res.json(toy);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
