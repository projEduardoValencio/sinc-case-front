/* eslint-disable react-hooks/exhaustive-deps */
import { ICarResponse } from "@/interface/ICar";
import { IClientResponse } from "@/interface/IClient";
import { steps } from "@/pages/rental";
import rental from "@/providers/rental/rental";
import { getSelectedCar } from "@/utils/localStorage/car";
import { getSelectedClientStorage } from "@/utils/localStorage/client";
import {
  IDatePeriod,
  clearSelectedDatePeriod,
  getSelectedDatePeriod,
  setSelectedDatePeriod,
} from "@/utils/localStorage/date";
import { clearAllStorageRental } from "@/utils/localStorage/keys";
import {
  Button,
  CircularProgress,
  Divider,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

interface Props {
  step: number;
  setStep: (u: number) => void;
}
const ConfirmStep: FC<Props> = ({ step, setStep }) => {
  const toast = useToast();
  const [datePeriod, setDatePeriod] = useState<IDatePeriod>();
  const [client, setClient] = useState<IClientResponse>();
  const [car, setCar] = useState<ICarResponse>();

  useEffect(() => {
    const loadDatePeriod = getSelectedDatePeriod();
    const loadClient = getSelectedClientStorage();
    const loadCar = getSelectedCar();

    console.log(loadDatePeriod, loadClient, loadCar);
    if (
      loadDatePeriod === undefined ||
      loadClient === undefined ||
      loadCar === undefined
    ) {
      setStep(0);
      return;
    } else {
      setDatePeriod(loadDatePeriod);
      setClient(loadClient);
      setCar(loadCar);
    }
  }, []);

  const submit = async () => {
    try {
      setStep(4);
      await rental.create({
        startDate: datePeriod?.startDate!,
        endDate: datePeriod?.endDate!,
        client_id: client?.id!,
        car_id: car?.id!,
      });
      toast({
        title: "Locação registrada com sucesso",
        status: "success",
      });
      clearAllStorageRental();

      setStep(0);
    } catch (error) {
      setStep(3);
      toast({
        title: "Erro ao registrar locação",
        status: "error",
      });
    }
  };

  if (datePeriod === undefined || car === undefined) {
    return <CircularProgress isIndeterminate />;
  } else {
    return (
      <Flex
        className="client-form"
        direction={["column"]}
        minHeight={["100%"]}
        maxHeight={["100%"]}
        height={["100%"]}
        width={["100%"]}
        paddingX={["30px"]}
        marginTop={["20px"]}
      >
        <Flex
          direction={["column"]}
          width={["100%"]}
          gap={["40px"]}
          background={"cover"}
          padding={["30px 20px"]}
          borderRadius={["10px"]}
        >
          <Flex className="date-info" direction={["column"]} gap={["12px"]}>
            <Text fontSize={["20px"]} fontWeight={["700"]}>
              Datas:
            </Text>
            <Flex direction={"row"} gap={["10px"]}>
              <Flex>
                <b>Retirada:</b>
                {"\u00A0"}
                {new Date(
                  datePeriod!.startDate.toLocaleString()
                ).toLocaleDateString()}
              </Flex>
              <Flex>
                <b>Devolução:</b>
                {"\u00A0"}
                {new Date(
                  datePeriod!.endDate.toLocaleString()
                ).toLocaleDateString()}
              </Flex>
            </Flex>
          </Flex>

          <Flex height={["2px"]} width={["100%"]} background={"gray.400"} />

          <Flex className="car-info" direction={["column"]} gap={["12px"]}>
            <Text fontSize={["20px"]} fontWeight={["700"]}>
              Carro:
            </Text>
            <Flex direction={"column"} gap={["10px"]}>
              <Flex gap={["10px"]}>
                <Flex>
                  <b>Modelo:</b>
                  {"\u00A0"}
                  {car?.model}
                </Flex>
                <Flex>
                  <b>Marca:</b>
                  {"\u00A0"}
                  {car?.brand}
                </Flex>
                <Flex>
                  <b>Placa:</b>
                  {"\u00A0"}
                  {car.plate}
                </Flex>
              </Flex>

              <Flex gap={["10px"]}>
                <Flex>
                  <b>Ano:</b>
                  {"\u00A0"}
                  {new Date(car!.vehicle_year).getFullYear()}
                </Flex>
                <Flex>
                  <b>Km Atual:</b>
                  {"\u00A0"}
                  {car.current_km}
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          <Flex height={["2px"]} width={["100%"]} background={"gray.400"} />

          <Flex className="client-info" direction={["column"]} gap={["12px"]}>
            <Text fontSize={["20px"]} fontWeight={["700"]}>
              Cliente:
            </Text>
            <Flex direction={"column"} gap={["10px"]}>
              <Flex gap={["10px"]}>
                <Flex>
                  <b>Nome:</b>
                  {"\u00A0"}
                  {client?.name}
                </Flex>
                <Flex>
                  <b>E-mail:</b>
                  {"\u00A0"}
                  {client?.email}
                </Flex>
              </Flex>

              <Flex gap={["10px"]}>
                <Flex>
                  <b>CPF:</b>
                  {"\u00A0"}
                  {client?.cpf}
                </Flex>
                <Flex>
                  <b>Cel:</b>
                  {"\u00A0"}
                  {client?.phone}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
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
              setStep(0);
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

          <Button
            variant={"primary"}
            background={"green"}
            height={["30px"]}
            color={"white"}
            width={["140px"]}
            onClick={() => submit()}
          >
            Confirmar
          </Button>
        </Flex>
      </Flex>
    );
  }
};

export default ConfirmStep;
