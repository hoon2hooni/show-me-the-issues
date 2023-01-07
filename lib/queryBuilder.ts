type RepositoryName = {
  owner: string;
  name: string;
};

export function issueQueryBuilder(array: RepositoryName[]) {
  const repoQueries = array.map(({ owner, name }) => `repo:${owner}/${name}`);
  //repo:fullname repo:fullname
  return encodeURIComponent(repoQueries.join(" ") + " is:issue");
}
