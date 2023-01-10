export default function getRepositoryInfoFromURL(url: string) {
  const owner = new URL(url).pathname.split("/")[1];
  const repoName = new URL(url).pathname.split("/")[2];

  return { owner, name: repoName };
}
