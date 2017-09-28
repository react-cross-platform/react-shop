import { Modal } from "antd-mobile";
import * as React from "react";

import { Layout, Navbar } from "../index";

const styles = require("./styles.css");

export const getScrollableStyle = (isScrollable: boolean) => {
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

interface IMyModelProps {
  history: any;
  location: any;
}

class MyModal extends React.Component<IMyModelProps, any> {
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
