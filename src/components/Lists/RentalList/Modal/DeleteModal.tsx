import { ICarResponse } from "@/interface/ICar";
import { ICarRentalResponse } from "@/interface/ICarRental";
import { IClientResponse } from "@/interface/IClient";
import client from "@/providers/client/client";
import rental from "@/providers/rental/rental";
import {
  Text,
  Modal,
  ModalContent,
  ModalOverlay,
  Flex,
  Button,
  CircularProgress,
  useToast,
} from "@chakra-ui/react";
import { FC, useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  rental: ICarRentalResponse | undefined;
  updateRental: () => void;
}
const DeleteRentalModal: FC<Props> = ({
  isOpen,
  onClose,
  rental: _rental,
  updateRental,
}) => {
  const toast = useToast();
  useEffect(() => {
    console.log(_rental);
  });
  const handleDelete = async () => {
    if (_rental) {
      try {
        await rental.delete(_rental.id);
        await updateRental();
        toast({ title: "Locação deletada com sucesso", status: "success" });
        onClose();
      } catch (error) {
        toast({ title: "Erro ao deletar locação", status: "error" });
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
          width={["800px"]}
          height={["700px"]}
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
            <Flex direction={["row"]} gap={["190px"]}>
              <Flex direction={["column"]}>
                <Text fontSize={["34px"]}>Cliente</Text>
                <Text>
                  <b>Nome:</b> <br /> {_rental?.client?.name}
                </Text>
                <Text>
                  <b>E-mail:</b> <br /> {_rental?.client?.email}
                </Text>
                <Text>
                  <b>CPF:</b> <br /> {_rental?.client?.cpf}
                </Text>
                <Text>
                  <b>Cel:</b> <br /> {_rental?.client?.phone}
                </Text>
              </Flex>

              <Flex direction={["column"]}>
                <Text fontSize={["34px"]}>Carro</Text>
                <Text>
                  <b>Placa:</b> <br /> {_rental?.car?.plate}
                </Text>
                <Text>
                  <b>Modelo:</b> <br /> {_rental?.car?.model}
                </Text>
                <Text>
                  <b>Marca:</b> <br /> {_rental?.car?.brand}
                </Text>
              </Flex>
            </Flex>

            <Text fontSize={["34px"]}>Locação</Text>
            <Flex direction={["row"]} gap={["40px"]}>
              <Text>
                <b>Data de Retirada:</b> <br />{" "}
                {_rental
                  ? new Date(_rental.startDate).toLocaleDateString()
                  : ""}
              </Text>
              <Text>
                <b>Data de Devolução:</b> <br />{" "}
                {_rental ? new Date(_rental!.endDate).toLocaleDateString() : ""}
              </Text>
            </Flex>
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

export default DeleteRentalModal;
