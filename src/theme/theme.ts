import { defineStyleConfig } from "@chakra-ui/styled-system";
import { extendTheme } from "@chakra-ui/theme-utils";

const Button = defineStyleConfig({
  variants: {
    primary: {
      background: "#183884",
      _hover: {
        background: "#183884",
        opacity: "70%",
      },
    },
  },
});

const theme = extendTheme({
  colors: {
    primary: "#183884",
  },
  components: {
    Button,
  },
});

export default theme;
