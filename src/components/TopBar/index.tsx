import { Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import SideMenu from "./SideMenu";
import Link from "next/link";

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
      <Flex className="logo" height={["100%"]} align={"center"}>
        <Link
          href={"/"}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "20px",
            cursor: "pointer",
          }}
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
        </Link>
      </Flex>

      <SideMenu />
    </Flex>
  );
};

export default TopBar;
