import { IClientResponse } from "@/interface/IClient";
import client from "@/providers/client/client";
import {
  Text,
  Modal,
  ModalContent,
  ModalOverlay,
  Flex,
  Button,
} from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  client: IClientResponse | undefined;
  updateClient: () => void;
}
const DeleteClientModal: FC<Props> = ({
  isOpen,
  onClose,
  client: _client,
  updateClient,
}) => {
  const handleDelete = async () => {
    if (_client) {
      await client.delete(_client.id);
      await updateClient();
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        borderRadius={"10px"}
        flexDirection={["column"]}
        justifyContent={["center"]}
        alignItems={["center"]}
      >
        <Flex
          width={["500px"]}
          height={["500px"]}
          direction={["column"]}
          justify={["center"]}
          background={"white"}
          color={"black"}
          borderRadius={["10px"]}
          padding={"40px"}
        >
          <Text fontSize={["28px"]} fontWeight={"700"} textAlign={["center"]}>
            Confirmar Exclusão
          </Text>

          <Flex
            width={["100%"]}
            height={["100%"]}
            direction={["column"]}
            fontSize={["24px"]}
            gap={["10px"]}
          >
            <Text>
              <b>Nome:</b> <br /> {_client?.name}
            </Text>
            <Text>
              <b>E-mail:</b> <br /> {_client?.email}
            </Text>
            <Text>
              <b>Cel:</b> <br /> {_client?.phone}
            </Text>
            <Text>
              <b>CPF:</b> <br /> {_client?.cpf}
            </Text>
          </Flex>

          <Flex direction={["row"]} color={"white"} justify={["space-between"]}>
            <Button variant={"primary"} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant={"primary"}
              background={"red"}
              onClick={handleDelete}
            >
              Confirmar
            </Button>
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default DeleteClientModal;
