import { RepositoryQueryConfig } from "@customTypes/repository";
import getRepositories from "@lib/api/getRepositories";

import useSearch from "./useSearch";
export default function useRepositories(config: RepositoryQueryConfig) {
  return useSearch("repositories", config, getRepositories);
}
