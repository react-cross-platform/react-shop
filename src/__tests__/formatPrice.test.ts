import "jest";
import { formatPrice } from "../../src/modules/common/utils";

test("formatPrice 246600 to equal 246 600", () => {
  expect(formatPrice(246600)).toBe("246 600");
});

test("formatPrice 26600 to equal 26 600", () => {
  expect(formatPrice(26600)).toBe("26 600");
});

test("formatPrice 1600 to equal 1 600", () => {
  expect(formatPrice(1600)).toBe("1 600");
});

test("formatPrice 600 to equal 600", () => {
  expect(formatPrice(600)).toBe("600");
});
