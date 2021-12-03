import octokit from "../config/octokit";

const owner = "jean-smaug";
const repo = "demo-11ty-data-git";

export default async function handler(req, res) {
  if (!req.body) {
    res.status(401).json({
      message: "Body can't be empty",
    });
  }

  try {
    const [{ data: masterBranch }, { data: currentFile }] = await Promise.all([
      octokit.rest.repos.getBranch({
        owner,
        repo,
        branch: "master",
      }),
      octokit.rest.repos.getContent({
        owner,
        repo,
        path: "_data/posts.csv",
      }),
    ]);

    const newBranch = Date.now();
    await octokit.rest.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${newBranch}`,
      sha: masterBranch.commit.sha,
    });

    const { status } = await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: "_data/posts.csv",
      content: Buffer.from(JSON.stringify(req.body)).toString("base64"),
      message: "Data update",
      sha: currentFile.sha,
      branch: `${newBranch}`,
    });

    res.status(status).end();
  } catch (error) {
    res.status(500).json(error);
  }
}
