import { Box, ImageListItem, ImageListItemBar } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { getMediumImage } from "@/utils/r2/r2-endpoints";
import { Product } from "@/types/product";
import BookmarkButton from "@/components/Product/BookmarkButton";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const saveCurrentProduct = (id: string) => {
    sessionStorage.setItem("currentProduct", id);
  };
  return (
    <Box
      key={product._id}
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <ImageListItem
        id={product._id}
        key={product._id}
        sx={{
          my: 4,
          width: { xs: "100%", sm: 250, md: 250, lg: 250 }, // 250,
          height: { xs: "80vw", sm: 250, md: 250, lg: 250 },
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box width={"100%"} height={{ xs: "80vw", sm: 250, md: 250, lg: 250 }}>
          <Link
            onClick={saveCurrentProduct.bind(null, product._id)}
            href={"/products/" + product._id}
            key={product._id}
            color={"inherit"}
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={`${getMediumImage(product.image, 1)}`}
              alt={product.name}
              placeholder={"blur"}
              blurDataURL={"/placeholder.jpeg"}
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </Link>
        </Box>
        <ImageListItemBar
          sx={{
            width: "100%",
            pl: 1,
          }}
          title={product.name}
          subtitle={`$${product.price}`}
          content={product.description}
          actionIcon={
            <BookmarkButton
              productId={product._id}
              saveCurrentProduct={saveCurrentProduct}
            />
          }
          position={"below"}
        />
      </ImageListItem>
    </Box>
  );
}
