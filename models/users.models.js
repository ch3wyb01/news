const db = require("../db/connection");

exports.selectUsers = async () => {
  const { rows } = await db.query(`
  SELECT * FROM users`);

  return rows;
};
