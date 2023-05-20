const path = require("path");
const RecipeDao = require("../../dao/recipe-dao");
let dao = new RecipeDao(
  path.join(__dirname, "..", "..", "storage", "recipes.json")
);
const fs = require("fs")

async function CreateAbl(req, res) {
    try {
        const id = req.query.id ? req.query.id : req.body.id;
        if (req.file) {
            if (id) {
                let recipe = await dao.getRecipe(id);
                if (recipe){
                    recipe.image = req.file.filename;
                    recipe = await dao.updateRecipe(recipe);
                    res.json(recipe);
                } else {
                    //TODO alternative// file = path.join(__dirname, "..", "..", "storage", "image", req.file.filename)
                    file = path.join(__dirname, "..", "..", "public", "recipe_images", req.file.filename)
                    if (fs.existsSync(path)) {
                        fs.promises.unlink(file)
                    }
                    res.status(400).send({
                        errorMessage: `failed finding recipe with id ${id}`,
                        params: req.body
                    });
                }
            } else {
                //TODO alternative// file = path.join(__dirname, "..", "..", "storage", "image", req.file.filename)
                file = path.join(__dirname, "..", "..", "public", "recipe_images", req.file.filename)
                if (fs.existsSync(path)) {
                    fs.promises.unlink(file)
                }
                res.status(400).send({
                    errorMessage: "recipe id input failed",
                    params: req.body
                });
            }
        }   
        else {
            res.status(400).send({
                errorMessage: "no valid file"
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}
module.exports = CreateAbl;
