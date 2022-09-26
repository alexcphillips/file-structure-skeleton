const { blueprint } = require("./blueprints/index.js");
const { generate } = require("./generate.js");

async function init() {
    try {
        await generate(blueprint);
        console.log("done running!");
    } catch (e) {
        console.error(e.stack || e);
    }
}

init();
