import { AxiosError, AxiosResponse } from "axios";

type XRateLimit = "limit" | "remaining" | "used" | "reset";
type XRateLimitKey = `x-ratelimit-${XRateLimit}`;
export type Github403Error = {
  headers: {
    [key in XRateLimitKey]: number;
  };
};

export type AxiosGithub403ErrorResponse<T> = AxiosResponse<T> & Github403Error;

export type AxiosGithub403Error<T> = AxiosError<T> & {
  response: AxiosGithub403ErrorResponse<T>;
};

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
