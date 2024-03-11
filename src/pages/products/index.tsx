import Head from "next/head";
import { productsMock } from "@/mocks/products";
import {
  Box,
  ImageListItem,
  ImageListItemBar,
  Pagination,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { getMediumImage } from "@/utils/r2/r2-endpoints";

export default function Products() {
  useEffect(() => {
    const currentProduct = sessionStorage.getItem("currentProduct");
    if (currentProduct) {
      const productEl = document.getElementById(currentProduct);
      if (productEl) {
        productEl.scrollIntoView({ behavior: "instant", block: "center" });
      }
    }
  }, []);

  const saveCurrentProduct = (id: string) => {
    sessionStorage.setItem("currentProduct", id);
  };
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
            display: "grid",
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
          {productsMock.map((product) => (
            <Link
              onClick={saveCurrentProduct.bind(null, product._id)}
              href={"/products/" + product._id}
              key={product._id}
              color={"inherit"}
            >
              <ImageListItem id={product._id} key={product._id} sx={{ my: 4 }}>
                <img
                  srcSet={`${getMediumImage(product.image, 1)}?w=248&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${getMediumImage(product.image, 1)}?w=248&h=164&fit=crop&auto=format`}
                  alt={product.name}
                  loading={"lazy"}
                />
                <ImageListItemBar
                  title={product.name}
                  subtitle={`$${product.price}`}
                  position="below"
                  content={product.description}
                />
              </ImageListItem>
            </Link>
          ))}
        </Box>
        <Pagination count={10} sx={{ my: 4 }} />
      </Box>
    </>
  );
}
