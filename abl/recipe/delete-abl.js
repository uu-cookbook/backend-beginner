const path = require("path");
const Ajv = require("ajv").default;
const RecipesDao = require("../../dao/recipe-dao");
let dao = new RecipesDao(
    path.join(__dirname, "..", "..", "storage", "recipes.json")
);

let schema = {
    type: "object",
    properties: {
        id: { type: "string" },
    },
    required: ["id"]
};

async function DeleteAbl(req, res) {
    try {
        const ajv = new Ajv();
        const body = req.query.id ? req.query : req.body;
        const valid = ajv.validate(schema, body);
        if (valid) {
            const recipeId = body.id;
            await dao.deleteRecipe(recipeId);
            res.json({});
        } else {
            res.status(400).send({
                errorMessage: "validation of recipe input failed",
                params: body,
                reason: ajv.errors
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}
module.exports = DeleteAbl;