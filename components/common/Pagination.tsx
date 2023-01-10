import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Button, HStack, IconButton } from "@chakra-ui/react";
type Direction = "First" | "Prev" | "Next" | "Last";
type onClickPaginateHandlers = `onClick${Direction}Paginate`;
type ComponentProps = {
  currentPage: number;
  lastPaginateIndex: number;
  currentPaginateIndex: number;
  lastPaginateIndexRemainder: number;
  lastPageNumber: number;
  onClickCurrentPage: (i: number) => void;
} & {
  [key in onClickPaginateHandlers]: () => void;
};
export default function Pagination({
  currentPage,
  currentPaginateIndex,
  lastPageNumber,
  onClickFirstPaginate,
  onClickLastPaginate,
  onClickNextPaginate,
  onClickPrevPaginate,
  onClickCurrentPage,
}: ComponentProps) {
  const lastPaginateIndex = Math.ceil(lastPageNumber / 5) - 1;
  const lastPaginateIndexRemainder = lastPageNumber - 5 * lastPaginateIndex;
  return (
    <HStack w={"100%"} justify="center" mt="10" gap="5">
      <HStack>
        <IconButton
          aria-label="move first paginate"
          icon={<ArrowLeftIcon h={3} w={3} />}
          disabled={currentPaginateIndex === 0}
          onClick={onClickFirstPaginate}
          data-cy="paginateFirst"
        />
        <IconButton
          aria-label="move previous paginate"
          icon={<ChevronLeftIcon h={6} w={6} />}
          disabled={currentPaginateIndex === 0}
          onClick={onClickPrevPaginate}
          data-cy="paginatePrev"
        />
      </HStack>
      <HStack>
        {new Array(
          currentPaginateIndex !== lastPaginateIndex
            ? 5
            : lastPaginateIndexRemainder
        )
          .fill(0)
          .map((v, i) => (
            <Button
              aria-label={`search ${currentPaginateIndex * 5 + (i + 1)} page`}
              key={currentPaginateIndex * 5 + (i + 1)}
              onClick={() => onClickCurrentPage(i)}
              colorScheme={
                currentPage === currentPaginateIndex * 5 + (i + 1)
                  ? "blue"
                  : "gray"
              }
            >
              {currentPaginateIndex * 5 + (i + 1)}
            </Button>
          ))}
      </HStack>
      <HStack>
        <IconButton
          aria-label="move next paginate"
          icon={<ChevronRightIcon h={6} w={6} />}
          disabled={currentPaginateIndex === lastPaginateIndex}
          onClick={onClickNextPaginate}
          data-cy="paginateNext"
        />
        <IconButton
          aria-label="move last paginate"
          disabled={currentPaginateIndex === lastPaginateIndex}
          icon={<ArrowRightIcon h={3} w={3} />}
          onClick={onClickLastPaginate}
          data-cy="paginateLast"
        />
      </HStack>
    </HStack>
  );
}
