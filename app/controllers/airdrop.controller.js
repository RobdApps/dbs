const db = require('../models');
const Airdrop = db.airdrop;

// Create and Save a new Airdrop
exports.create = (req, res) => {
    console.log('req.body', req.body);

    console.log('req.body.airdrop', req.body.airdrop);
    // Validate request
    if (req.body.airdrop === undefined) {
        res.status(400).send({ message: 'Content cannot be empty!' });
        return;
    }

    // Create an Airdrop
    const airdrop = new Airdrop({
        airdrop: req.body.airdrop,
        visible: req.body.visible ? req.body.visible : true,
        isFinished: req.body.isFinished ? req.body.isFinished : false,
        removed: req.body.removed ? req.body.removed : false,
        isCancelled: req.body.isCancelled ? req.body.isCancelled : false,
        chainId: req.body.chainId
    });

    // Save Airdrop in the database
    airdrop
        .save(airdrop)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the Airdrop.',
            });
        });
};

// Retrieve all Airdrops from the database
exports.findAll = (req, res) => {
    let { chainId } = req.query;
    chainId = parseInt(chainId);
    const filter = { removed: false };
    if (chainId) {
        filter.chainId = chainId;
    }
    Airdrop.find(filter)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving airdrops.',
        });
      });
  };

// Find a single Airdrop with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Airdrop.findById(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({ message: 'Not found Airdrop with id ' + id });
            }

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: 'Error retrieving Airdrop with id=' + id });
        });
};

// Update an Airdrop by the id in the request
exports.findByIdAndUpdate = (req, res) => {
    const id = req.params.id;
    const updateData = req.body;

    Airdrop.findByIdAndUpdate(id, updateData, { new: true })
        .then(updatedAirdrop => {
            if (!updatedAirdrop) {
                return res.status(404).send({
                    message: `Airdrop with ID ${id} not found.`,
                });
            }
            res.send(updatedAirdrop);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error updating Airdrop with ID ${id}.`,
            });
        });
};

// Delete an Airdrop with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Airdrop.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Airdrop with id=${id}. Maybe Airdrop was not found!`,
                });
            } else {
                res.send({
                    message: 'Airdrop was deleted successfully!',
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not delete Airdrop with id=' + id,
            });
        });
};
