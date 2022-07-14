export const shuffle = (...items) => {
  const tempContainer = [...items];
  const result = [];
  while (tempContainer.length > 0) {
    const index = Math.floor(Math.random() * tempContainer.length);
    result.push(tempContainer.splice(index, 1).pop());
  }
  return result;
};
