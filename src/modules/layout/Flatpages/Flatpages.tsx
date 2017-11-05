import { MyIcon } from "@src/modules/common";
import { MyTouchFeedback } from "@src/modules/common/utils";
import { LoadingMask } from "@src/modules/layout";
import { PATH_NAMES } from "@src/routes";
import { IPage } from "@src/routes/interfaces";
import { Accordion, Flex } from "antd-mobile";
import gql from "graphql-tag";
import * as React from "react";
import { graphql, QueryProps } from "react-apollo";
import { withRouter } from "react-router";
import { compose } from "redux";

import { IFlatpage } from "../model";

const renderHTML = require("react-render-html");

const styles = require("./styles.css");

interface IFlatpagesData extends QueryProps {
  flatpages?: [IFlatpage];
}

interface GraphQLProps {
  data: IFlatpagesData;
}

interface Props extends GraphQLProps, IPage {}

class Flatpages extends React.Component<Props, {}> {
  getIcon = id => {
    // tslint:disable-next-line:variable-name
    const _id = parseInt(id, 10);
    switch (_id) {
      // info
      case 4: {
        return require("!svg-sprite-loader!./about.svg");
      }
      // contacts
      case 5: {
        return require("!svg-sprite-loader!./phone.svg");
      }
      // exchange and return
      case 8: {
        return require("!svg-sprite-loader!./exchange.svg");
      }
      // make order
      case 7: {
        return require("!svg-sprite-loader!./order.svg");
      }
      // buyers
      case 10: {
        return require("!svg-sprite-loader!./buyers.svg");
      }
      // discount card
      case 6: {
        return require("!svg-sprite-loader!./discount.svg");
      }
      // schedule of work
      case 14: {
        return require("!svg-sprite-loader!./schedule.svg");
      }
      // shipping and payment
      case 2: {
        return require("!svg-sprite-loader!./shipping.svg");
      }
      // rozygrish
      case 15: {
        return require("!svg-sprite-loader!./roulette.svg");
      }
      // suppliers
      case 11: {
        return require("!svg-sprite-loader!./suppliers.svg");
      }
      // guarantee
      case 3: {
        return require("!svg-sprite-loader!./guarantee.svg");
      }
      default: {
        return require("!svg-sprite-loader!./transport.svg");
      }
    }
  };

  render() {
    const { data: { loading, flatpages }, location: { pathname } } = this.props;
    if (loading) {
      return <LoadingMask />;
    }
    return (
      <div>
        {pathname !== PATH_NAMES.flatpages &&
          <div className={styles.title}>Инфо</div>}
        <Accordion
          accordion={true}
          className={styles.Flatpages}
          // defaultActiveKey={flatpages![0].id}
        >
          {flatpages!.map(page =>
            <Accordion.Panel
              key={page.id}
              header={
                <MyTouchFeedback>
                  <Flex>
                    <MyIcon
                      className={styles.icon}
                      type={this.getIcon(page.id)}
                    />
                    <div>
                      {page.name}
                    </div>
                  </Flex>
                </MyTouchFeedback>
              }
              className={styles.header}
            >
              <div className={styles.content}>
                {renderHTML(page.content)}
              </div>
            </Accordion.Panel>
          )}
        </Accordion>
      </div>
    );
  }
}

const FLATPAGES_QUERY = gql(require("./flatpages.gql"));

export default compose(withRouter, graphql(FLATPAGES_QUERY))(Flatpages);
