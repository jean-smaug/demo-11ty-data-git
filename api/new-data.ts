import octokit from "../config/octokit";

const owner = "jean-smaug";
const repo = "demo-11ty-data-git";

export default async function handler(req, res) {
  if (typeof req.body !== "string") {
    return res.status(401).json({
      message: "Body must be plain text",
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

    const newBranch = `${Date.now()}`;
    await octokit.rest.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${newBranch}`,
      sha: masterBranch.commit.sha,
    });

    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: "_data/posts.csv",
      content: Buffer.from(
        `${Buffer.from(currentFile.content, "base64").toString()}\n${req.body}`
      ).toString("base64"),
      message: "Data update",
      sha: currentFile.sha,
      branch: newBranch,
    });

    await octokit.rest.pulls.create({
      owner,
      repo,
      base: "master",
      head: newBranch,
      title: "New data",
    });

    res.status(201).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
