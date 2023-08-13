module.exports = app => {
    const lock = require("../controllers/lock.controller.js");

    var router = require("express").Router();

    // Create a new Airdrop
    router.post("/", lock.create);

    // Retrieve all Airdrops
    router.get("/", lock.findAll);

    // Retrieve a single Airdrop with id
    router.get("/:id", lock.findOne);

    // Update a Airdrop with id
    router.put("/:id", lock.findByIdAndUpdate);

    // Delete a Airdrop with id
    router.delete("/:id", lock.delete);

    app.use('/api/lock', router);
};