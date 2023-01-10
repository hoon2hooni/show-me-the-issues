import { expect, test } from "@jest/globals";
import { getQueryString } from "@lib/helper";

test("test querystring", () => {
  expect(getQueryString({ q: "123", page: "1" })).toBe("q=123&page=1");
  expect(getQueryString({ q: "한글" })).toBe("q=%ED%95%9C%EA%B8%80");
});
