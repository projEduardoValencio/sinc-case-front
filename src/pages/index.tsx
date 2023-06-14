import { Flex, Text } from "@chakra-ui/layout";
import TopBar from "@/components/TopBar";
import { Divider, Image } from "@chakra-ui/react";
import Link from "next/link";
import RegisterCard from "@/components/RegisterCard";

export default function Home() {
  return (
    <Flex width={"100vw"} height={"100vh"} direction={"column"}>
      <TopBar />

      <Flex
        width={["100%"]}
        height={["100%"]}
        align={["center"]}
        justify={["center"]}
      >
        <Flex
          background={"primary"}
          width={["50%"]}
          height={["60%"]}
          borderRadius={["40px"]}
          direction={["column"]}
          align={["center"]}
          paddingX={["20px"]}
          paddingY={["40px"]}
          gap={["100px"]}
        >
          <Flex
            direction={["column"]}
            align={["center"]}
            gap={["20px"]}
            justify={["center"]}
          >
            <Text fontSize={["46px"]} fontWeight={["bold"]}>
              CAR RENTAL
            </Text>
            <Image src="/images/logo.png" alt="logo suporte" width={["50%"]} />
          </Flex>

          <Flex
            direction={["row"]}
            fontSize={["34px"]}
            gap={["90px"]}
            align={["center"]}
          >
            <Link
              className="nav-item-main"
              href={"/register"}
              style={{ textAlign: "center", width: "200px" }}
            >
              Registro
            </Link>
            <Link
              className="nav-item-main"
              href={"/list"}
              style={{ textAlign: "center", width: "200px" }}
            >
              Listagem
            </Link>
            <Link
              className="nav-item-main"
              href={"/rental"}
              style={{ textAlign: "center", width: "200px" }}
            >
              Locação
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
