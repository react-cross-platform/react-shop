import { Modal } from "antd-mobile";
import * as React from "react";
import { CSSProperties } from "react";

import { IPage } from "../../../pages/interfaces";
import { Layout, Navbar } from "../index";

const styles = require("./styles.css");

export const getScrollableStyle = (isScrollable: boolean): CSSProperties => {
  // Hack for Safari on iOS to prevent content scrolling under Modal window
  return isScrollable
    ? {
        overflowY: "scroll",
        WebkitOverflowScrolling: "touch"
      }
    : {
        overflowY: "hidden"
      };
};

interface OwnProps extends IPage {}

class MyModal extends React.Component<OwnProps, {}> {
  render() {
    const { children, location, history } = this.props;
    return (
      <Modal
        className={styles.modal}
        visible={true}
        transparent={false}
        animated={false}
      >
        <Layout
          header={<Navbar title={location.state.title} history={history} />}
        >
          {children}
        </Layout>
      </Modal>
    );
  }
}

export default MyModal;
