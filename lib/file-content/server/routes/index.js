const router = require("express").Router();
const { health } = require("./utility");

router.get("health", health);

module.exports = { router };
