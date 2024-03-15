import { Box, Button, Typography } from "@mui/material";
import { getMediumImage } from "@/utils/r2/r2-endpoints";
import Link from "next/link";
import Image from "next/image";
import { CartItemType } from "@/types/cart";

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
          display: "grid",
          gridTemplateColumns: "1fr 4fr 2fr 1fr",
          alignItems: "center",
          width: { xs: "95vw", sm: "60vw", md: "50vw", lg: "40vw", xl: "30vw" },
          ml: { xs: "auto", sm: "auto", md: "auto" },
        }}
      >
        <Link
          href={`/products/${item.product._id}`}
          style={{
            width: 100,
            height: 100,
            borderRadius: "5px",
            position: "relative",
          }}
        >
          <Image
            src={`${getMediumImage(item.product.image, 1)}`}
            alt={item.product.name}
            fill
            style={{
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        </Link>

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
