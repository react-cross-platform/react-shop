export const prettyPrice = (value: number) => {
  if (!value) {
    return;
  }
  const splitValue = Math.round(value).toString().split('');
  const valueLength = splitValue.length;
  switch (splitValue.length) {
    case 4:
      splitValue.splice(-3, 0, ' ');
      return splitValue.join('');

    case 5:
      splitValue.splice(-3, 0, ' ');
      return splitValue.join('');

    case 6:
      splitValue.splice(3, 0, ' ');
      return splitValue.join('');

    default:
      return value;
  }
};
