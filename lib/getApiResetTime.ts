import { AxiosGithub403Error } from "@customTypes/common";

export default function getApiResetTime<T>(e: AxiosGithub403Error<T>) {
  const resetTime = e.response.headers["x-ratelimit-reset"];
  const remainTime = resetTime * 1000 - new Date().getTime();
  const remainSeconds = Math.ceil(remainTime / 1000);
  return remainSeconds;
}
