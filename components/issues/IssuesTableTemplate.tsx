import { Button, Spinner, Text } from "@chakra-ui/react";
import { FixedHeightCenterWrapper, Pagination } from "@components/common";
import { IssuesTable } from "@components/issues";
import { RepositoryState } from "@customTypes/repository";
import { issueQueryBuilder } from "@lib/helper";
import { useIssues } from "@lib/hooks";
import { useEffect, useState } from "react";
type ComponentProps = {
  repositories: RepositoryState[];
};

/**
 * github rest api의  search요청의 경우
 * 처음 1000개 데이터만 요청이 가능합니다.
 * https://docs.github.com/v3/search/
 */
const SEARCH_RESULTS_MAX_NUMBER = 1000;

const PER_PAGINATE = 5;
const PER_PAGE = 5;

export default function IssuesTableTemplate({ repositories }: ComponentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPaginateIndex, setCurrentPaginateIndex] = useState(0);

  const { data, isLoading, isError, refetch, fetchStatus } = useIssues({
    q: issueQueryBuilder(repositories),
    per_page: `${PER_PAGE}`,
    page: `${currentPage}`,
    sort: "created",
  });

  //검색한 레포지토리가 변경되었을때 초기화 해줍니다.
  useEffect(() => {
    setCurrentPage(1);
    setCurrentPaginateIndex(0);
  }, [repositories.length]);

  if (!repositories.length) {
    return (
      <FixedHeightCenterWrapper>
        <Text fontWeight={"extrabold"}>레포지토리를 입력해주세요</Text>
      </FixedHeightCenterWrapper>
    );
  }
  if (fetchStatus === "paused") {
    return (
      <FixedHeightCenterWrapper>
        <Text fontWeight={"extrabold"}>네트워크 연결이 원할하지 않습니다.</Text>
        <Button onClick={() => refetch()}>다시 불러오기</Button>
      </FixedHeightCenterWrapper>
    );
  }
  if (isLoading) {
    return (
      <FixedHeightCenterWrapper>
        <Spinner />
      </FixedHeightCenterWrapper>
    );
  }
  if (isError) {
    return (
      <FixedHeightCenterWrapper>
        <Text fontWeight={"extrabold"}>에러가 발생했습니다.</Text>
        <Button onClick={() => refetch()}>다시 불러오기</Button>
      </FixedHeightCenterWrapper>
    );
  }

  if (!data?.data.total_count) {
    return (
      <FixedHeightCenterWrapper>
        <Text fontWeight={"extrabold"}>이슈가 존재하지 않습니다.</Text>
      </FixedHeightCenterWrapper>
    );
  }

  const lastPageNumber = Math.min(
    SEARCH_RESULTS_MAX_NUMBER / PER_PAGE,
    Math.ceil(data.data.total_count / PER_PAGE)
  );
  const lastPaginateIndex = Math.floor(lastPageNumber / PER_PAGINATE) - 1;
  const lastPaginateIndexRemainder =
    lastPageNumber - PER_PAGINATE * lastPaginateIndex;

  const handleClickFirstPaginate = () => {
    setCurrentPage(1);
    setCurrentPaginateIndex(0);
  };

  const handleClickPrevPaginate = () => {
    setCurrentPaginateIndex((prev) => prev - 1);
    setCurrentPage(currentPaginateIndex * PER_PAGINATE);
  };

  const handleClickNextPaginate = () => {
    setCurrentPaginateIndex((prev) => prev + 1);
    setCurrentPage((currentPaginateIndex + 1) * PER_PAGINATE + 1);
  };

  const handleClickLastPaginate = () => {
    setCurrentPaginateIndex(lastPaginateIndex);
    setCurrentPage(lastPageNumber);
  };
  const handleClickCurrentPage = (i: number) => {
    setCurrentPage(currentPaginateIndex * PER_PAGINATE + (i + 1));
  };

  return (
    <>
      <IssuesTable issues={data.data.items} />
      <Pagination
        currentPage={currentPage}
        currentPaginateIndex={currentPaginateIndex}
        lastPageNumber={lastPageNumber}
        lastPaginateIndex={lastPaginateIndex}
        onClickCurrentPage={handleClickCurrentPage}
        onClickFirstPaginate={handleClickFirstPaginate}
        onClickPrevPaginate={handleClickPrevPaginate}
        onClickNextPaginate={handleClickNextPaginate}
        onClickLastPaginate={handleClickLastPaginate}
        lastPaginateIndexRemainder={lastPaginateIndexRemainder}
      />
    </>
  );
}
