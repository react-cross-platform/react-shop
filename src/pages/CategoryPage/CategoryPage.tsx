import * as React from 'react';

import { Category } from '../../modules/catalog/index';
import { IPage } from '../interfaces';

class CategoryPage extends React.Component<IPage, {}> {
  render() {
    const { match } = this.props;
    return <Category id={match.params.id} />;
  }
}

export default CategoryPage;
