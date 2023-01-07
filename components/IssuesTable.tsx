import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import {
  Badge,
  Button,
  HStack,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
export default function IssuesTable() {
  return (
    <TableContainer w={"100%"}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>상태</Th>
            <Th>레포지토리</Th>
            <Th>제목</Th>
            <Th>라벨</Th>
          </Tr>
        </Thead>
        <Tbody>
          {new Array(10).fill(1).map((_, idx) => (
            <Tr key={idx}>
              <Td>
                <Badge variant={"subtle"} colorScheme={"green"}>
                  open
                </Badge>
              </Td>
              <Td>typescript</Td>
              <Td>
                millimetres (mm)millimetres (mm)millimetres (mm)millimetres (mm)
              </Td>
              <Td>
                <Badge variant={"subtle"} colorScheme={"green"}>
                  bug
                </Badge>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <HStack w={"100%"} justify="center" mt="10" gap="5">
        <HStack>
          <IconButton aria-label="left" icon={<ArrowLeftIcon h={3} w={3} />} />
          <IconButton
            aria-label="left"
            icon={<ChevronLeftIcon h={6} w={6} />}
          />
        </HStack>
        <HStack>
          {[1, 2, 3, 4, 5].map((v) => (
            <Button aria-label={`${v}`} key={v}>
              {v}
            </Button>
          ))}
        </HStack>
        <HStack>
          <IconButton
            aria-label="left"
            icon={<ChevronRightIcon h={6} w={6} />}
          />
          <IconButton aria-label="left" icon={<ArrowRightIcon h={3} w={3} />} />
        </HStack>
      </HStack>
    </TableContainer>
  );
}
