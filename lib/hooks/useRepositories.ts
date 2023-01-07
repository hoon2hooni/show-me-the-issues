import { Repository, RepositoryQueryConfig } from "@customTypes/repository";
import getRepositories from "@lib/api/getRepositories";
import { useQuery } from "@tanstack/react-query";
export default function useRepositories(config: RepositoryQueryConfig) {
  return useQuery({
    queryFn: () => getRepositories(config),
    queryKey: [{ path: "repositories", ...config }],
  });
}
