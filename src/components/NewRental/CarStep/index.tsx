/* eslint-disable react-hooks/exhaustive-deps */
import { ICarResponse } from "@/interface/ICar";
import { IClientResponse } from "@/interface/IClient";
import car from "@/providers/car/car";
import client from "@/providers/client/client";
import { clearSelectedCar, setSelectedCar } from "@/utils/localStorage/car";
import { setSelectedClientStorage } from "@/utils/localStorage/client";
import { clearSelectedDatePeriod } from "@/utils/localStorage/date";
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
const CarStep: FC<Props> = ({ step, setStep }) => {
  const [cars, setCars] = useState<ICarResponse[]>([]);
  const [filteredCars, setFilteredCars] = useState<ICarResponse[]>([]);

  const toast = useToast();

  useEffect(() => {
    car
      .list()
      .then((data) => {
        setCars(data);
      })
      .catch((e) => {
        console.error(e);
        toast({
          title: "Erro ao requisitar carros",
          status: "error",
        });
      });
  }, []);

  useEffect(() => {
    filterCarsBySearch();
  }, [cars]);

  const filterCarsBySearch = (search?: string) => {
    if (!search || search === null) {
      setFilteredCars(cars);
    } else {
      const _filteredCars = cars.filter((c) => {
        search = search!.toLowerCase();
        return (
          c.plate.toLowerCase().includes(search) ||
          c.brand.toLowerCase().includes(search) ||
          c.model.toLowerCase().includes(search) ||
          c.vehicle_year.toDateString().toLowerCase().includes(search)
        );
      });

      setFilteredCars(_filteredCars);
    }
  };

  const selectCar = (_car: ICarResponse) => {
    setSelectedCar(_car);
    setStep(step + 1);
  };
  return (
    <Flex
      className="car-form"
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
          name="search-car"
          type="text"
          bg={"gray.300"}
          placeholder="Buscar Carro"
          _placeholder={{
            color: "gray.500",
          }}
          width={["600px"]}
          onChange={(e) => filterCarsBySearch(e.target.value)}
        />
      </InputGroup>
      <Flex
        className="form-list-car"
        direction={"column"}
        gap={["10px"]}
        height={["500px"]}
        overflowY={"auto"}
      >
        {filteredCars.map((car, key) => {
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
              onClick={() => selectCar(car)}
            >
              <Flex direction={["column"]} justify={["space-between"]}>
                <Flex fontWeight={["700"]}>
                  {car.model} - {car.brand}
                </Flex>

                <Flex fontWeight={["700"]} color={"primary"}>
                  {car.plate}
                </Flex>
              </Flex>

              <Flex
                direction={["column"]}
                justify={["space-between"]}
                textAlign={["left"]}
                width={["100px"]}
              >
                <Flex fontWeight={["400"]}>
                  <pre>
                    <b>km:</b>
                    {"  "}
                    {car.current_km}
                  </pre>
                </Flex>

                <Flex fontWeight={["400"]}>
                  <pre>
                    <b>ano:</b> {new Date(car.vehicle_year).getFullYear()}
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

export default CarStep;
