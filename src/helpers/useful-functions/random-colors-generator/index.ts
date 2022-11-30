export const generateRandomColor = () => {
  const x = Math.floor(Math.random() * 256);
  const y = Math.floor(Math.random() * 256);
  const z = Math.floor(Math.random() * 256);

  const generatedColor = `rgb(${x}, ${y}, ${z})`;

  return generatedColor;
};
