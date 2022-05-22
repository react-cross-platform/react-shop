import PromotionsContainer from "@src/modules/common/Promotions/Promotions";
import { Catalog, Flatpages, HomeTrigger, Layout } from "@src/modules/layout";
import { ScrollToTop } from "@src/utils";
import * as React from "react";

import { IPage } from "../interfaces";
import { PATH_NAMES } from "../RouteSwitch/RouteSwitch";

const styles = require("./styles.css");

interface OwnProps extends IPage {}

class HomePage extends React.Component<OwnProps, {}> {
  getLayoutOptions = () => {
    return {
      header: {
        title: <HomeTrigger />,
      },
    };
  };

  componentDidMount = () => {
    const { history } = this.props;
    history.push(PATH_NAMES.sale);
  };

  render() {
    const { location, history } = this.props;
    return (
      <ScrollToTop>
        <Layout location={location} history={history} {...this.getLayoutOptions()}>
          <div className={styles.HomePage}>
            <div
              style={
                {
                  // marginTop: "1rem"
                }
              }
            >
              <PromotionsContainer />
            </div>
            <Catalog />
            <Flatpages />
          </div>
        </Layout>
      </ScrollToTop>
    );
  }
}

export default HomePage;
