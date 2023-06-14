/* eslint-disable react-hooks/exhaustive-deps */
import { IClient, IClientResponse } from "@/interface/IClient";
import client from "@/providers/client/client";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, useToast, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DeleteModal from "./Modal/DeleteModal";
import DeleteClientModal from "./Modal/DeleteModal";
import EditClientModal from "./Modal/EditModelClient";

const ClientsList = () => {
  const toast = useToast();
  const [clients, setClients] = useState<IClientResponse[]>();
  const [selectedClient, setSelectedClient] = useState<IClientResponse>();

  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOnOpen,
    onClose: deleteOnClose,
  } = useDisclosure();

  const {
    isOpen: updateIsOpen,
    onOpen: updateOnOpen,
    onClose: updateOnClose,
  } = useDisclosure();

  useEffect(() => {
    updateClient();
  }, []);

  const updateClient = async () => {
    await client
      .list()
      .then((_clients) => setClients(_clients))
      .catch((error) =>
        toast({ title: "Erro ao requisitar clients", status: "error" })
      );
  };

  const handleDelete = (_client: IClientResponse) => {
    setSelectedClient(_client);
    deleteOnOpen();
  };

  const handleUpdate = (_client: IClientResponse) => {
    setSelectedClient(_client);
    updateOnOpen();
  };

  useEffect(() => {}, [selectedClient]);

  return (
    <Flex
      width={["100%"]}
      height={["100%"]}
      direction={"column"}
      gap={["15px"]}
      overflowY={"auto"}
      borderRadius={["10px"]}
    >
      <DeleteClientModal
        client={selectedClient}
        isOpen={deleteIsOpen}
        onClose={deleteOnClose}
        updateClient={updateClient}
      />

      <EditClientModal
        client={selectedClient}
        isOpen={updateIsOpen}
        onClose={updateOnClose}
        updateClient={updateClient}
      />

      {clients?.map((_client, key) => (
        <Flex
          key={key}
          width={["100%"]}
          height={["60px"]}
          paddingX={["20px"]}
          paddingY={["10px"]}
          background={"cover"}
          borderRadius={["10px"]}
          justify={["space-between"]}
          align={["center"]}
        >
          <Flex direction={["column"]}>
            <Text fontWeight={["700"]}>{_client.name}</Text>
            <Text>{_client.email}</Text>
          </Flex>

          <Flex direction={["row"]} gap={["20px"]}>
            <EditIcon
              onClick={() => {
                handleUpdate(_client);
              }}
              cursor={"pointer"}
            />
            <DeleteIcon
              onClick={() => {
                handleDelete(_client);
              }}
              cursor={"pointer"}
            />
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default ClientsList;
