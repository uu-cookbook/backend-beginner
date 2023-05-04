const path = require("path");
const RecipeDao = require("../../dao/recipe-dao");
let dao = new RecipeDao(
  path.join(__dirname, "..", "..", "storage", "recipes.json")
);

async function UpdateImageAbl(req, res) {
    //TODO valildace jestli req obsahuje file
    try {
        const id = req.query.id ? req.query.id : req.body.id;
        if (id) {
            let recipe = await dao.getRecipe(id);
            recipe.image = req.file.filename;
            recipe = await dao.updateRecipe(recipe);
            res.json(recipe);
        } else {
            res.status(400).send({
                errorMessage: "validation of recipe id input failed",
                params: req.body
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}
module.exports = UpdateImageAbl;
