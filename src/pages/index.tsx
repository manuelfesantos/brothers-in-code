import { Box, Button, Container, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import WelcomeMessage from "@/components/Home/Welcome Message";
import AccountActionButton from "@/components/Home/AccountActionButton";
import ProductCarousel from "@/components/Home/ProductCarousel";
import { productsMock } from "@/mocks/products";
import { GetServerSideProps } from "next";
import { Product } from "@/types/product";

interface Props {
  products: Product[];
}
export default function Home({ products }: Props) {
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
          <AccountActionButton />
          <ProductCarousel products={products} />
        </Box>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      products: [
        productsMock[0],
        productsMock[1],
        productsMock[2],
        productsMock[3],
        productsMock[4],
      ],
    },
  };
};
