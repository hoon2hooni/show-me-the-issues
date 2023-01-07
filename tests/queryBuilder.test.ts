import { issueQueryBuilder } from "@lib/queryBuilder";

test("test issueQueryBuilder", () => {
  expect(issueQueryBuilder([{ owner: "facebook", name: "react" }])).toBe(
    encodeURIComponent("repo:facebook/react is:issue")
  );
  expect(
    issueQueryBuilder([
      { owner: "facebook", name: "react" },
      { owner: "microsoft", name: "Typescript" },
    ])
  ).toBe(
    encodeURIComponent("repo:facebook/react repo:microsoft/Typescript is:issue")
  );
});
