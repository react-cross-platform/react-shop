import update from "immutability-helper";

import { ACTION_SELECT_COLOR, ACTION_SELECT_SUBPRODUCT } from "./constants";

export interface IProductReducer {
  readonly subProductId?: string;
  readonly colorId?: number;
}

const DEFAULT_PRODUCT: IProductReducer = {
  colorId: undefined,
  subProductId: undefined
};

const product = (state = DEFAULT_PRODUCT, action) => {
  switch (action.type) {
    case ACTION_SELECT_SUBPRODUCT:
      return update(state, {
        colorId: { $set: action.colorId },
        subProductId: { $set: action.subProductId }
      });

    case ACTION_SELECT_COLOR:
      return update(state, {
        colorId: { $set: action.colorId }
      });

    default:
      return state;
  }
};

export default product;
