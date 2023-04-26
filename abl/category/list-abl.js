const path = require("path");
const Ajv = require("ajv").default;
const CategoriesDao = require("../../dao/category-dao");
let dao = new CategoriesDao(
    path.join(__dirname, "..", "..", "storage", "categories.json")
);

async function ListAbl(req, res) {
    try {
        const categoryList = await dao.listCategories();
        res.json(categoryList);
    } catch (e) {
        res.status(500).send(e);
    }
}

module.exports = ListAbl;