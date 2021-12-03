import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: "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",
});

const owner = "jean-smaug";
const repo = "demo-11ty-data-git";

export default async function handler(req, res) {
  if (!req.body) {
    res.status(401).json({
      message: "Body can't be empty",
    });
  }

  try {
    const { data: currentFile } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: "_data/posts.json",
    });

    const { status } = await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: "_data/posts.json",
      content: Buffer.from(JSON.stringify(req.body)).toString("base64"),
      message: "nouveau commit",
      sha: currentFile.sha,
    });

    res.status(status).end();
  } catch (error) {
    res.status(500).json(error);
  }
}
