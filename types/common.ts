export type QueryConfig = {
  q: string;
  order?: "desc" | "asc";
  per_page?: `${number}`;
  page?: `${number}`;
};

export type SearchResponse<T = any[]> = {
  total_count: number;
  incomplete_results: boolean;
  items: T;
};
