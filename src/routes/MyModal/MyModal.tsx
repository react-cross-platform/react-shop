import { Modal } from "antd-mobile";
import * as React from "react";
import { CSSProperties } from "react";

import { Layout, Navbar } from "../../modules/layout/index";
import { IPage } from "../interfaces";

const styles = require("./styles.css");

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
