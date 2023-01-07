import { Heading, VStack } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";
export default function Layout({ children }: PropsWithChildren) {
  return (
    <VStack height={"100vh"} justify="center" align="center" px="20" gap={1}>
      <Heading mb={5} fontWeight={"extrabold"}>
        Show Me The Issues
      </Heading>
      {children}
    </VStack>
  );
}
