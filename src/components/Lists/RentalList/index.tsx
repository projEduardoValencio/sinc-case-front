/* eslint-disable react-hooks/exhaustive-deps */
import { IClient, IClientResponse } from "@/interface/IClient";
import client from "@/providers/client/client";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, useToast, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DeleteModal from "./Modal/DeleteModal";
import DeleteClientModal from "./Modal/DeleteModal";
import EditClientModal from "./Modal/EditModelClient";
import { ICarRental, ICarRentalResponse } from "@/interface/ICarRental";
import rental from "@/providers/rental/rental";
import { ICarResponse } from "@/interface/ICar";
import car from "@/providers/car/car";

const RentalList = () => {
  const toast = useToast();
  const [rentals, setRentals] = useState<ICarRentalResponse[]>();
  const [clients, setClients] = useState<IClientResponse[]>();
  const [cars, setCars] = useState<ICarResponse[]>();
  const [selectedRental, setSelectedRental] = useState<ICarRentalResponse>();
  const [selectedClient, setSelectedClient] = useState<IClientResponse>();
  const [selectedCar, setSelectedCar] = useState<ICarResponse>();

  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOnOpen,
    onClose: deleteOnClose,
  } = useDisclosure();

  useEffect(() => {
    updateRental();
  }, []);

  const updateRental = async () => {
    await client
      .list()
      .then((_rentals) => setClients(_rentals))
      .catch((error) =>
        toast({ title: "Erro ao requisitar clients", status: "error" })
      );
    await car
      .list()
      .then((_cars) => setCars(_cars))
      .catch((error) =>
        toast({ title: "Erro ao requisitar cars", status: "error" })
      );
    await rental
      .listAll()
      .then((_rentals) => setRentals(_rentals))
      .catch((error) =>
        toast({ title: "Erro ao requisitar locações", status: "error" })
      );
  };

  const handleDelete = (_rental: ICarRentalResponse) => {
    setSelectedRental(_rental);

    deleteOnOpen();
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
        rental={selectedRental}
        isOpen={deleteIsOpen}
        onClose={deleteOnClose}
        updateRental={updateRental}
      />

      {rentals?.map((_rental, key) => {
        return (
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
              <Text fontWeight={["700"]}>{_rental?.client.name}</Text>
              <Text>{_rental.car.plate}</Text>
            </Flex>

            <Flex direction={["row"]} gap={["20px"]}>
              <DeleteIcon
                onClick={() => {
                  handleDelete(_rental);
                }}
                cursor={"pointer"}
              />
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default RentalList;
