import car from "@/providers/car/car";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex, Text } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import { useToast } from "@chakra-ui/toast";
import { useState } from "react";

const RegisterCar: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const _submitForm = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      await car.create({
        plate: e.target.plate.value,
        model: e.target.model.value,
        brand: e.target.brand.value,
        current_km: e.target.current_km.value,
        vehicle_year: e.target.vehicle_year.value,
      });
      toast({
        title: "Veiculo Registrado",
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
      className="new-car"
      direction={["column"]}
      color={"black"}
      height={"100%"}
      justify={"space-between"}
    >
      <Text
        fontSize={["18px"]}
        fontWeight={["700"]}
        textAlign={["center"]}
        textTransform={"uppercase"}
      >
        Registrar Veiculo
      </Text>

      <Flex
        className="register-car-form"
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
            <FormLabel>Placa</FormLabel>
            <Input name="plate" type="text" bg={"gray.200"} />
          </FormControl>

          <FormControl>
            <FormLabel>Modelo</FormLabel>
            <Input name="model" type="text" bg={"gray.200"} />
          </FormControl>

          <FormControl>
            <FormLabel>Marca</FormLabel>
            <Input name="brand" type="text" bg={"gray.200"} />
          </FormControl>

          <FormControl>
            <FormLabel>KM Atual</FormLabel>
            <Input name="current_km" type="number" bg={"gray.200"} />
          </FormControl>

          <FormControl>
            <FormLabel>Ano do Veiculo</FormLabel>
            <Input name="vehicle_year" type="month" bg={"gray.200"} />
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

export default RegisterCar;
