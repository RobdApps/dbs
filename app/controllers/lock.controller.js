const db = require("../models");
const Lock = db.lock;

// Create and Save a new Airdrop
exports.create = (req, res) => {
  console.log("req.body", req.body);

  // Validate request
  if (req.body.Lock === undefined) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }
  // Create an Lock
  const lock = new Lock({
    lock: req.body.Lock,
    visible: req.body.visible ? req.body.visible : true,
    isFinished: req.body.isFinished ? req.body.isFinished : false,
    liquidity: req.body.liquidity,
    removed: req.body.removed ? req.body.removed : false,
    isCancelled: req.body.isCancelled ? req.body.isCancelled : false,
    chainId: req.body.chainId,
  });

  // Save Lock in the database
  lock
    .save(lock)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Lock.",
      });
    });
};

// Retrieve all Locks from the database
exports.findAll = (req, res) => {
  let { liquidity, chainId } = req.query;
  console.log(liquidity, chainId);
  chainId = parseInt(chainId);
  console.log(liquidity, chainId);
  const filter = { removed: false };

  if (liquidity === "true") {
    filter.liquidity = true;
  } else if (liquidity === "false") {
    filter.liquidity = false;
  }
  if (chainId) {
    filter.chainId = chainId;
  }

  Lock.find(filter)
    .then((data) => {
      console.log(data);
      if (liquidity === "true") {
        res.send(data);
      } else {
        const lockAddresses = data.map((lock) => lock.lock.lockAddress);
        res.send(lockAddresses);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Locks.",
      });
    });
};

// Find a single Lock with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Lock.findById(id)
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .send({ message: "Not found Lock with id " + id });
      }

      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Lock with id=" + id });
    });
};

// Update an Lock by the id in the request
exports.findByIdAndUpdate = (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  Lock.findByIdAndUpdate(id, updateData, { new: true })
    .then((updatedLock) => {
      if (!updatedLock) {
        return res.status(404).send({
          message: `Lock with ID ${id} not found.`,
        });
      }
      res.send(updatedLock);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating Lock with ID ${id}.`,
      });
    });
};

// Delete an Lock with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Lock.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Lock with id=${id}. Maybe Lock was not found!`,
        });
      } else {
        res.send({
          message: "Lock was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Lock with id=" + id,
      });
    });
};
