import { DeleteIcon } from "@chakra-ui/icons";
import { Card, CardBody, HStack, IconButton, Text } from "@chakra-ui/react";
export default function RepositoriesCards() {
  return (
    <HStack gap={"5"} w={"100%"}>
      {[1, 2, 3, 4].map((k) => (
        <Card flex="1" key={k} pos={"relative"}>
          <CardBody>
            <Text h={3}>레포이름</Text>
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
  );
}
