import getRepositoryInfoFromURL from "@lib/getRepositoryInfoFromURL";
test("test issueQueryBuilder", () => {
  expect(
    getRepositoryInfoFromURL(
      "https://github.com/microsoft/TypeScript/issues/52118"
    )
  ).toEqual({ owner: "microsoft", name: "TypeScript" });
  expect(
    getRepositoryInfoFromURL("https://github.com/facebook/react/issues/25949")
  ).toEqual({ owner: "facebook", name: "react" });
});
