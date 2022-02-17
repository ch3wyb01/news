const format = require("pg-format");
const db = require("./db/connection");

exports.checkExists = async (table, column, value) => {
  const resource = table.slice(0, -1);

  const queryStr = format(
    `
    SELECT * FROM %I
    WHERE %I = $1;`,
    table,
    column
  );
  const { rows } = await db.query(queryStr, [value]);

  if (!rows.length) {
    return Promise.reject({ status: 404, msg: `${resource} does not exist` });
  }
};
