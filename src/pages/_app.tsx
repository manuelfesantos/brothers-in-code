import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header/Header";
import { createTheme, ThemeProvider } from "@mui/material";
import CartContextProvider from "@/context/cart-context";

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#313131",
      },
      secondary: {
        main: "#afafaf",
      },
    },
  });

  return (
    <>
      <CartContextProvider>
        <ThemeProvider theme={theme}>
          <Header />
          <Component {...pageProps} />
        </ThemeProvider>
      </CartContextProvider>
    </>
  );
}
