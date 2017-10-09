import { isSafariBrowser } from "@src/modules/layout/utils";
import * as React from "react";

import { MyModal } from "../index";
import { IPage } from "../interfaces";

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
      <MyModal location={location} history={history}>
        <div
          className={styles.flatpage}
          dangerouslySetInnerHTML={createMarkup(page.map(el => el.content))}
          style={{
            padding: isSafariBrowser() ? 10 : 0,
            textAlign: "left"
          }}
        />
      </MyModal>
    );
  }
}

export default FlatPageModal;
