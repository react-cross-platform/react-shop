import ReactGA, { FieldsObject, InitializeOptions, TrackerNames } from "react-ga";

const available = !!process.env.GA_COUNTER;

interface CartItem {
  id: string;
  revenue: string;
}

interface Purchase {
  id: string;
  revenue: string;
}

class GoogleAnalytics {
  init = (option?: InitializeOptions) => {
    available && ReactGA.initialize(process.env.GA_COUNTER!, option);
  };

  set = (fieldsObjects: FieldsObject, trackerNames?: TrackerNames): void => {
    ReactGA.set(fieldsObjects, trackerNames);
  };

  pageview = (path: string): void => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    // ReactGA.ga('send', 'pageview', '/mypage');
    ReactGA.ga("send", "pageview", path);
  };

  addTransaction = (item: CartItem): void => {
    available &&
      ReactGA.plugin.execute("ecommerce", "addTransaction", {
        id: "jd38je31j",
        revenue: "3.50"
      });
  };

  purchase = (purchase: Purchase) => {
    available &&
      ReactGA.plugin.execute("ec", "setAction", "purchase", {
        id: "jd38je31j",
        revenue: "3.50"
      });
  };
}

export default new GoogleAnalytics();
