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
    <HStack gap={"5"} w={"100%"} justify={"center"}>
      {repositories.map(({ node_id, name, owner }) => (
        <Card w={240} key={node_id} pos={"relative"} data-cy={`repositoryCard`}>
          <CardBody>
            <Text fontWeight={"extrabold"} w={"100%"} isTruncated>
              {name}
            </Text>
            <Text fontSize={"sm"} fontWeight={"bold"} isTruncated>
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
            data-cy={`delete${name}`}
          ></IconButton>
        </Card>
      ))}
    </HStack>
  );
}
