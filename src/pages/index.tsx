import { Flex, Text } from "@chakra-ui/layout";
import TopBar from "@/components/TopBar";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import RegisterClient from "@/components/RegisterClient";

export default function Home() {
  return (
    <Flex width={"100vw"} height={"100vh"} direction={"column"}>
      <TopBar />

      <Flex
        className="main-content"
        width={"100%"}
        height={"100%"}
        align={"center"}
        justify={"center"}
      >
        <RegisterClient />
      </Flex>
    </Flex>
  );
}
