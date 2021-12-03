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

  // https://github.com/11ty/eleventy/issues/768#issuecomment-553611038
  eleventyConfig.addPassthroughCopy({
    "node_modules/bootstrap/dist/css/bootstrap.min.css": "bootstrap.min.css",
    "node_modules/bootstrap/dist/js/bootstrap.min.js": "bootstrap.min.js",
  });

  return eleventyConfig;
};
