import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Badge, Button, HStack, IconButton } from "@chakra-ui/react";
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
  const lastPaginateIndex = Math.floor(lastPageNumber / 5) - 1;
  const lastPaginateIndexRemainder = lastPageNumber - 5 * lastPaginateIndex;
  return (
    <HStack w={"100%"} justify="center" mt="10" gap="5">
      <HStack>
        <IconButton
          aria-label="first paginate"
          icon={<ArrowLeftIcon h={3} w={3} />}
          onClick={onClickFirstPaginate}
        />
        <IconButton
          aria-label="previous paginate"
          icon={<ChevronLeftIcon h={6} w={6} />}
          disabled={currentPaginateIndex === 0}
          onClick={onClickPrevPaginate}
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
              aria-label={`${v}`}
              key={v}
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
          aria-label="next paginate"
          icon={<ChevronRightIcon h={6} w={6} />}
          disabled={currentPaginateIndex === lastPaginateIndex}
          onClick={onClickNextPaginate}
        />
        <IconButton
          aria-label="last paginate"
          icon={<ArrowRightIcon h={3} w={3} />}
          onClick={onClickLastPaginate}
        />
      </HStack>
    </HStack>
  );
}
