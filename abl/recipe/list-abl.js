const path = require("path");
const Ajv = require("ajv").default;
const RecipesDao = require("../../dao/recipe-dao");
let dao = new RecipesDao(
    path.join(__dirname, "..", "..", "storage", "recipes.json")
);

async function ListAbl(req, res) {
    try {
        const recipeList = await dao.listRecipes();
        res.json(recipeList);
    } catch (e) {
        res.status(500).send(e);
    }
}

module.exports = ListAbl;