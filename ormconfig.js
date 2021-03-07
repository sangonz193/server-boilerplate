require("dotenv").config()
require("./cli/_utils/registerBabel")

module.exports = require("./src/database/database.config").databaseConfig.typeormConfig
