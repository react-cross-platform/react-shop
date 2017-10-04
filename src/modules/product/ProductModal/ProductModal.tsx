import * as React from 'react';

import { IPage } from '../../../pages/interfaces';
import { Modal } from '../../layout/index';
import { Product } from '../index';

const styles = require('./styles.css');

export interface OwnProps extends IPage {}

class ProductModal extends React.Component<OwnProps, {}> {
  render() {
    const { match, history, location } = this.props;
    return (
      <Modal location={location} history={history}>
        <Product id={match.params.id} />
      </Modal>
    );
  }
}

export default ProductModal;
