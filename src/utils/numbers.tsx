export const fixNumber = (num: number, decimals: number): number => {
  return parseFloat(num.toFixed(decimals));
};
