export type Maybe<T> = T | null;

export enum ImageSizeEnum {
  Sm = "SM",
  Md = "MD",
  Lg = "LG"
}

// ====================================================
// Documents
// ====================================================

export namespace AddCartItemMutation {
  export type Variables = {
    subProductId: number;
    attributeValueIds?: Maybe<(Maybe<number>)[]>;
  };

  export type Mutation = {
    __typename?: "Mutation";

    addCartItem: Maybe<AddCartItem>;
  };

  export type AddCartItem = {
    __typename?: "AddCartItem";

    cartItem: Maybe<CartItem>;
  };

  export type CartItem = {
    __typename?: "CartItemType";

    cart: Cart;

    id: number;

    price: number;

    amount: number;

    attributeValues: (Maybe<AttributeValues>)[];

    subProduct: SubProduct;
  };

  export type Cart = {
    __typename?: "CartType";

    id: string;

    phone: string;

    email: Maybe<string>;

    firstName: Maybe<string>;

    lastName: Maybe<string>;

    city: string;

    address: string;

    comment: string;
  };

  export type AttributeValues = {
    __typename?: "AttributeValueType";

    id: number;

    name: Maybe<string>;

    value: Maybe<string>;
  };

  export type SubProduct = {
    __typename?: "SubProductType";

    id: string;

    article: string;

    price: number;

    oldPrice: Maybe<number>;

    product: Product;
  };

  export type Product = {
    __typename?: "ProductType";

    id: string;

    name: string;

    brand: Brand;

    images: Images[];
  };

  export type Brand = {
    __typename?: "BrandType";

    id: string;

    name: string;
  };

  export type Images = {
    __typename?: "ImageType";

    id: string;

    src: string;

    width: number;

    height: number;

    isTitle: boolean;

    attributeValue: Maybe<AttributeValue>;
  };

  export type AttributeValue = {
    __typename?: "AttributeValueType";

    id: number;

    name: Maybe<string>;

    value: Maybe<string>;
  };
}

export namespace CartQuery {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    cart: Maybe<Cart>;
  };

  export type Cart = {
    __typename?: "CartType";

    id: string;

    phone: string;

    email: Maybe<string>;

    firstName: Maybe<string>;

    lastName: Maybe<string>;

    city: string;

    address: string;

    comment: string;

    items: Items[];
  };

  export type Items = {
    __typename?: "CartItemType";

    id: number;

    amount: number;

    price: number;

    attributeValues: (Maybe<AttributeValues>)[];

    subProduct: SubProduct;
  };

  export type AttributeValues = {
    __typename?: "AttributeValueType";

    id: number;

    name: Maybe<string>;

    value: Maybe<string>;
  };

  export type SubProduct = {
    __typename?: "SubProductType";

    id: string;

    article: string;

    price: number;

    oldPrice: Maybe<number>;

    product: Product;
  };

  export type Product = {
    __typename?: "ProductType";

    id: string;

    name: string;

    brand: Brand;

    images: Images[];
  };

  export type Brand = {
    __typename?: "BrandType";

    id: string;

    name: string;
  };

  export type Images = {
    __typename?: "ImageType";

    id: string;

    src: string;

    width: number;

    height: number;

    isTitle: boolean;

    attributeValue: Maybe<AttributeValue>;
  };

  export type AttributeValue = {
    __typename?: "AttributeValueType";

    id: number;

    name: Maybe<string>;

    value: Maybe<string>;
  };
}

export namespace UpdateCartMutation {
  export type Variables = {
    phone: string;
    email?: Maybe<string>;
    firstName?: Maybe<string>;
    lastName?: Maybe<string>;
    city?: Maybe<string>;
    address?: Maybe<string>;
    comment?: Maybe<string>;
    finish?: Maybe<boolean>;
  };

  export type Mutation = {
    __typename?: "Mutation";

    updateCart: Maybe<UpdateCart>;
  };

  export type UpdateCart = {
    __typename?: "UpdateCart";

    cart: Cart;
  };

  export type Cart = {
    __typename?: "CartType";

    id: string;

    phone: string;

    email: Maybe<string>;

    firstName: Maybe<string>;

    lastName: Maybe<string>;

    city: string;

    address: string;

    comment: string;
  };
}

export namespace RemoveCartItemMutation {
  export type Variables = {
    id: number;
  };

  export type Mutation = {
    __typename?: "Mutation";

    removeCartItem: Maybe<RemoveCartItem>;
  };

  export type RemoveCartItem = {
    __typename?: "RemoveCartItem";

    totalPrice: Maybe<number>;
  };
}

export namespace UpdateCartItemMutation {
  export type Variables = {
    id: number;
    amount: number;
  };

  export type Mutation = {
    __typename?: "Mutation";

    updateCartItem: Maybe<UpdateCartItem>;
  };

  export type UpdateCartItem = {
    __typename?: "UpdateCartItem";

    cartItem: CartItem;
  };

  export type CartItem = {
    __typename?: "CartItemType";

    id: number;

    amount: number;
  };
}

export namespace PromotionsQuery {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    promotions: Maybe<Promotions[]>;
  };

  export type Promotions = {
    __typename?: "PromotionType";

    id: string;

    text: string;

    destinationUrl: Maybe<string>;

    background: Maybe<string>;

    mobileImage: MobileImage;
  };

  export type MobileImage = {
    __typename?: "PromotionImageType";

    id: string;

    src: string;

    width: Maybe<number>;

    height: Maybe<number>;
  };
}

