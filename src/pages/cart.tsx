import Head from "next/head";
import { CartContext, cartContext } from "@/context/cart-context";
import { useContext, useEffect, useState } from "react";
import CartItem from "@/components/CartItem/CartItem";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import Link from "next/link";
import SimpleSnackBar from "@/components/SimpleSnackBar/SimpleSnackBar";
import { CartItemType } from "@/types/cart";

export default function Cart() {
  const { cart, setCart } = useContext(cartContext) as CartContext;
  const [recentlyRemoved, setRecentlyRemoved] = useState<CartItemType | null>(
    null,
  );
  const [showingSnackBar, setShowingSnackbar] = useState<boolean>(false);

  const handleRemoveFromCart = (item: CartItemType) => {
    const cartItem = getCartItem(item);
    if (!cartItem) return;
    if (cartItem.quantity > 1) {
      const newCart = changeItemQuantity(cartItem, -1);
      saveCart(newCart);
      return;
    }
    setRecentlyRemoved(cartItem);
    openSnackBar();
    const newCart = cart.filter(
      (cartItem) => item.product._id !== cartItem.product._id,
    );
    saveCart(newCart);
  };

  const handleAddToCart = (item: CartItemType) => {
    const cartItem = getCartItem(item);
    if (!cartItem) {
      const newCart = [...cart, { product: item.product, quantity: 1 }];
      saveCart(newCart);
      return;
    }
    const newCart = changeItemQuantity(cartItem, 1);
    saveCart(newCart);
  };

  const changeItemQuantity = (item: CartItemType, quantity: number) => {
    return cart.map((cartItem) => {
      if (item.product._id === cartItem.product._id) {
        return {
          ...cartItem,
          quantity: cartItem.quantity + quantity,
        };
      }
      return cartItem;
    });
  };

  const getCartItem = (item: CartItemType) => {
    return cart.find((cartItem) => item.product._id === cartItem.product._id);
  };

  const saveCart = (newCart: CartItemType[]) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const openSnackBar = () => {
    setShowingSnackbar(true);
  };

  const closeSnackBar = () => {
    setShowingSnackbar(false);
  };

  const undo = () => {
    if (!recentlyRemoved) return;
    const newCart = [...cart, recentlyRemoved];
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
        {cart.length ? (
          <>
            <Typography variant="h2" fontWeight={500} my={4}>
              Cart
            </Typography>
            <Box display={"flex"} flexDirection={"column"} gap={2}>
              {[...new Set(cart)].map((item) => (
                <>
                  <CartItem
                    key={item.product._id + Math.random()}
                    item={item}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                  />
                  {cart.indexOf(item) < cart.length - 1 && (
                    <Divider
                      key={item.product._id}
                      variant={"fullWidth"}
                    ></Divider>
                  )}
                </>
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
      <SimpleSnackBar
        open={showingSnackBar}
        close={closeSnackBar}
        message={"Item removed"}
        undo={undo}
      />
    </>
  );
}
