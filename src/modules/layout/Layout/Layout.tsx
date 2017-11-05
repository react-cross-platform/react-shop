import { IPage } from "@src/routes/interfaces";
import { throttle } from "lodash";
import * as React from "react";

import { Footer, Header } from "../index";

const styles = require("./styles.css");

const SCROLL_THROTTLE = 250;

interface OwnProps extends IPage {
  header?: {
    left?: JSX.Element;
    title?: JSX.Element | string;
    style?: any;
  };
  footer?: JSX.Element | null;
}

interface Props extends OwnProps {}

interface State {
  onTop: boolean;
}

class Layout extends React.Component<Props, State> {
  state = {
    onTop: true
  };

  setOnTopWithThrottle: (event) => void;

  setOnTop = event => {
    const onTop = window.pageYOffset < 100;
    if (onTop !== this.state.onTop) {
      this.setState({ onTop });
    }
  };

  componentDidMount() {
    this.setOnTopWithThrottle = throttle(
      event => this.setOnTop(event),
      SCROLL_THROTTLE
    );
    window.addEventListener("scroll", this.setOnTopWithThrottle, false);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.setOnTopWithThrottle, false);
  }

  render() {
    const { history, location, header, footer } = this.props;
    return (
      <div className={styles.Layout}>
        <Header
          onTop={this.state.onTop}
          {...header}
          location={location}
          history={history}
        />
        <div
          className={styles.layoutContent}
          style={{
            padding: `${location.pathname.indexOf("product") !== -1
              ? 0
              : "2.8rem"} 0 ${footer === null ? 0 : "2.8rem"}`
          }}
        >
          {this.props.children}
        </div>
        {footer !== null && <Footer location={location} history={history} />}
      </div>
    );
  }
}

export default Layout;
