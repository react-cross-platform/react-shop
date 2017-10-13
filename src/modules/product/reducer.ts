import update from "immutability-helper";

import {
  ACTION_SELECT_COLOR,
  ACTION_SELECT_SUB_PRODUCT,
  ACTION_UNSELECT_ALL
} from "./constants";

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
    case ACTION_SELECT_SUB_PRODUCT:
      return update(state, {
        subProductId: { $set: action.id },
        colorId: { $set: action.colorId }
      });

    case ACTION_SELECT_COLOR:
      return update(state, { colorId: { $set: action.colorId } });

    case ACTION_UNSELECT_ALL:
      return DEFAULT_PRODUCT;

    default:
      return state;
  }
};

export default product;
