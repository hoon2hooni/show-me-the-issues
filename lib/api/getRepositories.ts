import {
  RepositoryQueryConfig,
  SearchRepositoriesResponse,
} from "@customTypes/repository";

import getSearch from "./getSearch";

const getRepositories = getSearch<
  RepositoryQueryConfig,
  SearchRepositoriesResponse
>("repositories");

export default getRepositories;
