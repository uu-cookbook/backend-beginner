const path = require("path");
const fs = require("fs")

async function DeleteAbl(req, res) {
    try {
        const fileName = req.file ? req.file.filename : 
        req.query.image ? req.query.image : 
        req.body.image ? req.body.image : undefined;
        if (fileName) {
            //TODO alternative//  file = path.join(__dirname, "..", "..", "storage", "image", fileName)
            file = path.join(__dirname, "..", "..", "public", "recipe_images", fileName)
            if (fs.existsSync(path)) {
                fs.promises.unlink(file)
            } 
            res.json({}); 
        } else {
            res.status(400).send({
                errorMessage: "no valid file"
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}
module.exports = DeleteAbl;
