import Head from "next/head";
import { Product, productsMock } from "@/mocks/products";
import {
  Box,
  Button,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Pagination,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getMediumImage } from "@/utils/r2/r2-endpoints";
import { GetServerSideProps } from "next";
import { getNumberOfPages } from "@/utils/value-handling/number-handling";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
interface Props {
  products: Product[];
}

export default function Products({ products }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [productsPerPage, setProductsPerPage] = useState<number>(4);
  const [loaded, setLoaded] = useState<boolean>(false);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value - 1);
    sessionStorage.setItem("currentPage", String(value - 1));
  };

  const saveCurrentProduct = (id: string) => {
    sessionStorage.setItem("currentProduct", id);
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
          {products
            .slice(
              productsPerPage * currentPage,
              productsPerPage * currentPage + productsPerPage,
            )
            .map((product) => (
              <ImageListItem
                id={product._id}
                key={product._id}
                sx={{ my: 4, display: "flex", justifyContent: "center" }}
              >
                <Link
                  onClick={saveCurrentProduct.bind(null, product._id)}
                  href={"/products/" + product._id}
                  key={product._id}
                  color={"inherit"}
                >
                  <img
                    srcSet={`${getMediumImage(product.image, 1)}?h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${getMediumImage(product.image, 1)}?w=248&h=164&fit=crop&auto=format`}
                    alt={product.name}
                    loading={"lazy"}
                    width={"100%"}
                  />
                  <ImageListItemBar
                    title={
                      product.name.length > 13
                        ? product.name.slice(0, 13) + "..."
                        : product.name
                    }
                    subtitle={`$${product.price}`}
                    position="below"
                    content={product.description}
                  />
                </Link>
                <IconButton sx={{ position: "absolute", right: 0, bottom: 15 }}>
                  <BookmarkBorderIcon />
                </IconButton>
              </ImageListItem>
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
