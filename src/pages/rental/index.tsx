/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Text } from "@chakra-ui/layout";
import TopBar from "@/components/TopBar";
import {
  Box,
  Button,
  CircularProgress,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DateStep from "@/components/NewRental/DateStep";
import CarStep from "@/components/NewRental/CarStep";
import ClientStep from "@/components/NewRental/ClientStep";
import ConfirmStep from "@/components/NewRental/ConfirmStep";
import { getSelectedCar } from "@/utils/localStorage/car";
import { getSelectedClientStorage } from "@/utils/localStorage/client";

export const steps = [
  { title: "Datas", description: "Data de locação" },
  { title: "Carro", description: "Selecionar carro" },
  { title: "Cliente", description: "Dados do cliente" },
  { title: "Confirmar", description: "Revisar e enviar" },
];

export default function Home() {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const car = getSelectedCar();
    const _client = getSelectedClientStorage();
    if (_client != undefined) {
      setStep(3);
      return;
    }
    if (car != undefined) {
      setStep(2);
      return;
    }
  }, []);

  const routeStep = () => {
    switch (step) {
      case 0:
        return <DateStep step={step} setStep={setStep} />;
      case 1:
        return <CarStep step={step} setStep={setStep} />;
      case 2:
        return <ClientStep step={step} setStep={setStep} />;
      case 3:
        return <ConfirmStep step={step} setStep={setStep} />;
      case 4:
        return <CircularProgress isIndeterminate color="primary" />;
    }
  };

  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      direction={"column"}
      overflow={"hidden"}
    >
      <TopBar />

      <Flex
        className="new-rental"
        width={"100%"}
        height={"100%"}
        align={"center"}
        justify={"center"}
        color={"black"}
      >
        <Flex
          className="new-rental-steps-form"
          as={"form"}
          direction={["column"]}
          width={["900px"]}
          height={["auto"]}
          background={"white"}
          borderRadius={"10px"}
          align={["center"]}
          justify={["flex-start"]}
          paddingY={["20px"]}
          gap={["20px"]}
        >
          <Text fontSize={["22px"]} fontWeight={["bold"]} textAlign={"center"}>
            Nova Locação
          </Text>

          <Stepper index={step} width={["640px"]} height={["100%"]}>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator borderColor={"gray.300"}>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box flexShrink="0">
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription style={{ color: "black" }}>
                    {step.description}
                  </StepDescription>
                </Box>

                <StepSeparator style={{ background: "gray" }} />
              </Step>
            ))}
          </Stepper>

          {routeStep()}
        </Flex>
      </Flex>
    </Flex>
  );
}
