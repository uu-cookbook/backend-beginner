const path = require("path");
const Ajv = require("ajv").default;
const IngredientsDao = require("../../dao/ingredient-dao");
let dao = new IngredientsDao(
    path.join(__dirname, "..", "..", "storage", "ingredients.json")
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
        const valid = ajv.validate(schema, req.body);
        if (valid) {
            const ingredientId = req.body.id;
            await dao.deleteIngredient(ingredientId);
            res.json({});
        } else {
            res.status(400).send({
                errorMessage: "validation of ingredient input failed",
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