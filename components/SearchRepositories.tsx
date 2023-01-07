import {
  Badge,
  Box,
  Button,
  Flex,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
export default function SearchRepositories() {
  return (
    <>
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
    </>
  );
}
