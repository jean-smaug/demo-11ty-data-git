const { Octokit } = require("octokit");

const octokit = new Octokit({
  auth: "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",
});

module.exports = octokit;