export namespace CategoriesQuery {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    categories: Categories[];
  };

  export type Categories = {
    __typename?: "CategoryType";

    id: string;

    name: string;

    alias: string;

    parent: Maybe<Parent>;

    image: Maybe<Image>;
  };

  export type Parent = {
    __typename?: "CategoryType";

    id: string;
  };

  export type Image = {
    __typename?: "CategoryImageType";

    src: string;
  };
}

export namespace FlatpagesQuery {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    flatpages: Flatpages[];
  };

  export type Flatpages = {
    __typename?: "FlatpageType";

    id: string;

    name: string;

    content: string;
  };
}

export namespace BrandsQuery {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    brands: Maybe<Brands[]>;
  };

  export type Brands = {
    __typename?: "BrandType";

    id: string;

    name: string;

    alias: string;

    description: string;

    image: Maybe<Image>;
  };

  export type Image = {
    __typename?: "BrandImageType";

    src: string;
  };
}

export namespace AllProductsQuery {
  export type Variables = {
    categoryId?: Maybe<number>;
    brandId?: Maybe<number>;
    withDiscountOnly?: Maybe<boolean>;
    filters?: Maybe<string>;
    sorting?: Maybe<string>;
    offset?: Maybe<number>;
    first?: Maybe<number>;
  };

  export type Query = {
    __typename?: "Query";

    allProducts: Maybe<AllProducts>;
  };

  export type AllProducts = {
    __typename?: "AllProductsType";

    found: number;

    total: number;

    sorting: Sorting[];

    filters: Filters[];

    products: Products[];
  };

  export type Sorting = {
    __typename?: "SortType";

    icon: Maybe<string>;

    name: Maybe<string>;

    value: Maybe<string>;

    isSelected: Maybe<boolean>;
  };

  export type Filters = {
    __typename?: "FilterType";

    id: number;

    name: string;

    isColor: Maybe<boolean>;

    hasChecked: boolean;

    help: string;

    type: string;

    icon: Maybe<string>;

    iconColor: Maybe<string>;

    resetUrl: Maybe<string>;

    values: Values[];
  };

  export type Values = {
    __typename?: "FilterValueType";

    id: number;

    name: string;

    isChecked: boolean;

    filterValue: string;

    help: string;

    count: number;

    url: string;

    value: string;
  };

  export type Products = {
    __typename?: "ProductType";

    id: string;

    name: string;

    shortDescription: string;

    brand: Brand;

    category: Category;

    images: Images[];

    subProducts: SubProducts[];
  };

  export type Brand = {
    __typename?: "BrandType";

    id: string;

    name: string;
  };

  export type Category = {
    __typename?: "CategoryType";

    id: string;

    name: string;
  };

  export type Images = {
    __typename?: "ImageType";

    id: string;

    src: string;

    width: number;

    height: number;

    isTitle: boolean;

    attributeValue: Maybe<AttributeValue>;
  };

  export type AttributeValue = {
    __typename?: "AttributeValueType";

    id: number;

    name: Maybe<string>;

    value: Maybe<string>;
  };

  export type SubProducts = {
    __typename?: "SubProductType";

    id: string;

    article: string;

    price: number;

    oldPrice: Maybe<number>;

    discount: Maybe<number>;
  };
}

export namespace BrandQuery {
  export type Variables = {
    id?: Maybe<number>;
  };

  export type Query = {
    __typename?: "Query";

    brand: Maybe<Brand>;
  };

  export type Brand = {
    __typename?: "BrandType";

    id: string;

    name: string;
  };
}

export namespace CategoryQuery {
  export type Variables = {
    id?: Maybe<number>;
  };

  export type Query = {
    __typename?: "Query";

    category: Maybe<Category>;
  };

  export type Category = {
    __typename?: "CategoryType";

    id: string;

    name: string;
  };
}

export namespace ProductQuery {
  export type Variables = {
    id?: Maybe<number>;
  };

  export type Query = {
    __typename?: "Query";

    product: Product;
  };

  export type Product = {
    __typename?: "ProductType";

    id: string;

    name: string;

    shortDescription: string;

    description: string;

    brand: Brand;

    category: Category;

    images: Images[];

    subProducts: SubProducts[];

    attributes: _Attributes[];
  };

  export type Brand = {
    __typename?: "BrandType";

    id: string;

    name: string;
  };

  export type Category = {
    __typename?: "CategoryType";

    id: string;

    name: string;
  };

  export type Images = {
    __typename?: "ImageType";

    id: string;

    src: string;

    width: number;

    height: number;

    isTitle: boolean;

    attributeValue: Maybe<AttributeValue>;
  };

  export type AttributeValue = {
    __typename?: "AttributeValueType";

    id: number;

    name: Maybe<string>;

    value: Maybe<string>;
  };

  export type SubProducts = {
    __typename?: "SubProductType";

    id: string;

    article: string;

    price: number;

    oldPrice: Maybe<number>;

    discount: Maybe<number>;

    attributes: Attributes[];
  };

  export type Attributes = {
    __typename?: "AttributeType";

    name: string;

    values: Values[];
  };

  export type Values = {
    __typename?: "AttributeValueType";

    id: number;

    name: Maybe<string>;

    value: Maybe<string>;

    description: Maybe<string>;
  };

  export type _Attributes = {
    __typename?: "AttributeType";

    id: number;

    name: string;

    values: _Values[];
  };

  export type _Values = {
    __typename?: "AttributeValueType";

    name: Maybe<string>;

    description: Maybe<string>;
  };
}