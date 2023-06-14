/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Text } from "@chakra-ui/layout";
import TopBar from "@/components/TopBar";
import {
  Box,
  Button,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import car from "@/providers/car/car";
import { ICarResponse } from "@/interface/ICar";
import { clearSelectedClient } from "@/utils/localStorage/car";
import ClientStep from "@/components/NewRental/ClientStep";

const steps = [
  { title: "Datas", description: "Data de locação" },
  { title: "Carro", description: "Selecionar carro" },
  { title: "Cliente", description: "Dados do cliente" },
];

export default function Home() {
  const toast = useToast();
  const [cars, setCars] = useState<ICarResponse[]>([]);
  const [step, setStep] = useState<number>(0);
  const { activeStep } = useSteps({
    index: step,
    count: steps.length,
  });

  useEffect(() => {
    car
      .list()
      .then((data) => {
        setCars(data);
      })
      .catch((e) => {
        console.error(e);
        toast({
          title: "Erro ao requisitar clients",
          status: "error",
        });
      });
  }, []);

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
          height={["88%"]}
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

          <Stepper index={activeStep} width={["640px"]} height={["100%"]}>
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

          <ClientStep step={step} setStep={setStep} />

          <Flex
            display={step !== 0 ? "flex" : "none"}
            className="action-buttons"
            direction={["row"]}
            height={["100px"]}
            justify={"space-between"}
          >
            <Button
              variant={"primary"}
              background={"red"}
              height={["30px"]}
              color={"white"}
              width={"140px"}
              onClick={() => {
                clearSelectedClient();
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
              onClick={() => setStep((prev) => prev - 1)}
            >
              Voltar Passo
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
