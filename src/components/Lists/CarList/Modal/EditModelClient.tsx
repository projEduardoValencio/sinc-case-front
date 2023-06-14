import { ICarResponse } from "@/interface/ICar";
import car from "@/providers/car/car";
import { formatDate } from "@/utils/formatDate";
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
  useToast,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  car: ICarResponse | undefined;
  updateCar: () => void;
}
const EditCarModal: FC<Props> = ({ isOpen, onClose, car: _car, updateCar }) => {
  const toast = useToast();
  const [plate, setPlate] = useState(_car?.plate);
  const [model, setModel] = useState(_car?.model);
  const [brand, setBrand] = useState(_car?.brand);
  const [vehicle_year, setVehicle_year] = useState<Date>(new Date());
  const [current_km, setCurrent_km] = useState(_car?.current_km);

  useEffect(() => {
    setPlate(_car?.plate);
    setModel(_car?.model);
    setBrand(_car?.brand);
    setVehicle_year(_car ? new Date(_car.vehicle_year) : new Date());
    setCurrent_km(_car?.current_km);
  }, [_car]);

  const handleUpdate = async () => {
    if (_car) {
      if (!plate || !model || !brand || !vehicle_year || !current_km) {
        toast({
          title: "É necessário preencher todos os campos",
          status: "warning",
        });
        return;
      }

      try {
        await car.update(_car.id, {
          plate: plate!,
          model: model!,
          brand: brand!,
          current_km: current_km!,
          vehicle_year: vehicle_year!,
        });
        await updateCar();
        toast({ title: "Carro editado com sucesso", status: "success" });
        onClose();
      } catch (error) {
        toast({ title: "Erro ao editar Carro", status: "error" });
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
            Editar Carro
          </Text>

          <Flex
            width={["100%"]}
            height={["100%"]}
            direction={["column"]}
            fontSize={["24px"]}
            gap={["10px"]}
          >
            <FormControl>
              <FormLabel>Placa</FormLabel>
              <Input
                type="text"
                value={plate}
                background={"gray.300"}
                onChange={(e) => setPlate(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Modelo</FormLabel>
              <Input
                type="text"
                value={model}
                background={"gray.300"}
                onChange={(e) => setModel(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Brand</FormLabel>
              <Input
                type="text"
                value={brand}
                background={"gray.300"}
                onChange={(e) => setBrand(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Ano</FormLabel>
              <Input
                type="date"
                value={formatDate(vehicle_year)}
                background={"gray.300"}
                onChange={(e) => setVehicle_year(new Date(e.target.value))}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Km atual</FormLabel>
              <Input
                type="text"
                value={current_km}
                background={"gray.300"}
                onChange={(e) => setCurrent_km(parseFloat(e.target.value))}
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

export default EditCarModal;
