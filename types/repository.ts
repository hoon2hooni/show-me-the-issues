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
