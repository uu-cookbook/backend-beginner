const path = require("path");
const Ajv = require("ajv").default;
const CategoriesDao = require("../../dao/category-dao");
let dao = new CategoriesDao(
    path.join(__dirname, "..", "..", "storage", "categories.json")
);


let schema = {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  };
  
  
  async function GetAbl(req, res) {
    try {
      const ajv = new Ajv();
      //query je to co je za path v url a body může but json txt
      const body = req.query.id ? req.query : req.body;
      const valid = ajv.validate(schema, body);
      if (valid) {
        const categoryId = body.id;
        const category = await dao.getCategory(categoryId);
        if (!category) {
          res
            .status(400)
            .send({ error: `category with id '${categoryId}' doesn't exist.` });
        }
        res.json(category);
      } else {
        res.status(400).send({
          errorMessage: "validation of category input failed",
          params: body,
          reason: ajv.errors,
        });
      }
    } catch (e) {
      res.status(500).send(e);
    }
  }

module.exports = GetAbl;