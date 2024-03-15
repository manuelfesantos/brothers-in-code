import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { IconButton } from "@mui/material";
import { userContext, UserContext } from "@/context/user-context";
import { useContext } from "react";
import Link from "next/link";

interface Props {
  productId: string;
  saveCurrentProduct: (id: string) => void;
}
export default function BookmarkButton({
  productId,
  saveCurrentProduct,
}: Props) {
  const { user } = useContext(userContext) as UserContext;
  return user ? (
    <IconButton>
      <BookmarkBorderIcon color={"secondary"} />
    </IconButton>
  ) : (
    <Link onClick={saveCurrentProduct.bind(null, productId)} href={"/login"}>
      <IconButton>
        <BookmarkBorderIcon color={"secondary"} />
      </IconButton>
    </Link>
  );
}
