import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header/Header";
import { createTheme, ThemeProvider } from "@mui/material";
import CartContextProvider from "@/context/cart-context";
import UserContextProvider from "@/context/user-context";

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    zIndex: {
      drawer: 1200,
    },
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
      <UserContextProvider>
        <CartContextProvider>
          <ThemeProvider theme={theme}>
            <Header />
            <Component {...pageProps} />
          </ThemeProvider>
        </CartContextProvider>
      </UserContextProvider>
    </>
  );
}
