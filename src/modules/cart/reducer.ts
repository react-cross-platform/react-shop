import update from "immutability-helper";

export const ACTION_FINISH_CART = "cart.ACTION_FINISH_CART";

export interface CartReducer {
  readonly finishedId?: number;
}

const DEFAULT: CartReducer = {
  finishedId: undefined
};

const cart = (state = DEFAULT, action) => {
  switch (action.type) {
    case ACTION_FINISH_CART:
      return update(state, {
        finishedId: { $set: action.id }
      });
    default:
      return state;
  }
};

export default cart;
