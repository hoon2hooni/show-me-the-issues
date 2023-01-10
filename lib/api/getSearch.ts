import { QueryConfig, SearchResponse } from "@customTypes/common";
import { getQueryString } from "@lib/helper";

import githubSearchAxiosInstance from "./githubSearchAxiosInstance";

const getSearch = <
  TQueryConfig extends QueryConfig,
  TSearchResponse extends SearchResponse
>(
  path: string
) => {
  return (queryConfig: TQueryConfig) =>
    githubSearchAxiosInstance.get<TSearchResponse>(
      `${path}?${getQueryString(queryConfig)}`
    );
};

export default getSearch;
