/* eslint-disable react-hooks/exhaustive-deps */
import { IClientResponse } from "@/interface/IClient";
import client from "@/providers/client/client";
import { setSelectedClientStorage } from "@/utils/localStorage/client";
import { clearAllStorageRental } from "@/utils/localStorage/keys";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  useToast,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

interface Props {
  step: number;
  setStep: (u: number) => void;
}

const ClientStep: FC<Props> = ({ step, setStep }) => {
  const [clients, setClients] = useState<IClientResponse[]>([]);
  const [filteredClients, setFilteredClients] = useState<IClientResponse[]>([]);
  const [selectedClient, setSelectedClient] = useState<IClientResponse>();

  const toast = useToast();

  useEffect(() => {
    client
      .list()
      .then((data) => {
        setClients(data);
      })
      .catch((e) => {
        console.error(e);
        toast({
          title: "Erro ao requisitar clients",
          status: "error",
        });
      });
  }, []);

  useEffect(() => {
    filterClientsBySearch();
  }, [clients]);

  const filterClientsBySearch = (search?: string) => {
    if (!search || search === null) {
      setFilteredClients(clients);
    } else {
      const _filteredClients = clients.filter((c) => {
        return (
          c.name.toLowerCase().includes(search) ||
          c.phone.toLowerCase().includes(search) ||
          c.cpf.toLowerCase().includes(search) ||
          c.email.toLowerCase().includes(search)
        );
      });

      setFilteredClients(_filteredClients);
    }
  };

  const selectClient = (_client: IClientResponse) => {
    setSelectedClientStorage(_client);
    setStep(step + 1);
  };

  return (
    <Flex
      className="client-form"
      direction={["column"]}
      gap={["15px"]}
      minHeight={["100%"]}
      maxHeight={["100%"]}
      height={["100%"]}
    >
      <InputGroup>
        <InputLeftAddon background={"gray.400"}>
          <SearchIcon />
        </InputLeftAddon>
        <Input
          name="search-client"
          type="text"
          bg={"gray.300"}
          placeholder="Buscar Cliente"
          _placeholder={{
            color: "gray.500",
          }}
          width={["600px"]}
          onChange={(e) => filterClientsBySearch(e.target.value)}
        />
      </InputGroup>
      <Flex
        className="form-list-clients"
        direction={"column"}
        gap={["10px"]}
        height={["500px"]}
        overflowY={"auto"}
      >
        {filteredClients.map((client, key) => {
          return (
            <Flex
              key={key}
              width={"100%"}
              minHeight={["70px"]}
              borderRadius={["10px"]}
              background={"cover"}
              color={"black"}
              paddingX={["10px"]}
              paddingY={["8px"]}
              direction={["row"]}
              justify={["space-between"]}
              css={{
                ": hover": {
                  cursor: "pointer",
                  background: "var(--chakra-colors-coverHover);",
                },
              }}
              onClick={() => selectClient(client)}
            >
              <Flex direction={["column"]} justify={["space-between"]}>
                <Flex fontWeight={["700"]}>{client.name}</Flex>

                <Flex fontWeight={["700"]} color={"primary"}>
                  {client.email}
                </Flex>
              </Flex>

              <Flex
                direction={["column"]}
                justify={["space-between"]}
                textAlign={["left"]}
                width={["170px"]}
              >
                <Flex fontWeight={["400"]}>
                  <pre>
                    <b>cpf:</b> {client.cpf}
                  </pre>
                </Flex>

                <Flex fontWeight={["400"]}>
                  <pre>
                    <b>cel:</b> {client.phone}
                  </pre>
                </Flex>
              </Flex>
            </Flex>
          );
        })}
      </Flex>

      <Flex
        className="action-buttons"
        direction={["row"]}
        height={["60px"]}
        width={["100%"]}
        justify={"space-between"}
        align={["end"]}
      >
        <Button
          variant={"primary"}
          background={"red"}
          height={["30px"]}
          color={"white"}
          width={"140px"}
          onClick={() => {
            clearAllStorageRental();
            setStep(0);
          }}
        >
          Remover Estado
        </Button>

        <Button
          variant={"primary"}
          background={"primary"}
          height={["30px"]}
          color={"white"}
          width={["140px"]}
          onClick={() => setStep(step - 1)}
        >
          Voltar Passo
        </Button>
      </Flex>
    </Flex>
  );
};

export default ClientStep;
