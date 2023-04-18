//načtení modulu express
const express = require("express");
const cors = require("cors");

const recipeRouter = require("./controller/recipe-controller");
const ingredientRouter = require("./controller/ingredient-controller");
//TODO const categoryRouter = require("./controller/category-controller");

//inicializace nového Express.js serveru
const app = express();
//definování portu, na kterém má aplikace běžet na localhostu
const port = 3010;

// Parsování body
app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.use(cors())

//jednoduchá definice routy s HTTP metodou GET, která pouze navrací text
app.get("/", (req, res) => {
  res.send('Hello World!')
});

app.use("/recipe", recipeRouter);
app.use("/ingredient", ingredientRouter);

app.get("/*", (req, res) => {
  res.send("Unknown path!");
});
//nastavení portu, na kterém má běžet HTTP server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

/*
//načtení modulu express
const express = require("express");
const cors = require("cors");

const studentRouter = require("./controller/student-controller");
const classroomRouter = require("./controller/classroom-controller");
const subjectRouter = require("./controller/subject-controller");
const gradeRouter = require("./controller/grade-controller");

//inicializace nového Express.js serveru
const app = express();
//definování portu, na kterém má aplikace běžet na localhostu
const port = process.env.PORT || 8000;

// Parsování body
app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.use(cors())

//jednoduchá definice routy s HTTP metodou GET, která pouze navrací text
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/student", studentRouter);
app.use("/classroom", classroomRouter);
app.use("/subject", subjectRouter);
app.use("/grade", gradeRouter);

app.get("/*", (req, res) => {
  res.send("Unknown path!");
});
 
//nastavení portu, na kterém má běžet HTTP server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
*/