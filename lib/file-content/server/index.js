require("dotenv").config(require("path").join(__dirname, "../.env"));
const { mongoConnect } = require("../database");
const app = require("./app");

(async () => {
    await mongoConnect(process.env.MONGO_URI || "mongodb://localhost:27017");
    app.listen(process.env.PORT || 3000, () => {
        console.log(
            `Server :: Server started on port : ${process.env.PORT || 3000}`
        );
    });
})();
