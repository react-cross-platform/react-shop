import update from "immutability-helper";

import {
  ACTION_DISABLE_CATALOG,
  ACTION_ENABLE_CATALOG,
  ACTION_RESET,
  ACTION_TOOTLE_CATALOG
} from "./constants";
import { ILayout } from "./model";

const DEFAULT_LAYOUT: ILayout = {
  openCatalog: false
};

const layout = (state = DEFAULT_LAYOUT, action) => {
  switch (action.type) {
    case ACTION_DISABLE_CATALOG:
      return update(DEFAULT_LAYOUT, {
        openCatalog: { $set: false }
      });
    case ACTION_ENABLE_CATALOG:
      return update(DEFAULT_LAYOUT, {
        openCatalog: { $set: true }
      });
    case ACTION_TOOTLE_CATALOG:
      return update(DEFAULT_LAYOUT, {
        openCatalog: { $set: !state.openCatalog }
      });
    case ACTION_RESET:
      return { ...DEFAULT_LAYOUT };
    default:
      return state;
  }
};

export default layout;
