import * as model from "./model";
import reducer from "./reducer";
import * as utils from "./utils";

import Catalog from "./Catalog/Catalog";
import CatalogTrigger from "./CatalogTrigger/CatalogTrigger";
import Devider from "./Devider/Devider";
import FlatPageModal from "./FlatPageModal/FlatPageModal";
import FlatPages from "./FlatPages/FlatPages";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import HomeTrigger from "./HomeTrigger/HomeTrigger";
import Layout from "./Layout/Layout";
import Loading from "./Loading/Loading";
import Modal from "./Modal/Modal";
import Navbar from "./Navbar/Navbar";
import SidebarCatalog, { toggleCatalog } from "./SidebarCatalog/SidebarCatalog";
import SubCatalog from "./SubCatalog/SubCatalog";
import { swipeEnabled } from "./utils";

export {
  Catalog,
  CatalogTrigger,
  FlatPageModal,
  FlatPages,
  Footer,
  Header,
  HomeTrigger,
  Devider,
  Layout,
  Loading,
  Modal,
  Navbar,
  SidebarCatalog,
  SubCatalog,
  model,
  reducer,
  toggleCatalog,
  utils
};
