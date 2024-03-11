import { Product } from "@/mocks/products";
import { Box, Button, Typography } from "@mui/material";
import { cartContext, CartContext, CartItemType } from "@/context/cart-context";
import { useContext } from "react";
import {
  getLargeImage,
  getMediumImage,
  getSmallImage,
} from "@/utils/r2/r2-endpoints";

interface Props {
  item: CartItemType;
  addToCart: (item: CartItemType) => void;
  removeFromCart: (item: CartItemType) => void;
}

export default function CartItem({ item, addToCart, removeFromCart }: Props) {
  return (
    <>
      <Box
        ml={"auto"}
        mr={"auto"}
        gap={2}
        sx={{
          display: { xs: "flex", md: "grid" },
          gridTemplateColumns: { md: "1fr 4fr 2fr 1fr" },
          justifyContent: "space-between",
          width: { xs: "90%", md: "50%" },
        }}
      >
        <img
          src={`${getMediumImage(item.product.image, 1)}`}
          alt={item.product.name}
          width={100}
          style={{ borderRadius: "5px" }}
        />
        <Box
          height={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <Typography
            sx={{
              fontSize: { xs: "1rem", md: "1.5rem" },
            }}
            variant={item.product.name.length > 10 ? "body1" : "h5"}
          >
            {item.product.name}
          </Typography>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <Typography variant={"body1"} fontWeight={100}>
              ${item.product.price}
            </Typography>
            <Typography variant={"body1"} fontWeight={300}>
              x{item.quantity}
            </Typography>
          </Box>
        </Box>
        <Box
          height={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <p>Total:</p>
          <p>${(item.product.price * item.quantity).toFixed(2)}</p>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={1}
          sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}
        >
          <Button variant={"contained"} onClick={() => removeFromCart(item)}>
            -
          </Button>
          <Button variant={"contained"} onClick={() => addToCart(item)}>
            +
          </Button>
        </Box>
      </Box>
    </>
  );
}
