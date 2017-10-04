import gql from 'graphql-tag';
import * as React from 'react';
import { graphql, OperationOption, QueryProps } from 'react-apollo';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { IRouterReducer } from '../../../interfaces';
import { IRootReducer } from '../../../rootReducer';
import { PATH_NAMES } from '../../../routing';
import { SubCatalog } from '../../layout/index';
import { ICategory } from '../../product/model';

const styles = require('./styles.css');

interface IDataCategory extends QueryProps {
  categories?: [ICategory];
}

interface StateProps {
  router: IRouterReducer;
}

interface GraphQLProps {
  data: IDataCategory;
}

interface OwnProps {}

class Catalog extends React.Component<
  StateProps & GraphQLProps & OwnProps,
  {}
> {
  render() {
    const { data } = this.props;
    if (data.loading) {
      return <div />;
    }
    const { loading, categories } = data;
    const startCats: ICategory[] = [];
    const childrenMap = {};
    for (const cat of categories!) {
      if (cat.parent) {
        const key = cat.parent.id;
        if (!(key in childrenMap)) {
          childrenMap[key] = [];
        }
        childrenMap[key].push(cat);
      } else {
        startCats.push(cat);
      }
    }
    return (
      <div className={styles.catalog}>
        {startCats.map((parent, i) =>
          <div key={i}>
            <h2>
              {parent.name}
            </h2>
            <SubCatalog key={i} categories={childrenMap[parent.id]} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: IRootReducer): StateProps => ({
  router: state.router
});

const CATEGORIES_QUERY = gql(require('./categories.gql'));
const options: OperationOption<OwnProps & StateProps, GraphQLProps> = {
  options: ({ router }) => ({
    skip: !(router.location.pathname === PATH_NAMES.home)
  })
};

export default compose(
  connect<StateProps, {}, OwnProps>(mapStateToProps),
  graphql<GraphQLProps, OwnProps>(CATEGORIES_QUERY, options)
)(Catalog as any);
