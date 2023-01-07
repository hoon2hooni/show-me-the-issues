import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  PopoverContent,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
export default function Home() {
  return (
    <div>
      <Head>
        <title>보일러 플레이트</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <VStack
          height={"100vh"}
          justify="center"
          align="center"
          px="20"
          gap={5}
        >
          <Heading mb={5} fontWeight={"extrabold"}>
            Show Me The Issues
          </Heading>
          <HStack gap={"5"} w={"100%"}>
            {[1, 2, 3, 4].map((k) => (
              <Card flex="1" key={k} pos={"relative"}>
                <CardBody>
                  <Text>레포이름</Text>
                </CardBody>
                <IconButton
                  aria-label="delete repository"
                  colorScheme={"red"}
                  pos={"absolute"}
                  top={"3"}
                  right={"3"}
                  w={"auto"}
                  size="xs"
                  icon={<DeleteIcon w={3} h={3} />}
                ></IconButton>
              </Card>
            ))}
          </HStack>
          <Box
            alignSelf={"flex-start"}
            pos={"relative"}
            w={"xl"}
            zIndex={20}
            bg={"white"}
          >
            <Input marginTop={"30"} px="8" />
            <VStack
              w={"100%"}
              pos={"absolute"}
              top={20}
              bg={"white"}
              py={"2"}
              px={"4"}
              borderRadius={"base"}
              border="1px solid"
              borderColor={"gray.300"}
            >
              {[1, 2, 3, 4].map((k) => (
                <Button
                  key={k}
                  pos={"relative"}
                  w={"100%"}
                  colorScheme={"gray"}
                  alignItems={"center"}
                >
                  <Flex h={12} align={"center"} w="100%">
                    <Text fontWeight={"bold"} w="48">
                      time2meet
                      <Badge variant={"subtle"} colorScheme={"red"} ml="2">
                        issues: 10000
                      </Badge>
                    </Text>
                  </Flex>
                </Button>
              ))}
            </VStack>
          </Box>
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
                      millimetres (mm)millimetres (mm)millimetres
                      (mm)millimetres (mm)
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
                <IconButton
                  aria-label="left"
                  icon={<ArrowLeftIcon h={3} w={3} />}
                />
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
                <IconButton
                  aria-label="left"
                  icon={<ArrowRightIcon h={3} w={3} />}
                />
              </HStack>
            </HStack>
          </TableContainer>
        </VStack>
      </main>
    </div>
  );
}
