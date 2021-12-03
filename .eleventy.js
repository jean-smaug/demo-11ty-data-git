const { parse } = require("csv-parse/sync");

module.exports = function (eleventyConfig) {
  // https://www.maxkoehler.com/posts/eleventy-csv/
  eleventyConfig.addDataExtension("csv", (contents) => {
    const records = parse(contents, {
      columns: true,
      skip_empty_lines: true,
    });
    return records;
  });

  return eleventyConfig;
};
