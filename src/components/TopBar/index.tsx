import { Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import SideMenu from "./SideMenu";

const TopBar: React.FC = () => {
  return (
    <Flex
      className="top-bar"
      width={"100%"}
      height={["70px"]}
      background={"primary"}
      align={["center"]}
      justify={["space-between"]}
      paddingX={["20px"]}
    >
      <Flex className="logo" height={["100%"]} align={"center"} gap={["20px"]}>
        <Image
          src="/images/logo.png"
          alt="suporte logo"
          height={["70%"]}
          width={"auto"}
        />

        <Text fontSize={["24px"]} color={"white"}>
          CAR RENTAL
        </Text>
      </Flex>

      <SideMenu />
    </Flex>
  );
};

export default TopBar;
