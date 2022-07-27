import axios from "axios";
import React from "react";
import { IProduct } from "../interface";
import { ProductsContext } from "./ProductsContext";


interface IProductsProvider {
  children: React.ReactNode
}

export const ProductsProvider: React.FC<IProductsProvider> = ({children}) => {

  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [limitProducts, setLimitProducts] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  
  const getAllProducts = async (limit: number, skip: number) => {
    setIsLoading(true)
    const res = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
    setProducts(res.data)
    setIsLoading(false)
    setCurrentPage(1)
  }

  const getCategories = async () => {
    const res = await axios.get<string[]>('https://dummyjson.com/products/categories');
    setCategories(res.data)
  }

  const handleCategorySelect = async (categoryName: string[] | string) => {
    const res = await axios.get(`https://dummyjson.com/products/category/${categoryName}`)
    setProducts(res.data);
  }

   const handlerPagination = async (limit:number, skip:number, count:number) => {
     const res = await axios(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
      setProducts(res.data);
      setCurrentPage(currentPage + count);
   };
  
  const renderPagination = () => {
    if (currentPage === 1) {
      return (
        <div>
          <a>{currentPage}</a>
          <div>
            <button onClick={() => handlerPagination(10, 10, 1)}>Next</button>
          </div>
        </div>
      );
    } else if (currentPage <= 9 && Object.assign(products).products.length === limitProducts) {
      return (
        <div>
          <div>
            <button onClick={() => handlerPagination(10, -10, -1)}>Prev</button>
          </div>
          <button>{currentPage}</button>
          <div>
            <button onClick={() => handlerPagination(10, currentPage * 10, 1)}>
              Next
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <button onClick={() => handlerPagination(10, 10, -1)}>Prev</button>
          </div>
          <span>{currentPage}</span>
        </div>
      );
    }
  };
  
  console.log(currentPage)

  const value  = {
    products,
    categories,
    getAllProducts,
    getCategories,
    handleCategorySelect,
    handlerPagination,
    isLoading,
    renderPagination
  }

  React.useEffect(() => {
    getAllProducts(10, 0)
    getCategories()
  },[])

  return <ProductsContext.Provider value={value}>{ children}</ProductsContext.Provider>
}