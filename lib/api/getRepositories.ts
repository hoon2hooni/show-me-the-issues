import { Repository, RepositoryQueryConfig } from "@customTypes/repository";

import { getQueryString } from "../queryString";
import axiosInstance from "./axiosInstance";

const getRepositories = async (queryConfig: RepositoryQueryConfig) => {
  return await axiosInstance.get<Repository>(
    `repositories?${getQueryString(queryConfig)}`
  );
};

export default getRepositories;
