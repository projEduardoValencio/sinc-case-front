import { IClientResponse } from "@/interface/IClient";
import client from "@/providers/client/client";
import {
  Text,
  Modal,
  ModalContent,
  ModalOverlay,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  client: IClientResponse | undefined;
  updateClient: () => void;
}
const EditClientModal: FC<Props> = ({
  isOpen,
  onClose,
  client: _client,
  updateClient,
}) => {
  const toast = useToast();
  const [name, setName] = useState(_client?.name);
  const [email, setEmail] = useState(_client?.email);
  const [phone, setPhone] = useState(_client?.phone);
  const [cpf, setCpf] = useState(_client?.cpf);

  useEffect(() => {
    setName(_client?.name);
    setEmail(_client?.email);
    setPhone(_client?.phone);
    setCpf(_client?.cpf);
  }, [_client]);

  const handleUpdate = async () => {
    if (_client) {
      if (!name || !email || !cpf || !phone) {
        toast({
          title: "É necessário preencher todos os campos",
          status: "warning",
        });
        return;
      }

      try {
        await client.update(_client.id, {
          name: name!,
          email: email!,
          cpf: cpf!,
          phone: phone!,
        });
        await updateClient();
        toast({ title: "Cliente editado com sucesso", status: "success" });
        onClose();
      } catch (error) {
        toast({ title: "Erro ao editar cliente", status: "error" });
        console.error(error);
      }
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
          height={["600px"]}
          direction={["column"]}
          justify={["center"]}
          background={"white"}
          color={"black"}
          borderRadius={["10px"]}
          padding={"40px"}
        >
          <Text fontSize={["28px"]} fontWeight={"700"} textAlign={["center"]}>
            Editar Cliente
          </Text>

          <Flex
            width={["100%"]}
            height={["100%"]}
            direction={["column"]}
            fontSize={["24px"]}
            gap={["10px"]}
          >
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                value={name}
                background={"gray.300"}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>E-mail</FormLabel>
              <Input
                type="text"
                value={email}
                background={"gray.300"}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Cel</FormLabel>
              <Input
                type="text"
                value={phone}
                background={"gray.300"}
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>CPF</FormLabel>
              <Input
                type="text"
                value={cpf}
                background={"gray.300"}
                onChange={(e) => setCpf(e.target.value)}
              />
            </FormControl>
          </Flex>

          <Flex direction={["row"]} color={"white"} justify={["space-between"]}>
            <Button variant={"primary"} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant={"primary"}
              background={"red"}
              onClick={handleUpdate}
            >
              Confirmar
            </Button>
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default EditClientModal;
