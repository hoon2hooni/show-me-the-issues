import { IssueQueryConfig } from "@customTypes/issue";
import getIssues from "@lib/api/getIssues";

import useSearch from "./useSearch";
export default function useIssues(config: IssueQueryConfig) {
  return useSearch("issues", config, getIssues);
}
