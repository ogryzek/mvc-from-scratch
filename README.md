# MVC Study     
Let's have a look at the MVC Design Pattern through building an application. We have already built one during class, so this will mostly be review of those concepts, but putting them all into one place.  
  
Since we are going to be using ExpressJS, let's get a simple hello world application up and running to start. Our application will have an entrypoint called `app.js`
  
```js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send(`
        <h1>Hello World!</h1>
        <p>Welcome to my application!</p>
    `);
});

app.listen(3000, () => {
    console.log(`Server listening on port ${port}$`);
});
```

## Add a Resource and Endpoint  
  
First, let's add an endpoint to get a resource. In this case, we'll create a resource called `toys` and our endpoint will be `/toys`, and it should return a list of all toys.  
  
Our toys can be stored on our server in a database. In this case, since we are just getting started, we'll use a flat file as a data store. We'll create a file called `toys.json` and add the following data:

```json
[{
    "id": 1,
    "name": "Barbie",
    "price": 10.99,
    "description": "A doll for girls",
    "image": "barbie.jpg"
},
{
    "id": 2,
    "name": "Hot Wheels",
    "price": 5.99,
    "description": "A car for boys",
    "image": "hotwheels.jpg"
},
{
    "id": 3,
    "name": "Mr. Potato Head",
    "price": 2.99,
    "description": "A potato for everyone",
    "image": "mrpotatohead.jpg"
}]
```

We can now consider serving this as .json through a RESTful API _as well as_ serving it as HTML through a template, where we can either use a template engine or create one ourselves.   
  
In order to differentiate between endpoints, we will use `/api/v1` for the path prefix for our JSON API, e.g. `/api/v1/toys` will return a list of all toys in JSON format, while `/toys` will return a list of all toys in HTML format.  
  
Let's start with the `/api/v1/toys` endpoint, as it's a little easier conceptually. We'll use the `fs` module to read the `toys.json` file and return it as JSON. And we can do this (for now) right in our `app.js` inside the request handlers.  
  
```js
// app.js
// ... 
const fs = require('fs');
// ...

app.get('/api/v1/toys', (req, res) => {
    const toys = require('./toys.json');
    res.json(toys);
});
```

Great. That actually worked! We will have to revisit it with the `fs` module later, but for now, this is a good start. Let's add the analogous HTML endpoint. We will maybe avoid using a template engine for now, and instead think through what we want the output to look like.  
  
We can create a list, and for each toy there will be a list item. At the top list item level will be the toy's ID. Inside that item, there will be another list of all of its other attributes, e.g.  
  
  * ID: 1
    * Name: Barbie
    * Price: $10.99
    * Description: A doll for girls
    * Image: barbie.jpg
  * ID: 2
    * Name: Hot Wheels
    * Price: $5.99
    * Description: A car for boys
    * Image: hotwheels.jpg
  * ID: 3
    * Name: Mr. Potato Head
    * Price: $2.99
    * Description: A potato for everyone
    * Image: mrpotatohead.jpg

So, we can add the following code to our `app.js` to create this list:

```js
// app.js
// ...
app.get('/toys', (req, res) => {
    const toys = require('./toys.json');
    let html = '<ul>';
    for (let toy of toys) {
        html += `<li>${toy.id}</li>`;
        html += '<ul>';
        for (let key in toy) {
            if (key !== 'id') {
                html += `<li>${key}: ${toy[key]}</li>`;
            }
        }
        html += '</ul>';
    }
    html += '</ul>';
    res.send(html);
});
```
