import {
  Badge,
  Flex,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Issue } from "@customTypes/issue";
import { getRepositoryInfoFromURL } from "@lib/helper";
import NextLink from "next/link";
export default function IssuesTable({ issues }: { issues: Issue[] }) {
  return (
    <TableContainer w={"100%"} data-cy="table">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>상태</Th>
            <Th>레포지토리</Th>
            <Th>제목</Th>
          </Tr>
        </Thead>
        <Tbody>
          {issues.map(({ node_id, title, state, labels, html_url }, index) => (
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
                <Link
                  fontSize={"lg"}
                  as={NextLink}
                  target={"_blank"}
                  color={"blue.500"}
                  href={html_url}
                  _visited={{ color: "pink.700" }}
                  data-cy={`link${index}`}
                >
                  {title}
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
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
