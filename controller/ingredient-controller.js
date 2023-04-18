const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/ingredient/get-abl");

router.get("/get", async (req, res) => {
    await GetAbl(req, res);
});

module.exports = router;