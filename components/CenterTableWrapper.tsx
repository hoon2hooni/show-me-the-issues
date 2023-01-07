import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
export default function CenterTableWrapper({ children }: PropsWithChildren) {
  return (
    <Flex justify="center" align={"center"} height={"443px"}>
      {children}
    </Flex>
  );
}
