import { IssueQueryConfig, SearchIssuesResponse } from "@customTypes/issue";

import getSearch from "./getSearch";

const getIssues = getSearch<IssueQueryConfig, SearchIssuesResponse>("issues");

export default getIssues;
