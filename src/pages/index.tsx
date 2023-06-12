import { Flex } from "@chakra-ui/layout";
import TopBar from "@/components/TopBar";
import RegisterClient from "@/components/RegisterClient";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import RegisterCar from "@/components/RegisterCar";
import { useState } from "react";

export default function Home() {
  const [tabIndex, setTabIndex] = useState<number>(0);
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
        <Tabs
          width={["500px"]}
          height={[tabIndex == 0 ? "500px" : "600px"]}
          background={"#ffffff"}
          borderRadius={["10px"]}
          color={"black"}
          paddingBottom={["30px"]}
          onChange={(index) => setTabIndex(index)}
        >
          <TabList width={["100%"]}>
            <Tab width={"100%"}>Cliente</Tab>
            <Tab width={"100%"}>Carro</Tab>
          </TabList>
          <TabPanels width={"100%"} height={"100%"}>
            <TabPanel width={"inherit"} height={"100%"}>
              <RegisterClient />
            </TabPanel>
            <TabPanel width={"inherit"} height={"100%"}>
              <RegisterCar />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
}
