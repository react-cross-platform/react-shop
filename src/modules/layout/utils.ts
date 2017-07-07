const isSafariBrowser = () => {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

const swipeEnabled = () => {
  return !isSafariBrowser();
};

export { swipeEnabled, isSafariBrowser };
