import update from "immutability-helper";
import {
  ACTION_ADD_VIEWED_CATEGORY,
  ACTION_ADD_VIEWED_PRODUCT,
  ACTION_TOGGLE_SHOW_ONLY_VIEWED
} from "./constants";

export interface ICatalogReducer {
  readonly viewedProductIds: number[];
  readonly viewedCategoryIds: number[];
  readonly showOnlyViewed: boolean;
}

const DEFAULT_CATALOG: ICatalogReducer = {
  showOnlyViewed: false,
  viewedCategoryIds: [],
  viewedProductIds: []
};

const catalog = (state = DEFAULT_CATALOG, action) => {
  const { id } = action;
  switch (action.type) {
    case ACTION_ADD_VIEWED_PRODUCT:
      if (state.viewedProductIds.indexOf(id) === -1) {
        return update(state, {
          viewedProductIds: { $push: [id] }
        });
      } else {
        return state;
      }
    case ACTION_ADD_VIEWED_CATEGORY:
      if (state.viewedCategoryIds.indexOf(id) === -1) {
        return update(state, {
          viewedCategoryIds: { $push: [action.id] }
        });
      } else {
        return state;
      }
    case ACTION_TOGGLE_SHOW_ONLY_VIEWED:
      return update(state, {
        showOnlyViewed: { $set: !state.showOnlyViewed }
      });
    default:
      return state;
  }
};

export default catalog;
