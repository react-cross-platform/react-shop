import update from "immutability-helper";

import {
  // tslint:disable-next-line:ordered-imports
  ACTION_ENABLE_CATALOG,
  ACTION_DISABLE_CATALOG,
  ACTION_TOOTLE_CATALOG,
  ACTION_TOOTLE_MENU,
  ACTION_ENABLE_MENU,
  ACTION_DISABLE_MENU,
  ACTION_RESET
} from "./constants";
import { ILayout } from "./model";

const DEFAULT_LAYOUT: ILayout = {
  openCatalog: false,
  openMenu: false
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

    case ACTION_DISABLE_MENU:
      return update(DEFAULT_LAYOUT, {
        openMenu: { $set: false }
      });
    case ACTION_ENABLE_MENU:
      return update(DEFAULT_LAYOUT, {
        openMenu: { $set: true }
      });
    case ACTION_TOOTLE_MENU:
      return update(DEFAULT_LAYOUT, {
        openMenu: { $set: !state.openMenu }
      });

    case ACTION_RESET:
      return { ...DEFAULT_LAYOUT };
    default:
      return state;
  }
};

export default layout;
