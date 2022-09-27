exports.health = (req, res) => {
    return res.status(200).send({ data: "Hello World!" });
};
