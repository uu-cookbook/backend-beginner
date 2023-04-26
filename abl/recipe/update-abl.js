const path = require("path");
const Ajv = require("ajv").default;
const RecipeDao = require("../../dao/recipe-dao");
let dao = new RecipeDao(
  path.join(__dirname, "..", "..", "storage", "recipes.json")
);
const IngredientDao = require("../../dao/ingredient-dao");
const { response } = require("express");
let ingredientDao = new IngredientDao(
    path.join(__dirname, "..", "..", "storage", "ingredients.json")
);
// TODO až bude udělana CategoryDao zkonrolovat a odstranit značení komentaře
/* 
const CategoryDao = require("../../dao/category-dao");
let categoryDao = new CategoryDao(
    path.join(__dirname, "..", "..", "storage", "categorys.json")
);
*/

let schema = {
    type: "object",
    properties: {
        id: { type: "string" },
        name: {type: "string"},
        ingredients: {type: "array", 
            items: {type: "object", 
                properties: {id: {type: "string"},amount: {type: "number"}},
                required: ["id","amount"], additionalProperties: false
            }},
        portion: {type: "number"},
        preparationTime: {type: "number"},
        steps: {type: "array", items: {type: "string"}, minItems: 1},
        categoryId: {type: "array", items: {type: "string"}},
        image: {type: "string"},   
        approved: { type: "boolean" }
    },
    required: ["id", "ingredients"],
    additionalProperties: false
};

async function UpdateAbl(req, res) {
    try {
        const ajv = new Ajv();
        const valid = ajv.validate(schema, req.body);
        if (valid) {
            let recipe = req.body;
            recipe.ingredients.forEach(async (ingredient) => {
                let validIngredient = await ingredientDao.getIngredient(ingredient.id)
                if(!validIngredient) {
                    res.status(400).send({
                        errorMessage: `ingredient with given id ${ingredient.id} does not exist`,
                        params: req.body,
                        reason: ajv.errors,
                    });
                    return;
                }
            });
            /*
            recipe.categoryId.forEach(async (id) => {
                let validCategory = await categoryDao.getCategory(id)
                if(!validCategory) {
                    res.status(400).send({
                        errorMessage: `category with given id ${id} does not exist`,
                        params: req.body,
                        reason: ajv.errors,
                    });
                    return;
                }
            });
            */
            recipe = await dao.updateRecipe(recipe);
            res.json(recipe);
        } else {
            res.status(400).send({
                errorMessage: "validation of recipe input failed",
                params: req.body,
                reason: ajv.errors
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}
module.exports = UpdateAbl;
