import { QueryConfig, SearchResponse } from "./common";

export type SearchIssuesResponse = SearchResponse<Issue[]>;

export type Issue = {
  title: string;
  node_id: string;
  html_url: string;
  state: "open" | "closed";
  labels: Label[];
};

export type IssueQueryConfig = QueryConfig & {
  sort?: "created" | "updated";
};

export type Label = {
  color: string;
  name: string;
};
