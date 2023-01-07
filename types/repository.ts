export type SearchRepositoriesResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
};

export type Repository = {
  node_id: string;
  owner: Owner;
  name: string;
  full_name: string;
  stargazers_count: number;
};

export type Owner = {
  login: string;
};

export type RepositoryState = Omit<Repository, "owner" | "full_name"> & {
  owner: string;
};

export type RepositoryQueryConfig = {
  q: string;
  sort?: "stars" | "forks" | "help-wanted-issues";
  order?: "desc" | "asc";
  per_page?: `${number}`;
  page?: `${number}`;
};
