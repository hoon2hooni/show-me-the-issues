import { QueryConfig, SearchResponse } from "./common";

export type SearchRepositoriesResponse = SearchResponse<Repository[]>;

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

export type RepositoryQueryConfig = QueryConfig & {
  sort?: "stars";
};
