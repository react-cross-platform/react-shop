import * as React from "react";

import { IPage } from "../../../pages/interfaces";
import { Modal, utils } from "../../layout/index";

const styles = require("./styles.css");

function createMarkup(html) {
  return { __html: html };
}

class FlatPageModal extends React.Component<IPage, {}> {
  render() {
    const { match, history, location } = this.props;
    const id = match.params.id;
    const page = location.state.pages.filter(el => el.id === id);
    return (
      <Modal location={location} history={history}>
        <div
          className={styles.flatpage}
          dangerouslySetInnerHTML={createMarkup(page.map(el => el.content))}
          style={{
            padding: utils.isSafariBrowser() ? 10 : 0,
            textAlign: "left"
          }}
        />
      </Modal>
    );
  }
}

export default FlatPageModal;
