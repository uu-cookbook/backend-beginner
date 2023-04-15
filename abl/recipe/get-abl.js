const path = require("path");
const Ajv = require("ajv").default;
const RecipeDao = require("../../dao/recipe-dao");
let dao = new RecipeDao(
  path.join(__dirname, "..", "..", "storage", "recipes.json")
);

let schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
};


async function GetAbl(req, res) {
  try {
    const ajv = new Ajv();
    //query je to co je za path v url a body může but json txt
    const body = req.query.id ? req.query : req.body;
    const valid = ajv.validate(schema, body);
    if (valid) {
      const recipeId = body.id;
      const recipe = await dao.getRecipe(recipeId);
      if (!recipe) {
        res
          .status(400)
          .send({ error: `Recipe with id '${recipeId}' doesn't exist.` });
      }
      res.json(recipe);
    } else {
      res.status(400).send({
        errorMessage: "validation of input failed",
        params: body,
        reason: ajv.errors,
      });
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

module.exports = GetAbl;

/*
const path = require("path");
const Ajv = require("ajv").default;
const StudentDao = require("../../dao/student-dao");
let dao = new StudentDao(
  path.join(__dirname, "..", "..", "storage", "students.json")
);

let schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
};

async function GetAbl(req, res) {
  try {
    const ajv = new Ajv();
    const body = req.query.id ? req.query : req.body;
    const valid = ajv.validate(schema, body);
    if (valid) {
      const studentId = body.id;
      const student = await dao.getStudent(studentId);
      if (!student) {
        res
          .status(400)
          .send({ error: `Student with id '${studentId}' doesn't exist.` });
      }
      res.json(student);
    } else {
      res.status(400).send({
        errorMessage: "validation of input failed",
        params: body,
        reason: ajv.errors,
      });
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

module.exports = GetAbl;
*/