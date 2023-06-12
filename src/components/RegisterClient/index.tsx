import client from "@/providers/client/client";
import { circularProgressAnatomy } from "@chakra-ui/anatomy";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex, Text } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import { Toast, useToast } from "@chakra-ui/toast";
import { useState } from "react";

const RegisterClient: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const _submitForm = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      await client.create({
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        cpf: e.target.cpf.value,
      });
      toast({
        title: "Cliente Registrado",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: String(error),
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      className="new-client"
      width={["500px"]}
      height={["500px"]}
      background={"#ffffff"}
      borderRadius={["10px"]}
      direction={["column"]}
      color={"black"}
    >
      <Text
        fontSize={["24px"]}
        fontWeight={["700"]}
        textAlign={["center"]}
        textTransform={"uppercase"}
      >
        Registrar Cliente
      </Text>

      <Flex
        className="register-client-form"
        as={"form"}
        width={["100%"]}
        height={["100%"]}
        paddingX={["10px"]}
        paddingY={["10px"]}
        direction={"column"}
        justify={["space-between"]}
        onSubmit={_submitForm}
      >
        <Flex direction={"column"} gap={["10px"]}>
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input name="name" type="text" bg={"gray.200"} />
          </FormControl>

          <FormControl>
            <FormLabel>E-mail</FormLabel>
            <Input name="email" type="email" bg={"gray.200"} />
          </FormControl>

          <FormControl>
            <FormLabel>Telefone</FormLabel>
            <Input name="phone" type="tel" bg={"gray.200"} />
          </FormControl>

          <FormControl>
            <FormLabel>Cpf</FormLabel>
            <Input name="cpf" type="number" bg={"gray.200"} />
          </FormControl>
        </Flex>

        {isLoading ? (
          <CircularProgress
            isIndeterminate
            color="primary"
            alignSelf={"center"}
          />
        ) : (
          <Button color={"white"} variant={"primary"} type="submit">
            Registrar
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default RegisterClient;
