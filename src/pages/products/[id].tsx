import { useRouter } from "next/router";
import Head from "next/head";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Product, productsMock } from "@/mocks/products";
import { Box, Button, Container, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CartContext, cartContext } from "@/context/cart-context";
import { getLargeImage } from "@/utils/r2/r2-endpoints";

export default function Product({ product }: { product: Product }) {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState<number>(1);
  const { cart, setCart } = useContext(cartContext) as CartContext;
  const handleNext = () => {
    if (currentImage < 4) {
      setCurrentImage(currentImage + 1);
    } else {
      setCurrentImage(1);
    }
  };
  const handlePrevious = () => {
    if (currentImage > 1) {
      setCurrentImage(currentImage - 1);
    } else {
      setCurrentImage(4);
    }
  };

  const handleAddToCart = () => {
    const cartItem = cart.find((item) => item.product._id === product._id);
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.product._id === product._id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return;
    }
    const newCart = [...cart, { product, quantity: 1 }];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  useEffect(() => {
    const storageCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storageCart);
  }, [setCart]);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Product {product.name}</title>
      </Head>
      <Button
        onClick={() => router.back()}
        variant={"contained"}
        sx={{ margin: 2 }}
      >
        Back to products
      </Button>
      <Container
        sx={{
          width: { xs: "100%", sm: "90%", lg: "80%", xl: "70%" },
          my: 4,
          display: { xs: "block", md: "flex" },
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: { xs: "flex", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            width: { xs: "100%", md: "45%" },
            borderRadius: { xs: 0, md: 3 },
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            srcSet={`${getLargeImage(product.image, currentImage)}?w=248&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${getLargeImage(product.image, currentImage)}?w=248&h=164&fit=crop&auto=format`}
            alt={product.name}
            loading={"lazy"}
            style={{
              height: "auto",
              width: "100%",
            }}
          />
          <Box
            sx={{
              cursor: "pointer",
              position: "absolute",
              left: 0,
              backgroundColor: "white",
              p: 1,
              borderRadius: "0 10px 10px 0",
            }}
            onClick={handlePrevious}
          >
            <ArrowBackIosNewIcon
              sx={{
                position: "relative",
                right: 0,
                ":hover": { color: "gray" },
                ":active": { right: 2 },
              }}
            />
          </Box>
          <Box
            sx={{
              cursor: "pointer",
              position: "absolute",
              right: 0,
              backgroundColor: "white",
              p: 1,
              borderRadius: "10px 0 0 10px",
            }}
            onClick={handleNext}
          >
            <ArrowForwardIosIcon
              sx={{
                position: "relative",
                left: 0,
                ":hover": { color: "gray" },
                ":active": { left: 2 },
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{ width: { xs: "100%", md: "45%" } }}
          display={"flex"}
          flexDirection={"column"}
          gap={2}
        >
          <Typography
            variant={"h3"}
            fontWeight={600}
            sx={{ mb: 2, textAlign: "center" }}
          >
            {product.name}
          </Typography>
          <Typography variant={"body2"}>{product.description}</Typography>
          <Typography variant={"body1"}>${product.price}</Typography>
          <Button variant="contained" onClick={handleAddToCart}>
            Add to cart
          </Button>
        </Box>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const productId = query.id;

  if (!productId) {
    return {
      notFound: true,
    };
  }

  const product = productsMock.find((product) => product._id === productId);

  if (!product) {
    return {
      notFound: true,
    };
  }
  console.log(product);
  return {
    props: {
      product,
    },
  };
};
