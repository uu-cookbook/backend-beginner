const path = require("path");
const Ajv = require("ajv").default;
const RecipesDao = require("../../dao/recipe-dao");
let dao = new RecipesDao(
    path.join(__dirname, "..", "..", "storage", "recipes.json")
);

let schema = {
    type: "object",
    properties: {
      approved: { type: "boolean" },
    },
    required: ["approved"],
};

async function AmountAbl(req, res) {
    const ajv = new Ajv();
    let body = req.body;

    if (req.query.approved) {
        // CONVERT QUERY STRING TO BOOLEAN
        const isApproved = req.query.approved === "true";
        body = {approved:isApproved};
    }

    const valid = ajv.validate(schema, body);
    if (valid) {
        const approved = body.approved;
        try {
            const recipeList = await dao.listRecipes();
            const filteredRecipeList = recipeList.filter((recipe) => {
                return recipe.approved === approved;
            });
            res.json(filteredRecipeList.length);
        } catch (e) {
            res.status(500).send(e);
        }
    } else {
        res.status(400).send({
            errorMessage: "validation of recipe input failed",
            params: body,
            reason: ajv.errors,
        });
    }
}

module.exports = AmountAbl;