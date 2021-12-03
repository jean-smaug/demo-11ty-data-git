const octokit = require("../config/octokit");

const owner = "jean-smaug";
const repo = "demo-11ty-data-git";

(async () => {
  try {
    const { data: masterBranch } = await octokit.rest.repos.getBranch({
      owner,
      repo,
      branch: "master",
    });

    const { data: currentFile } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: "_data/posts.csv",
    });

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
      content: Buffer.from(JSON.stringify({ fzefz: "zeezfzefez" })).toString(
        "base64"
      ),
      message: "Data update",
      branch: `${newBranch}`,
      sha: masterBranch.commit.sha,
    });
  } catch (error) {
    console.log("🚀 ~ file: test.js ~ line 33 ~ error", error);
  }
})();
