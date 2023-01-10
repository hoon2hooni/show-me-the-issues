import { expect, test } from "@jest/globals";
import { getRepositoryInfoFromURL } from "@lib/helper";
test("test getRepositoryInfoFromURL", () => {
  expect(
    getRepositoryInfoFromURL(
      "https://github.com/microsoft/TypeScript/issues/52118"
    )
  ).toEqual({ owner: "microsoft", name: "TypeScript" });
  expect(
    getRepositoryInfoFromURL("https://github.com/facebook/react/issues/25949")
  ).toEqual({ owner: "facebook", name: "react" });
});
