# MVC Study     
Let's have a look at the MVC Design Pattern through building an application. We have already built one during class, so this will mostly be review of those concepts, but putting them all into one place.  
  
Since we are going to be using ExpressJS, let's get a simple hello world application up and running to start. Our application will have an entrypoint called `app.js`
  
```js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log(`Server listening on port ${port}$`);
});
```
