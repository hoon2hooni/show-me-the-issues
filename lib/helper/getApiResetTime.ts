import { AxiosGithub403Error } from "@customTypes/common";

export default function getApiResetTime<T>(
  e: AxiosGithub403Error<T>,
  date = new Date()
) {
  const resetTime = e.response.headers["x-ratelimit-reset"];
  const remainTime = resetTime * 1000 - date.getTime();
  const remainSeconds = Math.ceil(remainTime / 1000);
  return remainSeconds;
}
