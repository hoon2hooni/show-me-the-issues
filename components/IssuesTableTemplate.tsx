import { Button, Spinner, Text } from "@chakra-ui/react";
import CenterTableWrapper from "@components/CenterTableWrapper";
import IssuesTable from "@components/IssuesTable";
import Pagination from "@components/Pagination";
import { RepositoryState } from "@customTypes/repository";
import useIssues from "@lib/hooks/useIssues";
import { issueQueryBuilder } from "@lib/queryBuilder";
import { useState } from "react";
type ComponentProps = {
  repositories: RepositoryState[];
};

const GITHUB_MAX_RESULT = 1000;
const PER_PAGINATE = 5;
export default function IssuesTableTemplate({ repositories }: ComponentProps) {
  const perPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPaginateIndex, setCurrentPaginateIndex] = useState(0);

  const { data, isLoading, isError, refetch, error } = useIssues({
    q: issueQueryBuilder(repositories),
    per_page: `${perPage}`,
    page: `${currentPage}`,
  });

  if (!repositories.length) {
    return (
      <CenterTableWrapper>
        <Text fontWeight={"extrabold"}>레포지토리를 입력해주세요</Text>
      </CenterTableWrapper>
    );
  }
  if (isLoading) {
    return (
      <CenterTableWrapper>
        <Spinner />
      </CenterTableWrapper>
    );
  }
  if (isError) {
    return (
      <CenterTableWrapper>
        <Text fontWeight={"extrabold"}>에러발생</Text>
        <Button onClick={() => refetch()}>데이터 다시 불러오기</Button>
      </CenterTableWrapper>
    );
  }

  if (!data?.data.total_count) {
    return (
      <CenterTableWrapper>
        <Text fontWeight={"extrabold"}>이슈가 존재하지 않습니다.</Text>
      </CenterTableWrapper>
    );
  }

  const lastPageNumber = Math.min(
    GITHUB_MAX_RESULT / perPage,
    Math.ceil(data.data.total_count / perPage)
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
