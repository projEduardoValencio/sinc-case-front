import { ICarResponse } from "@/interface/ICar";
import car from "@/providers/car/car";
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
  car: ICarResponse | undefined;
  updateCar: () => void;
}
const DeleteClientModal: FC<Props> = ({
  isOpen,
  onClose,
  car: _car,
  updateCar,
}) => {
  const handleDelete = async () => {
    if (_car) {
      await car.delete(_car.id);
      await updateCar();
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
              <b>Placa:</b> <br /> {_car?.plate}
            </Text>
            <Text>
              <b>Modelo:</b> <br /> {_car?.model}
            </Text>
            <Text>
              <b>Marca:</b> <br /> {_car?.brand}
            </Text>
            <Text>
              <b>Ano:</b> <br />{" "}
              {new Date(_car?.vehicle_year ?? "").getFullYear()}
            </Text>
            <Text>
              <b>KM atual:</b> <br /> {_car?.current_km}
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
