import { MyTouchFeedback } from "@src/modules/common/utils";
import { History } from "history";
import Lottie from "lottie-react-web";
import * as React from "react";

const styles = require("./styles.css");
interface OwnProps {
  history: History;
}

interface State {}

class EmptyCart extends React.Component<OwnProps, State> {
  render() {
    const { history } = this.props;
    return (
      <MyTouchFeedback>
        <div onClick={history.goBack} className={styles.EmptyCart}>
        <div style={{height: "300px"}}>
          <Lottie
            options={{
              animationData: require("./empty.json")
            }}
          />
          </div>
          <div className={styles.title}>Корзина пуста</div>
          <div className={styles.continue}>нажмите чтобы закрыть</div>
        </div>
      </MyTouchFeedback>
    );
  }
}

export default EmptyCart;
