const { selectUsers, selectUserByUsername } = require("../models/users.models");
const { checkExists } = require("../utils");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await selectUsers();

    res.status(200).send({ users });
  } catch (err) {
    next(err);
  }
};

exports.getUserByUsername = async (req, res, next) => {
  try {
    const { username } = req.params;

    if (!isNaN(username)) {
      await Promise.reject({ status: 400, msg: "Invalid username" });
    }

    await checkExists("users", "username", username);

    const user = await selectUserByUsername(username);

    res.status(200).send({ user });
  } catch (err) {
    next(err);
  }
};
