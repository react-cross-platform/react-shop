import { compile } from "path-to-regexp";
import * as React from "react";

import { PATH_NAMES } from "..";
import CategoryPage from "../CategoryPage/CategoryPage";

class BrandPage extends CategoryPage {
  getPathName = (id?) => {
    return id ? compile(PATH_NAMES.brand)({ id }) : PATH_NAMES.sale;
};
}

export default BrandPage;
