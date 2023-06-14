/* eslint-disable react-hooks/exhaustive-deps */
import { IClient, IClientResponse } from "@/interface/IClient";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, useToast, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DeleteClientModal from "./Modal/DeleteModal";
import EditClientModal from "./Modal/EditModelClient";
import car from "@/providers/car/car";
import { ICarResponse } from "@/interface/ICar";

const CarsList = () => {
  const toast = useToast();
  const [cars, setCars] = useState<ICarResponse[]>();
  const [selectedCar, setSelectedCar] = useState<ICarResponse>();

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
    updateCar();
  }, []);

  const updateCar = async () => {
    await car
      .list()
      .then((_cars) => setCars(_cars))
      .catch((error) =>
        toast({ title: "Erro ao requisitar cars", status: "error" })
      );
  };

  const handleDelete = (_car: ICarResponse) => {
    setSelectedCar(_car);
    deleteOnOpen();
  };

  const handleUpdate = (_car: ICarResponse) => {
    setSelectedCar(_car);
    updateOnOpen();
  };

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
        car={selectedCar}
        isOpen={deleteIsOpen}
        onClose={deleteOnClose}
        updateCar={updateCar}
      />

      <EditClientModal
        car={selectedCar}
        isOpen={updateIsOpen}
        onClose={updateOnClose}
        updateCar={updateCar}
      />

      {cars?.map((_car, key) => (
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
            <Text fontWeight={["700"]}>{_car.plate}</Text>
            <Text>{_car.model}</Text>
          </Flex>

          <Flex direction={["row"]} gap={["20px"]}>
            <EditIcon
              onClick={() => {
                handleUpdate(_car);
              }}
              cursor={"pointer"}
            />
            <DeleteIcon
              onClick={() => {
                handleDelete(_car);
              }}
              cursor={"pointer"}
            />
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default CarsList;
