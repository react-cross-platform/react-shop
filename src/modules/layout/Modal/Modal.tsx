import * as React from "react";

// tslint:disable-next-line:no-var-requires
const styles = require("./styles.css");

const Modal = props => {
  return (
    <div className={styles.modal}>
      {props.children}
    </div>
  );
};

export default Modal;
