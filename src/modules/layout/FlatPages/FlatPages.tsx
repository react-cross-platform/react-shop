import { Icon, List } from "antd-mobile";
import * as React from "react";
import { compose, gql, graphql } from "react-apollo";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";

import { IRouterReducer } from "../../../interfaces";
import { IData } from "../../../model";
import { Loading } from "../index";
import { IFlatPage, ILayout } from "../model";

const FLATPAGES_QUERY = require("./flatpages.gql");

const styles = require("./styles.css");

interface IFlatPagesData extends IData {
  flatPages: [IFlatPage];
}

interface IConnectedFlatPagesProps {
  layout: ILayout;
  router: IRouterReducer;
  data: IFlatPagesData;
}

function createMarkup(html) {
  return { __html: html };
}

class FlatPages extends React.Component<IConnectedFlatPagesProps, any> {
  state = {
    page: {
      content: "",
      id: "",
      name: ""
    }
  };

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
        return require("!svg-sprite-loader!./contacts.svg");
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
    const { data } = this.props;
    if (!data) {
      return <div />;
    }

    const { loading, flatPages } = data;
    if (loading === true) {
      return <Loading />;
    }

    return (
      <div>
        <List style={{ border: "none" }}>
          {flatPages.map(page =>
            <Link
              key={page.id}
              to={{
                pathname: `/flatpage/${page.id}`,
                state: {
                  modal: true,
                  pages: flatPages,
                  title: page.name
                }
              }}
            >
              <List.Item
                wrap={true}
                arrow="horizontal"
                thumb={
                  <Icon
                    className={styles.icon}
                    type={this.getIcon(page.id)}
                    size="md"
                  />
                }
              >
                {page.name}
              </List.Item>
            </Link>
          )}
        </List>
      </div>
    );
  }
}

const mapStateToProps: any = state => ({
  layout: state.layout,
  router: state.router
});

export default compose(
  connect<IConnectedFlatPagesProps, {}, any>(mapStateToProps),
  graphql(
    gql(FLATPAGES_QUERY),
    {
      options: ({ layout, router }) => ({
        skip: !(router.location.pathname === "/" || layout.openMenu)
      })
    } as any
  )
)(FlatPages as any);
