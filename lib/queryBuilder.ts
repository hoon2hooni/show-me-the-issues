import { RepositoryState } from "@customTypes/repository";

export function issueQueryBuilder<
  T extends Pick<RepositoryState, "name" | "owner">[]
>(array: T) {
  if (!array.length) {
    return "";
  }
  const repoQueries = array.map(({ owner, name }) => `repo:${owner}/${name}`);
  return repoQueries.join(" ") + " is:issue";
}
