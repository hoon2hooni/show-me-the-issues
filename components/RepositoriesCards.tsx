import { DeleteIcon } from "@chakra-ui/icons";
import { Card, CardBody, HStack, IconButton, Text } from "@chakra-ui/react";
import { RepositoryState } from "@customTypes/repository";

type ComponentProps = {
  repositories: RepositoryState[];
  onClickDeleteRepository: (id: string) => () => void;
};

export default function RepositoriesCards({
  repositories,
  onClickDeleteRepository,
}: ComponentProps) {
  return (
    <HStack gap={"5"} w={"100%"}>
      {repositories.map(({ node_id, name, owner, stargazers_count }) => (
        <Card w={240} key={node_id} pos={"relative"}>
          <CardBody>
            <Text fontWeight={"extrabold"} h={3}>
              {name}
            </Text>
            <Text fontSize={"sm"} fontWeight={"bold"} mt={3} h={3}>
              {owner}
            </Text>
          </CardBody>
          <IconButton
            aria-label="delete repository"
            colorScheme={"red"}
            pos={"absolute"}
            top={"2"}
            right={"2"}
            w={"auto"}
            size="xs"
            icon={<DeleteIcon w={3} h={3} />}
            onClick={onClickDeleteRepository(node_id)}
          ></IconButton>
        </Card>
      ))}
    </HStack>
  );
}
