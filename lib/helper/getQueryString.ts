import { RepositoryQueryConfig } from "@customTypes/repository";

const getQueryString = (config: RepositoryQueryConfig) => {
  return new URLSearchParams(config).toString();
};

export default getQueryString;
