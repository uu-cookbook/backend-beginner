const express = require("express");
const router = express.Router();
const path = require("path")
const crypto = require("crypto")
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'storage/image/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '_' + crypto.randomBytes(8).toString("hex") + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
      }
    }
  }).single('file');

const CreateAbl = require("../abl/image/create-abl");
const GetAbl = require("../abl/image/get-abl");
//const UpdateAbl = require("../abl/image/update-abl");
const DeleteAbl = require("../abl/image/delete-abl");
//const ListAbl = require("../abl/image/list-abl");

router.post("/create", upload, async (req, res) => {
  
  await CreateAbl(req, res);
});

router.get("/get", async (req, res) => {
    await GetAbl(req, res);
});
/*
router.post("/update", async (req, res) => {
  await UpdateAbl(req, res);
});
*/

router.post("/delete", async (req, res) => {
  await DeleteAbl(req, res);
});
/*
router.get("/list", async (req, res) => {
  await ListAbl(req, res);
});
*/
module.exports = router;