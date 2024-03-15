import { Box, Button, Container, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import WelcomeMessage from "@/components/Home/Welcome Message";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Home</title>
      </Head>
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <WelcomeMessage />
          <Link href="/products" color="secondary">
            Go to the products page
          </Link>
          <Button
            onClick={() => router.push("/login")}
            variant="contained"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
      </Container>
    </>
  );
}
