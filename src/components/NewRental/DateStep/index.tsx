/* eslint-disable react-hooks/exhaustive-deps */
import { steps } from "@/pages/rental";
import {
  getSelectedDatePeriod,
  setSelectedDatePeriod,
} from "@/utils/localStorage/date";
import { clearAllStorageRental } from "@/utils/localStorage/keys";
import {
  Button,
  Flex,
  FormControl,
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
const DateStep: FC<Props> = ({ step, setStep }) => {
  const toast = useToast();

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  useEffect(() => {
    const loadPeriodDate = getSelectedDatePeriod();
    console.log(loadPeriodDate);
    if (loadPeriodDate) {
      setStartDate(loadPeriodDate.startDate);
      setEndDate(loadPeriodDate.endDate);
      console.log("DATE: ", new Date().toLocaleDateString());
    }
  }, []);

  const nextStep = () => {
    if (!startDate || !endDate) {
      toast({
        title: "Data de retirada ou devolução não informada",
        status: "warning",
      });
      return;
    } else {
      setSelectedDatePeriod({ startDate, endDate });
      setStep(step + 1);
      return;
    }
  };

  const formatDate = (date: Date) => {
    return date.toISOString().substring(0, 10);
  };

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
      <Flex direction={["row"]} width={["100%"]}>
        <FormControl>
          {/* <FormLabel>Data de retirada</FormLabel> */}
          <InputGroup>
            <InputLeftAddon
              background={"gray.400"}
              fontWeight={["700"]}
              width={["170px"]}
            >
              Data de retirada
              {/* <CalendarIcon /> */}
            </InputLeftAddon>
            <Input
              id="start-date"
              type="date"
              value={formatDate(new Date(startDate))}
              background={"gray.300"}
              css={`
                ::-webkit-calendar-picker-indicator {
                  background: url(https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/calendar-16.png)
                    center/80% no-repeat;
                  color: black;
                }
              `}
              onChange={(e) => setStartDate(new Date(e.target.value))}
            />
          </InputGroup>
        </FormControl>

        <Flex width={["100%"]} />

        <FormControl>
          {/* <FormLabel>Data de devolução</FormLabel> */}
          <InputGroup>
            <InputLeftAddon
              background={"gray.400"}
              fontWeight={["700"]}
              width={["170px"]}
            >
              Data de devolução
              {/* <CalendarIcon /> */}
            </InputLeftAddon>
            <Input
              id="end-date"
              value={formatDate(new Date(endDate))}
              type="date"
              background={"gray.300"}
              css={`
                ::-webkit-calendar-picker-indicator {
                  background: url(https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/calendar-16.png)
                    center/80% no-repeat;
                  color: black;
                }
              `}
              onChange={(e) => setEndDate(new Date(e.target.value))}
            />
          </InputGroup>
        </FormControl>
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
          onClick={() => nextStep()}
        >
          Próximo Passo
        </Button>
      </Flex>
    </Flex>
  );
};

export default DateStep;
