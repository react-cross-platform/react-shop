import { Dispatch } from "@src/interfaces";
import { MyTouchFeedback } from "@src/modules/common/utils";
import {
  Button,
  Flex,
  InputItem,
  List,
  Modal,
  SegmentedControl,
  TextareaItem
} from "antd-mobile";
import { FormikProps, withFormik } from "formik";
import gql from "graphql-tag";
import * as React from "react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import { compose } from "redux";
import Yup from "yup";

import { IDataCart } from "../Cart/Cart";
import { ICheckout } from "../model";
import { ACTION_FINISH_CART } from "../reducer";

const styles = require("./styles.css");

const BY_KIEV = "по Киеву";
const BY_COUNTRY = "по Украине";
const REGIONS = [BY_KIEV, BY_COUNTRY];

interface GraphQLProps {
  mutate?: any;
}

interface DispatchProps {
  dispatch: Dispatch;
}

interface OwnProps {
  data?: IDataCart;
}

interface State {
  region: string;
}

interface Props
  extends OwnProps,
    DispatchProps,
    FormikProps<ICheckout>,
    GraphQLProps {}

class CheckoutForm extends React.Component<Props, State> {
  state = {
    region: BY_KIEV
  };

  componentWillMount() {
    const { data } = this.props;
    const { cart } = data!;
    if (cart) {
      if (!!cart.city) {
        this.setState({ region: BY_COUNTRY });
      } else if (cart.address) {
        this.setState({ region: BY_KIEV });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
  }

  handleChange = (name, value) => {
    this.props.setFieldValue(name, value);
  };

  handleFocus = () => {
    // window.scrollTo(0, 1000000);
  };

  handleBlur = (name, value) => {
    const { mutate, values, data } = this.props;
    if (!data!.cart || data!.cart![name] !== value) {
      mutate({ variables: values });
    }
  };

  changeRegion = region => {
    this.setState({ region });
    this.handleChange("city", "");
  };

  render() {
    const {
      dirty,
      errors,
      handleBlur,
      handleReset,
      handleSubmit,
      isSubmitting,
      touched,
      values
    } = this.props;
    const handleChange = this.handleChange;
    const isValid = Object.keys(errors).length === 0;
    return (
      <div className={styles.CheckoutForm}>
        <div className={styles.title}>Оформите заказ</div>
        <div>
          <List>
            <TextareaItem
              autoHeight={true}
              onFocus={this.handleFocus}
              clear={true}
              name="firstName"
              onBlur={value => this.handleBlur("firstName", value)}
              onChange={value => this.handleChange("firstName", value)}
              title="Имя"
              value={values.firstName}
            />
            <InputItem
              clear={true}
              onFocus={this.handleFocus}
              error={!!errors.phone}
              maxLength={12}
              name="phone"
              onBlur={value => this.handleBlur("phone", value)}
              onChange={value => this.handleChange("phone", value)}
              placeholder="380671234567"
              value={values.phone}
            >
              Телефон
            </InputItem>

            <TextareaItem
              clear={true}
              error={!!errors.email}
              name="email"
              onFocus={this.handleFocus}
              onBlur={value => this.handleBlur("email", value)}
              onChange={value => this.handleChange("email", value)}
              placeholder="для акций, скидок"
              title="Email"
              value={values.email}
            />

            <List.Item>
              <Flex>
                <div className={styles.regionsLabel}>Доставка</div>
                <SegmentedControl
                  className={styles.regions}
                  onValueChange={region => this.changeRegion(region)}
                  selectedIndex={REGIONS.indexOf(this.state.region)}
                  tintColor="orange"
                  values={REGIONS}
                />
              </Flex>
            </List.Item>

            {this.state.region === BY_KIEV
              ? <TextareaItem
                  autoHeight={true}
                  clear={true}
                  name="address"
                  onFocus={this.handleFocus}
                  onBlur={value => this.handleBlur("address", value)}
                  onChange={value => this.handleChange("address", value)}
                  placeholder="дом, улица, квартира"
                  title="Адрес"
                  value={values.address}
                />
              : <div />}

            {this.state.region === BY_COUNTRY
              ? <div className={styles.countryDelivery}>
                  <TextareaItem
                    autoHeight={true}
                    clear={true}
                    name="city"
                    onFocus={this.handleFocus}
                    onBlur={value => this.handleBlur("city", value)}
                    onChange={value => this.handleChange("city", value)}
                    title="Город"
                    value={values.city}
                  />
                  <TextareaItem
                    clear={true}
                    error={!!errors.address}
                    name="address"
                    onFocus={this.handleFocus}
                    onBlur={value => this.handleBlur("address", value)}
                    onChange={value => this.handleChange("address", value)}
                    placeholder="№ отделения Новой Почты"
                    title="НП"
                    value={values.address}
                  />
                  <TextareaItem
                    autoHeight={true}
                    clear={true}
                    error={!!errors.lastName}
                    name="lastName"
                    onFocus={this.handleFocus}
                    onBlur={value => this.handleBlur("lastName", value)}
                    onChange={value => this.handleChange("lastName", value)}
                    placeholder="получателя на Новой Почте"
                    title="Фамилия"
                    value={values.lastName}
                  />
                </div>
              : <div />}
            <TextareaItem
              autoHeight={true}
              clear={true}
              name="comment"
              onFocus={this.handleFocus}
              onBlur={value => this.handleBlur("comment", value)}
              onChange={value => this.handleChange("comment", value)}
              placeholder="комментарий к заказу"
              title="Детали"
              value={values.comment}
            />
            <MyTouchFeedback>
              <Button
                className={styles.submit}
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Завершить оформление
              </Button>
            </MyTouchFeedback>
          </List>
        </div>
      </div>
    );
  }
}

const UPDATE_CART_MUTATION = gql(require("./updateCart.gql"));

const INITIAL_VALUES = {
  phone: "380"
};

export default compose<any>(
  connect(),
  graphql(UPDATE_CART_MUTATION),
  withFormik({
    validationSchema: Yup.object().shape({
      phone: Yup.string().matches(/\d{12}/).required(),
      email: Yup.string().email()
    }),
    mapPropsToValues: (props: Props) => {
      const values = { ...props.data!.cart };
      for (const key in values) {
        if (!values[key] && INITIAL_VALUES.hasOwnProperty(key)) {
          values[key] = INITIAL_VALUES[key];
        }
      }
      return values;
    },
    handleSubmit: (values, { props, setSubmitting, setErrors }) => {
      const { dispatch, mutate, data } = props;
      const { id } = data!.cart!;
      Modal.alert(
        <div style={{ marginTop: "1rem" }}>Завершить заказ?</div>,
        "",
        [
          { text: "Нет", onPress: () => setSubmitting(false) },
          {
            text: "Да",
            onPress: () => {
              mutate({ variables: { ...values, finish: true } })
                .then(res => {
                  // Refetch Cart query to clear results from finished cart
                  data!.refetch();
                })
                .then(res => {
                  dispatch({ type: ACTION_FINISH_CART, id });
                });
            }
          }
        ]
      );
    },
    displayName: "CheckoutForm"
  })
)(CheckoutForm);
