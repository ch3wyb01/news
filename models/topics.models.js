const db = require("../db/connection");

exports.selectTopics = async () => {
  const { rows } = await db.query(`SELECT * FROM topics;`);

  return rows;
};
