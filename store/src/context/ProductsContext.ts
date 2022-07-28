import React from "react";
import { IProduct} from "../interface";


export interface IProductsContext {
  products: IProduct[];
  categories: string[];
  isLoading: boolean;
  basketItems: IProduct[];
  getAllProducts: (limit: number, skip: number) => void;
  getCategories: () => void;
  handleCategorySelect: (categoryName: string[] | string) => void;
  handlerPagination: (limit: number, skip: number, count: number) => void;
  renderPagination: () => React.ReactNode;
  handleSearchProducts: (item: string) => void;
  addBasketItem: (product: IProduct) => void;
  deleteBasketItem: (id: number) => void;
  increaseAmountBasketItem: (id: number) => void;
  decreaseAmountBasketItem: (id: number) => void;
}


export const ProductsContext = React.createContext<IProductsContext>({
   products: [],
  categories: [],
  basketItems: [],
  isLoading:true,
  getAllProducts: () => { },
  getCategories: () => { },
  handleCategorySelect: () => { },
  handlerPagination: () => { },
  renderPagination: () => { },
  handleSearchProducts: () => { },
  addBasketItem: () => { },
  deleteBasketItem: () => { },
  increaseAmountBasketItem: () => { },
  decreaseAmountBasketItem: () => {}
} as IProductsContext)