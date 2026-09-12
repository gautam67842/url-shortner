const URL = require("../models/url");
const nanoId = require("short-id");


// POST /url
// Generate short URL
async function handleGenerateShortURL(req, res) {

    const body = req.body;

    if (!body.url) {
        return res.status(400).json({
            err: "Enter a URL"
        });
    }

    const shortid = nanoId.generate();

    await URL.create({
        shortId: shortid,
        redirectUrl: body.url,
        createdBy: req.user._id
    });

    return res.status(201).json({
        id: shortid,
        message: "Short URL created successfully"
    });
}


// GET /url/:shortId
// Redirect to original URL
async function handleRedirection(req, res) {

    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push: {
                visitHistory: {
                    timestamps: Date.now()
                }
            }
        },
        {
            new: true
        }
    );

    if (!entry) {
        return res.status(404).send("Short URL not found");
    }

    return res.redirect(entry.redirectUrl);
}


// GET /url/analytics/:shortId
async function handleAnalytics(req, res) {

    const shortId = req.params.shortId;

    const entry = await URL.findOne({
        shortId
    });

    if (!entry) {
        return res.status(404).json({
            message: "Short URL not found"
        });
    }

    return res.json({
        totalClicks: entry.visitHistory.length,
        analytics: entry.visitHistory
    });
}


module.exports = {
    handleGenerateShortURL,
    handleRedirection,
    handleAnalytics
};