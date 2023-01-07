export type SearchRepositoriesResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: Issue[];
};

export type Issue = {
  title:string;
  node_id: string;
  html_url: string;
  state: "open" | "closed";
};
