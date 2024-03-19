import Typography from "@mui/material/Typography";
import Image from "next/image";
import Box from "@mui/material/Box";
import { getLargeImage } from "@/utils/r2/r2-endpoints";
import React, { useCallback, useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Product } from "@/types/product";
import ProductCard from "@/components/Product/ProductCard";

interface Props {
  products: Product[];
}
export default function ProductCarousel({ products }: Props) {
  const [leftProduct, setLeftProduct] = useState(products.length - 1);
  const [rightProduct, setRightProduct] = useState(1);
  const [currentProduct, setCurrentProduct] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [movingForward, setMovingForward] = useState(true);
  const [moving, setMoving] = useState(false);
  const moveProduct = useCallback(
    (position: number, forward: boolean) => {
      setMovingForward(forward);
      if (forward) {
        if (position === products.length - 1) {
          return 0;
        }
        return position + 1;
      }
      if (position === 0) {
        return products.length - 1;
      }
      return position - 1;
    },
    [products],
  );

  const moveProducts = useCallback(
    (forward: boolean) => {
      if (!moving) {
        setMoving(true);
        setCurrentProduct((prevState) => moveProduct(prevState, forward));
        setLeftProduct((prevState) => moveProduct(prevState, forward));
        setRightProduct((prevState) => moveProduct(prevState, forward));
        setTimeout(() => setMoving(false), 500);
      }
    },
    [moving, moveProduct],
  );

  const isLeftProduct = (id: string) => {
    return id === products[leftProduct]._id;
  };
  const isRightProduct = (id: string) => {
    return id === products[rightProduct]._id;
  };
  const isCurrentProduct = (id: string) => {
    return id === products[currentProduct]._id;
  };

  const resolveTransform = (id: string) => {
    if (isLeftProduct(id)) {
      return "translateX(-100%)";
    } else if (isRightProduct(id)) {
      return "translateX(100%)";
    } else if (isCurrentProduct(id)) {
      return "translateX(0)";
    } else return "translateX(-100%)";
  };

  const resolveOpacity = (id: string) => {
    if (isLeftProduct(id)) {
      return movingForward ? 1 : 0;
    } else if (isRightProduct(id)) {
      return movingForward ? 0 : 1;
    } else if (isCurrentProduct(id)) {
      return 1;
    } else return 0;
  };
  useEffect(() => {
    const interval = setInterval(() => moveProducts(true), 5000);
    return () => clearInterval(interval);
  }, [moveProducts]);
  if (products.length < 1) {
    return <></>;
  }
  return (
    <>
      <Typography variant={"h3"}>Images of the week</Typography>
      <Box
        width={500}
        height={500}
        maxWidth={"90vw"}
        maxHeight={"90vw"}
        overflow={"hidden"}
        position={"relative"}
        sx={{ backgroundColor: "primary.main" }}
        display={"flex"}
        alignItems={"center"}
        borderRadius={5}
      >
        {products.map((product) => (
          <Box
            key={product._id}
            width={"100%"}
            height={"100%"}
            position={"absolute"}
            sx={{
              transition: "transform 0.5s ease-in-out",
              opacity: resolveOpacity(product._id),
              transform: resolveTransform(product._id),
              top: 0,
              left: 0,
            }}
            onMouseEnter={() => setShowDetails(true)}
            onMouseLeave={() => setShowDetails(false)}
          >
            <Box width={"100%"} height={"100%"} position={"relative"}>
              <Image
                fill
                src={getLargeImage(product.image, 1)}
                alt={product.image}
              />
            </Box>
            {showDetails && <ProductCard product={product} />}
          </Box>
        ))}
        <IconButton
          color={"secondary"}
          sx={{ position: "absolute", left: 0 }}
          onClick={() => moveProducts(false)}
        >
          <ArrowBack />
        </IconButton>
        <IconButton
          color={"secondary"}
          sx={{ position: "absolute", right: 0 }}
          onClick={() => moveProducts(true)}
        >
          <ArrowForward />
        </IconButton>
      </Box>
    </>
  );
}
