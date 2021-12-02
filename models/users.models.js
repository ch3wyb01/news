const db = require("../db/connection");

exports.selectUsers = async () => {
  const { rows } = await db.query(`
  SELECT * FROM users;`);

  const usernames = rows.map((user) => {
    return { username: user.username };
  });

  return usernames;
};

exports.selectUserByUsername = async (username) => {

  const { rows } = await db.query(
    `
    SELECT * FROM users
    WHERE username = $1;`,
    [username]
  );

  return rows[0];
};
