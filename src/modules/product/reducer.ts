import update from "immutability-helper";

import {
  ACTION_RESET,
  ACTION_SET_ATTRIBUTE_VALUE_IDS,
  ACTION_SET_SUB_PRODUCT_ID
} from "./constants";

export interface IProductReducer {
  readonly subProductId?: number;
  readonly attributeValueIds?: number[];
}

const DEFAULT_PRODUCT: IProductReducer = {
  subProductId: undefined,
  attributeValueIds: undefined,
};

export interface IProductActionParams {
  subProductId?: number;
  attributeValueIds?: number[];
  type?: string;
}

const product = (state = DEFAULT_PRODUCT, action) => {
  switch (action.type) {
    case ACTION_SET_SUB_PRODUCT_ID:
      return update(state, {
        subProductId: { $set: action.subProductId },
        attributeValueIds: { $set: action.attributeValueIds }
      });

    case ACTION_SET_ATTRIBUTE_VALUE_IDS:
      return update(state, {
        attributeValueIds: { $set: action.attributeValueIds }
      });

    case ACTION_RESET:
      return DEFAULT_PRODUCT;

    default:
      return state;
  }
};

export default product;
