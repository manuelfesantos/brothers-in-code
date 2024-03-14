export const getNumberOfPages = (products: number, productsPerPage: number) => {
  const roundedProducts = Math.round(products / productsPerPage);
  return products - roundedProducts * productsPerPage === 0
    ? roundedProducts
    : roundedProducts + 1;
};
