import { RepositoryState } from "@customTypes/repository";
import { issueQueryBuilder } from "@lib/queryBuilder";
test("test issueQueryBuilder", () => {
  expect(issueQueryBuilder([{ owner: "facebook", name: "react" }])).toBe(
    "repo:facebook/react is:issue"
  );
  expect(
    issueQueryBuilder([
      { owner: "facebook", name: "react" },
      { owner: "microsoft", name: "Typescript" },
    ])
  ).toBe("repo:facebook/react repo:microsoft/Typescript is:issue");
});
