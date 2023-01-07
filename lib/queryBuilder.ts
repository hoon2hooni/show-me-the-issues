type RepositoryInfos = {
  owner: string;
  name: string;
}[];
export function issueQueryBuilder(array: RepositoryInfos) {
  const repoQueries = array.map(({ owner, name }) => `repo:${owner}/${name}`);
  //repo:fullname repo:fullname
  return encodeURIComponent(repoQueries.join(" ") + " is:issue");
}
