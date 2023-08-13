module.exports = app => {
    const airdrop = require("../controllers/airdrop.controller.js");

    var router = require("express").Router();

    // Create a new Airdrop
    router.post("/", airdrop.create);

    // Retrieve all Airdrops
    router.get("/", airdrop.findAll);

    // Retrieve a single Airdrop with id
    router.get("/:id", airdrop.findOne);

    // Update a Airdrop with id
    router.put("/:id", airdrop.findByIdAndUpdate);

    // Delete a Airdrop with id
    router.delete("/:id", airdrop.delete);

    app.use('/api/airdrop', router);
};