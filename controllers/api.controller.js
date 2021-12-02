const { retrieveEndpoints } = require("../models/api.models")

exports.getEndpoints = async (req, res, next) => {
    const endpoints = await retrieveEndpoints();
    res.status(200).send({endpoints});
}