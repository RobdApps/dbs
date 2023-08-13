const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
// db.url = dbConfig.url; // Comentați sau ștergeți această linie
db.url = process.env.MONGO_DB_URL; // Adăugați această linie pentru a utiliza variabila din .env
db.banner = require("./banner.model.js")(mongoose);
db.sale = require("./sale.model.js")(mongoose);
db.airdrop = require("./airdrop.model.js")(mongoose);
db.lock = require("./lock.model.js")(mongoose);

module.exports = db;