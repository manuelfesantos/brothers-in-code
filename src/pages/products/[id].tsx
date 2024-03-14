import { useRouter } from "next/router";
import Head from "next/head";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Product, productsMock } from "@/mocks/products";
import { Box, Button, Container, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CartContext, cartContext, CartItemType } from "@/context/cart-context";
import { getLargeImage } from "@/utils/r2/r2-endpoints";
import Link from "next/link";
import SimpleSnackBar from "@/components/SimpleSnackBar/SimpleSnackBar";
import { transformProductName } from "@/utils/value-handling/text-handling";

export default function Product({ product }: { product: Product }) {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState<number>(1);
  const { cart, setCart } = useContext(cartContext) as CartContext;
  const [showingSnackBar, setShowingSnackbar] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [recentlyAdded, setRecentlyAdded] = useState<number>(0);
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
    openSnackBar();
    setRecentlyAdded(quantity);
    const cartItem = getCartItem();
    console.log("Showing Snack Bar: ", showingSnackBar);
    if (cartItem) {
      const newCart = changeItemQuantity(quantity);
      saveCart(newCart);
      return;
    }
    const newCart = [...cart, { product, quantity: quantity }];
    saveCart(newCart);
  };

  const getCartItem = () => {
    return cart.find((item) => item.product._id === product._id);
  };

  const changeItemQuantity = (quantity: number) => {
    return cart.map((item) => {
      if (item.product._id === product._id) {
        return {
          ...item,
          quantity: item.quantity + quantity,
        };
      }
      return item;
    });
  };

  const saveCart = (newCart: CartItemType[]) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const openSnackBar = () => {
    setShowingSnackbar((prevState) => true);
  };

  const closeSnackBar = () => {
    setShowingSnackbar(false);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const undo = () => {
    const cartItem = getCartItem();
    if (!cartItem) return;
    if (cartItem.quantity > recentlyAdded) {
      const newCart = changeItemQuantity(-recentlyAdded);
      saveCart(newCart);
      return;
    }
    const newCart = cart.filter(
      (cartItem) => product._id !== cartItem.product._id,
    );
    saveCart(newCart);
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
      <Link href={"/products"}>
        <Button variant={"contained"} sx={{ margin: 2 }}>
          Back to products
        </Button>
      </Link>
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
          <Box width={"100%"} display={"flex"} justifyContent={"center"}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={1}
              width={"100%"}
            >
              <Button variant="contained" onClick={handleAddToCart}>
                Add {quantity} to cart
              </Button>
              <Box display={"flex"} gap={1} alignItems={"center"}>
                <Button
                  fullWidth
                  variant={"contained"}
                  onClick={decreaseQuantity}
                >
                  -
                </Button>
                <Button
                  fullWidth
                  variant={"contained"}
                  onClick={increaseQuantity}
                >
                  +
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <SimpleSnackBar
        open={showingSnackBar}
        close={closeSnackBar}
        message={`Added ${quantity} ${transformProductName(product.name, quantity)} to Cart`}
        undo={undo}
      />
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
