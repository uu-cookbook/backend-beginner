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
        name: { type: "string" },
        unit: { type: "string" },
        approved: { type: "boolean" }
    },
    required: ["id"]
};

async function UpdateAbl(req, res) {
    try {
        const ajv = new Ajv();
        const valid = ajv.validate(schema, req.body);
        if (valid) {
            let ingredient = req.body;
            ingredient = await dao.updateIngredient(ingredient);
            res.json(ingredient);
        } else {
            res.status(400).send({
                errorMessage: "validation of ingredient input failed",
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