export const transformProductName = (name: string, quantity: number) => {
  if (quantity === 1) {
    return name;
  }
  if (name.endsWith("us")) {
    return name.slice(0, -2) + "i";
  }
  if (name.endsWith("s")) {
    return name;
  }
  if (name.endsWith("y")) {
    return name.slice(0, -1) + "ies";
  }
  if (name.endsWith("o")) {
    return name + "es";
  }
  if (name.endsWith("x")) {
    return name + "es";
  }
  if (name.endsWith("ch")) {
    return name + "es";
  }
  if (name.endsWith("sh")) {
    return name + "es";
  }
  if (name.endsWith("z")) {
    return name + "es";
  }
  return name + "s";
};
