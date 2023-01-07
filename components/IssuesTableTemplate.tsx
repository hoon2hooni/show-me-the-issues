import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  Badge,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { RepositoryState } from "@customTypes/repository";
import getRepositoryInfoFromURL from "@lib/getRepositoryInfoFromURL";
import useIssues from "@lib/hooks/useIssues";
import { issueQueryBuilder } from "@lib/queryBuilder";
import NextLink from "next/link";
import { useState } from "react";
type ComponentProps = {
  repositories: RepositoryState[];
};

const GITHUB_MAX_RESULT = 1000;
export default function IssuesTable({ repositories }: ComponentProps) {
  const perPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPaginateIndex, setCurrentPaginateIndex] = useState(0);

  const { data, isLoading, isError } = useIssues({
    q: issueQueryBuilder(repositories),
    per_page: `${perPage}`,
    page: `${currentPage}`,
  });

  if (!repositories.length) {
    return (
      <Flex justify="center" align={"center"} grow={1}>
        <Text fontWeight={"extrabold"}>레포지토리를 입력해주세요</Text>
      </Flex>
    );
  }
  if (isLoading) {
    return (
      <Flex justify="center" align={"center"} grow={1}>
        <Spinner />
      </Flex>
    );
  }
  if (isError) {
    return (
      <Flex justify="center" align={"center"} grow={1}>
        <Text fontWeight={"extrabold"}>에러발생</Text>
      </Flex>
    );
  }

  if (!data?.data.total_count) {
    return (
      <Flex justify="center" align={"center"} grow={1}>
        <Text fontWeight={"extrabold"}>이슈가 존재하지 않습니다.</Text>
      </Flex>
    );
  }
  const lastPageNumber = Math.min(
    GITHUB_MAX_RESULT / 10,
    Math.ceil(data.data.total_count / perPage)
  );
  const lastPaginateIndex = Math.floor(lastPageNumber / 5) - 1;
  const lastPaginateIndexRemainder = lastPageNumber - 5 * lastPaginateIndex;

  return (
    <TableContainer w={"100%"}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>상태</Th>
            <Th>레포지토리</Th>
            <Th>제목</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.data.items.map(
            ({ node_id, title, state, labels, html_url }) => (
              <Tr key={node_id}>
                <Td>
                  <Badge
                    variant={"subtle"}
                    colorScheme={state === "open" ? "green" : "red"}
                  >
                    {state}
                  </Badge>
                </Td>
                <Td>
                  <Flex direction={"column"} gap={2} justify={"center"}>
                    <Text fontWeight={"bold"}>
                      {getRepositoryInfoFromURL(html_url).name}
                    </Text>
                    <Text fontWeight={"bold"} fontSize={"xs"}>
                      {" "}
                      {getRepositoryInfoFromURL(html_url).owner}
                    </Text>
                  </Flex>
                </Td>
                <Td>
                  <Link fontSize={"lg"} colorScheme={"teal"}>
                    <NextLink href={html_url}>{title}</NextLink>
                  </Link>
                  <Flex gap={2} align={"center"} mt={2}>
                    {labels.map(({ name, color }) => (
                      <Flex
                        borderColor={`#${color}`}
                        borderWidth={4}
                        borderRadius={4}
                        px={2}
                        py={0.5}
                        color={`#${color}`}
                        key={name}
                        fontWeight={"extrabold"}
                        align={"center"}
                        fontSize={"sm"}
                      >
                        {name}
                      </Flex>
                    ))}
                  </Flex>
                </Td>
              </Tr>
            )
          )}
        </Tbody>
      </Table>
      <HStack w={"100%"} justify="center" mt="10" gap="5">
        <HStack>
          <IconButton
            aria-label="left"
            icon={<ArrowLeftIcon h={3} w={3} />}
            onClick={() => {
              setCurrentPage(1);
              setCurrentPaginateIndex(0);
            }}
          />
          <IconButton
            aria-label="left"
            icon={<ChevronLeftIcon h={6} w={6} />}
            disabled={currentPaginateIndex === 0}
            onClick={() => {
              setCurrentPaginateIndex((prev) => prev - 1);
              setCurrentPage(currentPaginateIndex * 5);
            }}
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
                onClick={() =>
                  setCurrentPage(currentPaginateIndex * 5 + (i + 1))
                }
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
            aria-label="left"
            icon={<ChevronRightIcon h={6} w={6} />}
            disabled={currentPaginateIndex === lastPaginateIndex}
            onClick={() => {
              setCurrentPaginateIndex((prev) => prev + 1);
              setCurrentPage((currentPaginateIndex + 1) * 5 + 1);
            }}
          />
          <IconButton
            aria-label="left"
            icon={<ArrowRightIcon h={3} w={3} />}
            onClick={() => {
              setCurrentPaginateIndex(lastPaginateIndex);
              setCurrentPage(lastPageNumber);
            }}
          />
        </HStack>
      </HStack>
    </TableContainer>
  );
}
