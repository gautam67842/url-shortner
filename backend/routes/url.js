const { handleGenerateShortURL, handleRedirection, handleAnalytics } = require("../controllers/url")

const express = require("express");

const router = express.Router();

router.post("/" , handleGenerateShortURL);

router.get("/:shortId" , handleRedirection );

router.get("/analytics/:shortId", handleAnalytics)

module.exports = router;