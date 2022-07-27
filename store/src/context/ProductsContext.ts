import React from "react";
import { IProduct} from "../interface";


export interface IProductsContext {
  products: IProduct[];
  categories: string[];
  isLoading: boolean;
  getAllProducts: (limit: number, skip: number) => void;
  getCategories: () => void;
  handleCategorySelect: (categoryName: string[] | string) => void;
  handlerPagination: (limit: number, skip: number, count: number) => void;
  renderPagination: () => React.ReactNode
}


export const ProductsContext = React.createContext<IProductsContext>({
   products: [],
  categories: [],
  isLoading:true,
  getAllProducts: () => { },
  getCategories: () => { },
  handleCategorySelect: () => { },
  handlerPagination: () => { },
  renderPagination: () => {}
} as IProductsContext)