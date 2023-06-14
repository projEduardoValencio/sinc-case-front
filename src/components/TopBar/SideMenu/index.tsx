import { Divider, Flex } from "@chakra-ui/react";
import Link from "next/link";

const SideMenu = () => {
  return (
    <Flex direction={["row"]} gap={["10px"]} height={"100%"} align={"center"}>
      <Link className="nav-item" href={"/register"}>
        Novo Registro
      </Link>
      {/* <Box width={["10px"]} height={["100%"]} bg={"white"} /> */}
      <Divider orientation="vertical" height={["50%"]} />
      <Link className="nav-item" href={"/list"}>
        Listagem
      </Link>
      <Divider orientation="vertical" height={["50%"]} />
      <Link className="nav-item" href={"/rental"}>
        Locação
      </Link>
    </Flex>
  );
};

export default SideMenu;
