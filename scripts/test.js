const octokit = require("../config/octokit");

const owner = "jean-smaug";
const repo = "demo-11ty-data-git";

(async () => {
  const { data: currentFile } = await octokit.rest.repos.getContent({
    owner,
    repo,
    path: "_data/posts.csv",
  });

  console.log(
    "🚀 ~ file: test.js ~ line 15 ~ currentFile",

    Buffer.from(currentFile.content, "base64").toString()
  );
})();
