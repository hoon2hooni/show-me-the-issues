import { QueryConfig, SearchResponse } from "@customTypes/common";
import { getQueryString } from "lib/helper";

import axiosInstance from "./axiosInstance";

const getSearch = <
  TQueryConfig extends QueryConfig,
  TSearchResponse extends SearchResponse
>(
  path: string
) => {
  return (queryConfig: TQueryConfig) =>
    axiosInstance.get<TSearchResponse>(
      `${path}?${getQueryString(queryConfig)}`
    );
};

export default getSearch;
