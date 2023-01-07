import { RepositoryQueryConfig } from "@customTypes/repository";

export const getQueryString = (config: RepositoryQueryConfig) => {
  return new URLSearchParams(config).toString();
};
