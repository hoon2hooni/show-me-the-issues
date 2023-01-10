import { useToast } from "@chakra-ui/react";
import { AxiosGithub403Error, QueryConfig } from "@customTypes/common";
import getSearch from "@lib/api/getSearch";
import { getApiResetTime } from "@lib/helper";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export default function useSearch<
  TPath extends string,
  TQueryConfig extends QueryConfig,
  TFn extends ReturnType<typeof getSearch>
>(path: TPath, config: TQueryConfig, queryFn: TFn) {
  const toast = useToast();
  return useQuery({
    queryFn: () => queryFn(config),
    queryKey: [{ path, ...config }],
    enabled: !!config.q,
    retry: 0,
    onError: (error) => {
      if (isAxiosError(error)) {
        /**
         * github search요청의 경우 요청량에 제한이 있습니다.
         * 요청량이 초과될 경우 403에러를 발생합니다.
         * 관련 링크 https://docs.github.com/ko/rest/overview/resources-in-the-rest-api?apiVersion=2022-11-28#exceeding-the-rate-limit
         */
        if (error.response?.status === 403) {
          const e = error as AxiosGithub403Error<{ message: string }>;
          const remainSec = getApiResetTime(e, new Date());
          toast({
            status: "error",
            title: `데이터 요청량이 많습니다. ${remainSec}초 뒤에 다시 시도해주세요`,
          });
          return;
        }
        if (error.response?.status === 500) {
          toast({
            status: "error",
            title: "github 서버에 문제가 있습니다. 잠시후에 다시 시도해주세요!",
          });
          return;
        }
        toast({
          status: "error",
          title: "잘못된 시도를 하시는 군요. 다시 시도해주세요",
        });
        return;
      }
      toast({
        status: "error",
        title: "알수없는 에러입니다.",
      });
      return;
    },
  });
}
