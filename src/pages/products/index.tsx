import Head from "next/head";
import { productsMock } from "@/mocks/products";
import { Box, Pagination, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { getNumberOfPages } from "@/utils/value-handling/number-handling";
import { Product } from "@/types/product";
import ProductCard from "@/components/Product/ProductCard";
interface Props {
  products: Product[];
}

export default function Products({ products }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [productsPerPage] = useState<number>(5);
  const [loaded, setLoaded] = useState<boolean>(false);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value - 1);
    sessionStorage.setItem("currentPage", String(value - 1));
  };

  useEffect(() => {
    if (!loaded) {
      const page = sessionStorage.getItem("currentPage");
      if (page) {
        setCurrentPage(Number(page));
        setLoaded(true);
      }
      return;
    }

    const currentProduct = sessionStorage.getItem("currentProduct");
    if (currentProduct) {
      const productEl = document.getElementById(currentProduct);
      if (productEl) {
        productEl.scrollIntoView({ behavior: "instant", block: "center" });
      }
    }
  }, [loaded]);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Products</title>
      </Head>
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h2"} fontWeight={600} sx={{ mb: 2 }}>
          Products
        </Typography>
        <Box
          sx={{
            width: { xs: "80%", md: "80%", lg: "70%", xl: "60%" },
            display: { xs: "flex", sm: "grid" },
            padding: { xs: "0", sm: "auto" },
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            gridTemplateColumns: {
              xs: "repeat(1, minmax(0, 1fr))",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
              lg: "repeat(4, minmax(0, 1fr))",
              xl: "repeat(5, minmax(0, 1fr))",
            },
          }}
        >
          {products
            .slice(
              productsPerPage * currentPage,
              productsPerPage * currentPage + productsPerPage,
            )
            .map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </Box>
        <Pagination
          count={getNumberOfPages(products.length, productsPerPage)}
          onChange={handlePageChange}
          page={currentPage + 1}
          sx={{ my: 4 }}
        />
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: { products: productsMock },
  };
};
