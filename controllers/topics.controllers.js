const { selectTopics } = require("../models/topics.models");

exports.getTopics = async (req, res, next) => {
    const topics = await selectTopics();
    
    res.status(200).send({ topics });
};
