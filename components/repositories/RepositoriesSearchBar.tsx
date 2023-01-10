import { SearchIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Flex,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useOutsideClick } from "@chakra-ui/react";
import { RepositoryState } from "@customTypes/repository";
import { useDebounce, useRepositories } from "@lib/hooks";
import { useRef, useState } from "react";
type ComponentProps = {
  repositories: RepositoryState[];
  onClickAddRepository: (repository: RepositoryState) => void;
};

export default function RepositoriesSearchBar({
  onClickAddRepository,
}: ComponentProps) {
  const [queries, setQueries] = useState("");
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
  const autocompleteRef = useRef(null);
  useOutsideClick({
    ref: autocompleteRef,
    handler: () => setIsAutocompleteOpen(false),
  });
  const debouncedQueries = useDebounce(queries, 300);
  const { data } = useRepositories({
    q: debouncedQueries,
    per_page: "5",
  });

  return (
    <Box
      alignSelf={"center"}
      pos={"relative"}
      w={"xl"}
      zIndex={20}
      bg={"white"}
      ref={autocompleteRef}
    >
      <SearchIcon pos={"absolute"} top={3} left={3} zIndex={30} />
      <Input
        px="8"
        onChange={(e) => {
          setQueries(e.target.value);
          setIsAutocompleteOpen(true);
        }}
        value={queries}
        onFocus={() => setIsAutocompleteOpen(true)}
        data-cy="input"
      />
      {isAutocompleteOpen && data && (
        <VStack
          w={"100%"}
          pos={"absolute"}
          top={12}
          bg={"white"}
          py={"2"}
          px={"4"}
          borderRadius={"base"}
          border="1px solid"
          borderColor={"gray.300"}
        >
          {data.data.items.map(
            ({ node_id, name, stargazers_count, owner }, index) => (
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
                  setIsAutocompleteOpen(false);
                }}
                data-cy={`autocomplete-${index}`}
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
            )
          )}
        </VStack>
      )}
    </Box>
  );
}
