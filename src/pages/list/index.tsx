import { Flex } from "@chakra-ui/layout";
import TopBar from "@/components/TopBar";
import RegisterCard from "@/components/RegisterCard";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useState } from "react";
import ClientsList from "@/components/Lists/ClientsList";
import CarsList from "@/components/Lists/CarList";
import RentalList from "@/components/Lists/RentalList";

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
          width={["90%"]}
          height={["90%"]}
          background={"#ffffff"}
          borderRadius={["10px"]}
          color={"black"}
          paddingBottom={["30px"]}
          onChange={(index) => setTabIndex(index)}
          overflow={"hidden"}
        >
          <TabList
            width={["100%"]}
            background={"gray.100"}
            height={["60px"]}
            top={[0]}
          >
            <Tab width={"100%"}>Clientes</Tab>
            <Tab width={"100%"}>Carros</Tab>
            <Tab width={"100%"}>Locações</Tab>
          </TabList>

          <TabPanels width={"100%"} height={"100%"}>
            <TabPanel width={"inherit"} height={"100%"}>
              <ClientsList />
            </TabPanel>

            <TabPanel width={"inherit"} height={"100%"}>
              <CarsList />
            </TabPanel>

            <TabPanel width={"inherit"} height={"100%"}>
              <RentalList />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
}
