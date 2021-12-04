# Demo : store data into git repo

This project is a POC of using a git repo to :

- store data
- allow a user to post data through PRs
- allow the repo owner to validate inserted data through PR

## Setup project

This project use 11ty, so it require Node.js. It use Yarn as package manager.

Create a `.env` from `.env.example` and fill `GITHUB_TOKEN` with you own token.

## How does it works ?

All data are stored under the `_data` folder. So, we need to give users a way to post data because they'll not use git to update content.

There is an API under `api/new-data.ts` that allow users to push data using a POST request. This will create a PR that the repo owner can accept or not.

When the PR is merged, the project can be re-deployed using Vercel, Netlify or any other tool.

This mean each time a user is inserting data, the project will be rebuilt. Thanks to 11ty, it can be done in less than a minute.

## Don't use it if

- You need your users to quickly access data
- You have a large collection of data
- You don't have SEO problematics
