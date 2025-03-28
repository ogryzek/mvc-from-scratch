const express = require('express');
const fs = require('fs');
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

app.get('/toys/:id', (req, res) => {
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

app.get('/api/v1/toys/:id', (req, res) => {
  const toys = require('./toys.json');
  const toy = toys.find(toy => toy.id === parseInt(req.params.id));
  if (!toy) {
    res.status(404).send('Toy not found');
  } else {
    res.json(toy);
  }
});

app.get('/toy/new/', (req, res) => {
  res.send(`
    <div>
      <form action="/toy/new" method="POST">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" name="name">
        </div>
        <div>
          <label for="price">Price:</label>
          <input type="text" id="price" name="price">
        </div>
        <div>
          <label for="description">Description:</label>
          <input type="text" id="description" name="description">
        </div>
        <div>
          <label for="image">Image:</label>
          <input type="text" id="image" name="image">
        </div>
        <input type="submit" value="Submit">  
      </form>
    </div>
  `);
});

app.post('/toy/new', (req, res) => {
  const toys = require('./toys.json');
  const toy = {
    id: toys.length + 1,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image
  };
  toys.push(toy);
  fs.writeFileSync('./toys.json', JSON.stringify(toys));
  res.redirect('/toy/' + toy.id);
});

app.post('/api/v1/toy/new', (req, res) => {
  const toys = require('./toys.json');
  console.log('req.body', req.body);
  const toy = {
    id: toys.length + 1,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image
  };
  toys.push(toy);
  fs.writeFileSync('./toys.json', JSON.stringify(toys));
  res.json(toy);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
