import { Loading, MyIcon } from "@src/modules/common";
import { PATH_NAMES } from "@src/routes";
import { Accordion, Flex } from "antd-mobile";
import gql from "graphql-tag";
import { compile } from "path-to-regexp";
import * as React from "react";
import { graphql, QueryProps } from "react-apollo";

import { IFlatpage } from "../model";

const styles = require("./styles.css");

interface IFlatpagesData extends QueryProps {
  flatpages?: [IFlatpage];
}

interface GraphQLProps {
  data: IFlatpagesData;
}

function createMarkup(html) {
  return { __html: html };
}

class Flatpages extends React.Component<GraphQLProps, {}> {
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

  getLinkProps = (flatPage: IFlatpage) => {
    const { id, name, content } = flatPage;
    return {
      to: {
        pathname: compile(PATH_NAMES.flatpage)({ id }),
        state: {
          modal: true,
          title: name,
          content
        }
      }
    };
  };

  render() {
    const { data: { loading, flatpages } } = this.props;
    if (loading) {
      return <Loading />;
    }

    //   <Flex>
    //   <Icon
    //     className={styles.icon}
    //     type={this.getIcon(page.id)}
    //     size="md"
    //   />
    //   {page.name}
    // </Flex>

    return (
      <Accordion accordion={true} className={styles.Flatpages}>
        {flatpages!.map(page =>
          <Accordion.Panel
            key={page.id}
            header={
              <Flex>
                <MyIcon className={styles.icon} type={this.getIcon(page.id)} />
                <div>
                  {page.name}
                </div>
              </Flex>
            }
            className={styles.header}
          >
            <div className={styles.content}>
              {page.content}
            </div>
          </Accordion.Panel>
        )}
      </Accordion>
    );
  }
}

const FLATPAGES_QUERY = gql(require("./flatpages.gql"));

export default graphql(FLATPAGES_QUERY)(Flatpages);
