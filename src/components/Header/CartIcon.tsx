import { Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { CartContext, cartContext } from "@/context/cart-context";

export default function CartIcon() {
  const { cart, setCart } = useContext(cartContext) as CartContext;

  useEffect(() => {
    const storageCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storageCart);
  }, [setCart]);

  return (
    <Link href={"/cart"} style={{ marginRight: 10 }}>
      <IconButton
        color={"inherit"}
        size={"large"}
        sx={{ position: "relative" }}
      >
        <Badge
          badgeContent={cart.reduce((count, item) => count + item.quantity, 0)}
          color="error"
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Link>
  );
}
