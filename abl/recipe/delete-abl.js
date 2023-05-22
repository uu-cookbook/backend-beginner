const path = require("path");
const fs = require("fs");
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
            const recipe = await dao.getRecipe(recipeId);
            //TODO alternative//  file = path.join(__dirname, "..", "..", "storage", "image", fileName)
            file = path.join(__dirname, "..", "..", "public", "recipe_images", recipe.image)
            if (fs.existsSync(path)) {
                fs.promises.unlink(file)
            }
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