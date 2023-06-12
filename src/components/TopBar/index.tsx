import { Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

const TopBar: React.FC = () => {
  return (
    <Flex
      className="top-bar"
      width={"100%"}
      height={["70px"]}
      background={"primary"}
      align={["center"]}
      gap={["20px"]}
      paddingX={["20px"]}
    >
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
  );
};

export default TopBar;
