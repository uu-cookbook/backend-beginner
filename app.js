//načtení modulu express
const express = require("express");
//inicializace nového Express.js serveru
const app = express();
//definování portu, na kterém má aplikace běžet na localhostu
const port = 3010;

//jednoduchá definice routy s HTTP metodou GET, která pouze navrací text
app.get("/", (req, res) => {
  res.send('Hello World!')
});

//nastavení portu, na kterém má běžet HTTP server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});