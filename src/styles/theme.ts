import { extendTheme } from "@chakra-ui/react";

const styles = {
  global: {
    // styles for the `body`
    body: {
      bg: "backgroundDark",
    },
  },
};

const colors = {
  primary: {
    50: "#FFE5EC",
    100: "#FFB8CA",
    200: "#FF8AA7",
    300: "#FF5C85",
    400: "#FF2E62",
    500: "#FF0040",
    600: "#CC0033",
    700: "#990026",
    800: "#66001A",
    900: "#33000D",
  },
  backgroundLight: "#222636",
  backgroundDark: "#0E111A",
};

const shadows = {
  high: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;",
};

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles,
  colors,
  shadows,
  fonts: {
    // body: "Roboto",
  },
  components: {
    Button: {
      variants: {
        primary: {
          bg: "primary.500",
          color: "white",
          _hover: {
            bg: "primary.600",
          },
        },

        menu: {
          justifyContent: "flex-start",
          _hover: {
            bg: "whiteAlpha.200",
          },
          _focus: {
            boxShadow: "none",
          },
        },

        menuActive: {
          bg: "backgroundLight",
          boxShadow: "high",
          justifyContent: "flex-start",
          _focus: {
            boxShadow: "high",
          },
        },
      },
    },
  },
});
