const { parse } = require("csv-parse/sync");
const fs = require("fs");

function readCSV() {
  const input = fs.readFileSync("./_data/posts.csv");
  const records = parse(input, {
    columns: true,
    skip_empty_lines: true,
  });

  return records;
}

module.exports = function () {
  const data = readCSV();

  return data;
};
