import { Cart } from "@src/modules/cart";
import { Layout } from "@src/modules/layout";
import { ScrollToTop } from "@src/utils";
import * as React from "react";

import { IPage } from "../interfaces";

const styles = require("./styles.css");

interface OwnProps extends IPage {}

class CartPage extends React.Component<OwnProps, {}> {
  getLayoutOptions = () => {
    const { history, location } = this.props;
    return {
      location,
      history,
      header: {
        title: "Корзина",
        style: {
          position: "absolute"
        }
      },
      footer: null
    };
  };

  render() {
    const { location, history } = this.props;
    return (
      <ScrollToTop>
        <Layout {...this.getLayoutOptions()}>
          <div className={styles.CartPage}>
            <Cart history={history} isModal={false} />
          </div>
        </Layout>
      </ScrollToTop>
    );
  }
}

export default CartPage;
