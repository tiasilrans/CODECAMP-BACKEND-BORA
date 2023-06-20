export interface IProductsTagsServiceBilkInsert {
  names: {
    name: string;
  }[];
}

export interface IProductsTagsServiceFindByNames {
  tagNames: string[];
}
