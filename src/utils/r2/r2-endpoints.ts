const r2Endpoint = "https://floral-hill-5d85.manuelfesantos.workers.dev/";
const productMockups = "product-mockups/";
const smallImage = `${r2Endpoint}${productMockups}small/`;
const largeImage = `${r2Endpoint}${productMockups}large/`;

const mediumImage = `${r2Endpoint}${productMockups}medium/`;

export const getSmallImage = (image: string, position: number) =>
  `${smallImage}${image}-${position}.jpeg`;
export const getLargeImage = (image: string, position: number) =>
  `${largeImage}${image}-${position}.jpeg`;
export const getMediumImage = (image: string, position: number) =>
  `${mediumImage}${image}-${position}.jpeg`;
