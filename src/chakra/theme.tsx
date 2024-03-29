import { extendTheme } from "@chakra-ui/react";

import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";

import "@fontsource/libre-baskerville/400.css";
import { Button } from "./Button";

export const theme = extendTheme({
  colors: {
    brand: {
      100: "#0292fe",
    },
  },
  fonts: {
    body: "'Open Sans', sans-serif", // Corrected font family name
    heading: "'Libre Baskerville', serif", // Corrected font family name
  },
  styles: {
    global: () => ({
      body: {
        bg: "gray.100",
      },
    }),
  },
  components: {
    Button, // Make sure your custom Button component is correctly exported from the "./Button" file
  },
});
