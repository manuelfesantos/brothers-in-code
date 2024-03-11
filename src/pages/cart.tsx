import Head from "next/head";
import { CartContext, cartContext, CartItemType } from "@/context/cart-context";
import { useContext, useEffect } from "react";
import CartItem from "@/components/CartItem/CartItem";
import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";

export default function Cart() {
  const { cart, setCart } = useContext(cartContext) as CartContext;

  const handleRemoveFromCart = (item: CartItemType) => {
    const cartItem = cart.find(
      (cartItem) => item.product._id === cartItem.product._id,
    );
    if (!cartItem) return;
    if (cartItem.quantity > 1) {
      const newCart = cart.map((cartItem) => {
        if (item.product._id === cartItem.product._id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity - 1,
          };
        }
        return cartItem;
      });
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return;
    }
    const newCart = cart.filter(
      (cartItem) => item.product._id !== cartItem.product._id,
    );
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleAddToCart = (item: CartItemType) => {
    const cartItem = cart.find(
      (cartItem) => item.product._id === cartItem.product._id,
    );
    if (!cartItem) {
      const newCart = [...cart, { product: item.product, quantity: 1 }];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return;
    }
    const newCart = cart.map((cartItem) => {
      if (item.product._id === cartItem.product._id) {
        return {
          ...cartItem,
          quantity: cartItem.quantity + 1,
        };
      }
      return cartItem;
    });
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
        <title>Cart</title>
      </Head>
      <Container
        max-width="90%"
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" fontWeight={500} my={4}>
          Cart
        </Typography>
        {cart.length ? (
          <>
            <Box display={"flex"} flexDirection={"column"} gap={2}>
              {[...new Set(cart)].map((item) => (
                <CartItem
                  key={item.product._id + Math.random()}
                  item={item}
                  addToCart={handleAddToCart}
                  removeFromCart={handleRemoveFromCart}
                />
              ))}
            </Box>
            <Typography variant={"h5"} mt={4} mb={2}>
              Total: $
              {cart.reduce(
                (acc, item) => acc + item.product.price * item.quantity,
                0,
              )}
            </Typography>
            <Link href={"/checkout"}>
              <Button variant={"contained"}>Checkout</Button>
            </Link>
          </>
        ) : (
          <>
            <Typography variant={"h4"}>Cart is empty</Typography>
            <Link href={"/products"}>
              <Button sx={{ mt: 2 }} variant={"contained"}>
                Go to the products page
              </Button>
            </Link>
          </>
        )}
      </Container>
    </>
  );
}
