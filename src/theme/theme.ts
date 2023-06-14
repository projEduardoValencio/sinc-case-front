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
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    primary: "#183884",
    cover: "#D0D7E6",
    coverHover: "#aabce4",
  },
  components: {
    Button,
  },
});

export default theme;
