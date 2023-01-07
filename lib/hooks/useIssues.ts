import { IssueQueryConfig } from "@customTypes/issue";
import getIssues from "@lib/api/getIssues";
import { useQuery } from "@tanstack/react-query";
export default function useIssues(config: IssueQueryConfig) {
  return useQuery({
    queryFn: () => getIssues(config),
    queryKey: [{ path: "issues", ...config }],
    enabled: !!config.q,
    retry: 0,
  });
}
