import React from "react";
import { ChakraProvider, Progress } from "@chakra-ui/react";
import { Provider } from "react-redux";
import "../styles/globals.css";
import { theme } from "../styles/theme";
import { wrapper } from "../redux/store";

function MyApp({ Component, pageProps }) {
  return (
    // <Provider store={store}>
    <ChakraProvider theme={theme}>
      {/* <Progress
        colorScheme="primary"
        size="xs"
        value={64}
        pos="absolute"
        top={0}
        right={0}
        left={0}
        isIndeterminate
      /> */}
      <Component {...pageProps} />
    </ChakraProvider>
    // </Provider>
  );
}

export default wrapper.withRedux(MyApp);
