const express = require('express');
// const { readFileSync } = require('fs');
const app = express();
const port = 3000;

// const indexPage = readFileSync(__dirname + '/../www/index.html').toString();
// const { renderToString } = require('../hydrate');

app.use(express.static('www'));
//
// app.get('/', async (req, res) => {
//   const { html } = await renderToString(indexPage);
//   res.send(html);
// });

app.listen(port, () => {
  console.log('SSR started on ' + port);
});
