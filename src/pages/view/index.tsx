import { Flex } from "@chakra-ui/layout";
import TopBar from "@/components/TopBar";
import RegisterCard from "@/components/RegisterCard";

export default function Home() {
  return (
    <Flex width={"100vw"} height={"100vh"} direction={"column"}>
      <TopBar />

      <RegisterCard />
    </Flex>
  );
}
