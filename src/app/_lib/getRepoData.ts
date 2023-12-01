"use server";

import { Octokit } from "octokit";

export const getRepoData = async (accessToken: string) => {
  const octokit = new Octokit({ auth: accessToken });

  const owner = "takanorip"; // 所有者(ユーザー/組織)
  const repo = "blog"; // リポジトリ
  const branch = "master"; // ブランチ

  const latestCommit = (
    await octokit.rest.repos.getBranch({ owner, repo, branch })
  ).data.commit;

  const src = (
    await octokit.rest.git.getTree({
      owner,
      repo,
      tree_sha: latestCommit.sha,
      recursive: "true",
    })
  ).data.tree;

  // const posts = (
  //   await octokit.rest.git.getTree({ owner, repo, tree_sha: src.sha })
  // ).data.tree;

  console.log(src);

  // const blob = (
  //   await octokit.rest.git.getBlob({
  //     owner,
  //     repo,
  //     file_sha: files.find((file) => file.path === "README.md")?.sha!,
  //   })
  // ).data;
  // const content = Buffer.from(blob.content, "base64").toString("utf-8");

  return src;
};
