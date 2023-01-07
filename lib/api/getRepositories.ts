import {
  RepositoryQueryConfig,
  SearchRepositoriesResponse,
} from "@customTypes/repository";

import { getQueryString } from "../queryString";
import axiosInstance from "./axiosInstance";

const getRepositories = async (queryConfig: RepositoryQueryConfig) => {
  return await axiosInstance.get<SearchRepositoriesResponse>(
    `repositories?${getQueryString(queryConfig)}`
  );
};

export default getRepositories;
