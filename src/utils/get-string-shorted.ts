export const getStringShorted = (str: string, length: number = 16) => {
  if (str.length > length) {
    return str.substring(0, length) + "...";
  }

  return str;
};
