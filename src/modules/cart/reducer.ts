import update from "immutability-helper";

export const ACTION_FINISH_CART = "cart.ACTION_FINISH_CART";

export interface ICartReducer {
  readonly finishedId?: number;
}

const DEFAULT: ICartReducer = {
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
