const { selectUsers, selectUserByUsername } = require("../models/users.models");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await selectUsers();

    res.status(200).send({ users });
  } catch (err) {
    next(err);
  }
};

exports.getUserByUsername = async (req, res, next) => {
  const { username } = req.params;
  const user = await selectUserByUsername(username);

  res.status(200).send({ user });
};
