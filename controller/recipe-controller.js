const express = require("express");
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'storage/image/' })

const GetAbl = require("../abl/recipe/get-abl");
const CreateAbl = require("../abl/recipe/create-abl");
const UpdateAbl = require("../abl/recipe/update-abl");
const DeleteAbl = require("../abl/recipe/delete-abl");
const ListAbl = require("../abl/recipe/list-abl");
const AmountAbl = require("../abl/recipe/amount-abl");


router.get("/get", async (req, res) => {
    await GetAbl(req, res);
});

router.post("/create", async (req, res) => {
  await CreateAbl(req, res);
});

router.post("/update", async (req, res) => {
  await UpdateAbl(req, res);
});

router.post("/delete", async (req, res) => {
  await DeleteAbl(req, res);
});

router.get("/list", async (req, res) => {
  await ListAbl(req, res);
});

router.get("/amount", async (req, res) => {
  await AmountAbl(req, res);
});

module.exports = router;