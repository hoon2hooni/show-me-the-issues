import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
export default function FixedHeightCenterWrapper({ children }: PropsWithChildren) {
  return (
    <Flex
      direction={"column"}
      justify="center"
      align={"center"}
      height={"443px"}
      gap={2}
    >
      {children}
    </Flex>
  );
}
