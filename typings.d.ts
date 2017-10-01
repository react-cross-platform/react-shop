declare module "react-masonry-infinite" {
  let MasonryInfiniteScroller: any;
}

declare module "react-ripples" {
  let Ripples: any;
}

declare module "react-lazy-load" {
  let LazyLoad: {
    offset?: number;
    throttle?: number;
    height?: string | number;
    width?: string | number;
  };
}

// React16 temp huck
declare module "react-redux" {
  interface IReactRedux {}
}
declare module "react-router-redux" {
  interface IReactRouterRedux {}
}
declare module "react-router-dom" {
  interface IRectRouterDom {}
}
