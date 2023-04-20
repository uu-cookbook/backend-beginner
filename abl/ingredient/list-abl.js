const path = require("path");
const Ajv = require("ajv").default;
const IngredientsDao = require("../../dao/ingredient-dao");
let dao = new IngredientsDao(
    path.join(__dirname, "..", "..", "storage", "ingredients.json")
);

async function ListAbl(req, res) {
    try {
        const ingredientList = await dao.listIngredients();
        res.json(ingredientList);
    } catch (e) {
        res.status(500).send(e);
    }
}

module.exports = ListAbl;