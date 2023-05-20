const fs = require('fs');
const Ajv = require("ajv").default;
const path = require("path");

let schema = {
    type: "object",
    properties: {
      image: { type: "string" },
    },
    required: ["image"],
  };

async function GetAbl(req, res) {
    try {
        const ajv = new Ajv();
        //query je to co je za path v url a body může but json txt
        const body = req.query.image ? req.query : req.body;
        const valid = ajv.validate(schema, body);
        if (valid) {
            let image = body.image;
            //TODO alternative//  file = path.join(__dirname, "..", "..", "storage", "image", image)
            file = path.join(__dirname, "..", "..", "public", "recipe_images", image)
            fs.access(file, fs.F_OK, (err) => {
                if (err) {
                    res.status(400).send({
                        Message: `image '${image}' doesn't exist.`,
                        error: err
                    })
                } 
                res.sendFile(file);     
            })    
        } else {
            res.status(400).send({
                errorMessage: "validation of image input failed",
                params: body,
                reason: ajv.errors,
            })
        }
    } catch (e) {
        res.status(500).send(e);
    }
}

module.exports = GetAbl;