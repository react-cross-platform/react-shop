export const isSafariBrowser = () => {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};
