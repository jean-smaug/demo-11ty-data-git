const fs = require("fs");

fs.writeFileSync(
  __dirname + "../_data/hello.json",
  JSON.stringify(["hello", "world"]),
  "utf-8"
);
