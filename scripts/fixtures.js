const fs = require("fs");
const faker = require("faker");

const args = process.argv;
const rowsArgIndex = args.findIndex((arg) => arg === "--rows");

if (rowsArgIndex === -1 || !args[rowsArgIndex + 1]) {
  throw new Error("--rows arg must be provided with a value");
}

(async () => {
  const columns = ["title", "description"];
  const lines = [];

  console.log(args[rowsArgIndex + 1]);

  Array(+args[rowsArgIndex + 1])
    .fill()
    .forEach((_, index) => {
      lines.push(`Post ${index + 1},${faker.lorem.paragraph()}`);
    });

  fs.writeFileSync(
    __dirname + "/../_data/posts.csv",
    [columns.join(), ...lines].join("\n")
  );
})();
