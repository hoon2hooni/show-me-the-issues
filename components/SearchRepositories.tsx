import {
  Badge,
  Box,
  Button,
  Flex,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RepositoryState } from "@customTypes/repository";
import useDebounce from "@lib/hooks/useDebounce";
import useRepositories from "@lib/hooks/useRepositories";
import { useState } from "react";

type ComponentProps = {
  repositories: RepositoryState[];
  onClickAddRepository: (repository: RepositoryState) => void;
};

export default function SearchRepositories({
  repositories,
  onClickAddRepository,
}: ComponentProps) {
  const [queries, setQueries] = useState("");
  const debouncedQueries = useDebounce(queries, 300);
  const { data, isLoading, isError } = useRepositories({
    q: debouncedQueries,
    per_page: "5",
  });

  return (
    <Box
      alignSelf={"flex-start"}
      pos={"relative"}
      w={"xl"}
      zIndex={20}
      bg={"white"}
    >
      <Input
        marginTop={"30"}
        px="8"
        onChange={(e) => setQueries(e.target.value)}
        value={queries}
      />
      {queries && data && (
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
          {data.data.items.map(({ node_id, name, stargazers_count, owner }) => (
            <Button
              key={node_id}
              pos={"relative"}
              w={"100%"}
              colorScheme={"gray"}
              alignItems={"center"}
              onClick={() => {
                onClickAddRepository({
                  node_id,
                  name,
                  owner: owner.login,
                  stargazers_count,
                });
                setQueries("");
              }}
            >
              <Flex h={12} w="100%" align={"center"}>
                <Flex fontWeight={"bold"} w={"100%"}>
                  {name}
                  <Badge
                    variant={"subtle"}
                    colorScheme={"blue"}
                    ml="2"
                    display={"flex"}
                    alignItems={"center"}
                  >
                    ⭐: {stargazers_count}
                  </Badge>
                  <Text
                    ml={"auto"}
                    fontWeight={"medium"}
                    alignSelf={"flex-end"}
                  >
                    {owner.login}
                  </Text>
                </Flex>
              </Flex>
            </Button>
          ))}
        </VStack>
      )}
    </Box>
  );
}
