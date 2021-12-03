const octokit = require("../config/octokit");

const owner = "jean-smaug";
const repo = "demo-11ty-data-git";

export default async function handler(req, res) {
  if (!req.body) {
    res.status(401).json({
      message: "Body can't be empty",
    });
  }
  try {
    octokit.rest.pulls.create({
      repo,
      owner,
      base: "master",
      head: new Date().toDateString(),
    });
  } catch (error) {
    res.status(500).json(error);
  }
}
