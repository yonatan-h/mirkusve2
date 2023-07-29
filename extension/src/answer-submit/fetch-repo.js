import robustFetch from '../utils/robust-fetch.js';

//node dto-ish hint
/*
  mode: "100644"
  path: "dummy/count-number-of-maximum-bitwise-or-subsets_5.py"
  sha: "213b70e355e6368293fbb61026acc65eaea86aea"
  size: 509
  type: "blob" or "tree"
  url: "https://api.github.com/repos/yonatan-h/competitive-programming/git/blobs/213b70e355e6368293fbb61026acc65eaea86aea"
*/

export default async function fetchRepo() {
  const fetchOptions = await makeFetchOptions();
  const sha = await getSha(fetchOptions);
  const tree = await getTree(sha, fetchOptions);
  const folderPaths = ['/']; //all start with /
  const filePaths = [];

  for (const node of tree) {
    if (node.type === 'blob') filePaths.push(node.path);
    else if (node.type === 'tree') folderPaths.push('/' + node.path);
  }

  return { folderPaths, filePaths };
}

async function makeFetchOptions() {
  const { token } = await chrome.storage.local.get('token');

  const fetchOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetchOptions;
}

async function getSha(fetchOptions) {
  const { userName, repoName } = await chrome.storage.local.get([
    'userName',
    'repoName',
  ]);

  const url = `https://api.github.com/repos/${userName}/${repoName}/commits/main`;
  const data = await robustFetch(url, fetchOptions);
  return data.sha;
}

async function getTree(sha, fetchOptions) {
  const { userName, repoName } = await chrome.storage.local.get([
    'userName',
    'repoName',
  ]);

  const treeUrl = `https://api.github.com/repos/${userName}/${repoName}/git/trees/${sha}?recursive=1`;
  const { tree } = await robustFetch(treeUrl, fetchOptions);

  return tree;
}
