const { MongoClient } = require("mongodb");

const defaultOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

exports.db = null;
exports.mongoConnect = async (uri, opts = defaultOpts) => {
    try {
        const client = await MongoClient.connect(uri, opts);
        exports.db = client.db("TEST");
        console.log("Database :: Successfully connected to database");
        return exports.db;
    } catch (err) {
        console.error(err.stack);
    }
};
