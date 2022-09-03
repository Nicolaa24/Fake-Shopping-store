import React from "react";

import axios from "axios";

import { IProduct } from "../interface";
import { ProductsContext } from "./ProductsContext";


interface IProductsProvider {
  children: React.ReactNode
  initialTheme: string
}

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = localStorage.getItem('current-theme');
    if (typeof storedPrefs === 'string') {
      return storedPrefs;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
};

export const ProductsProvider: React.FC<IProductsProvider> = ({initialTheme,children}) => {

  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [limitProducts, setLimitProducts] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  //basket 
  const [basketItems, setBasketItems] = React.useState<IProduct[]>([])
  //theme
  const [theme, setTheme] = React.useState(getInitialTheme);


  //basket logic
  const addBasketItem = (product:IProduct) => {
    setBasketItems([...basketItems,{...product,quantity:1}])
  }
  
  const deleteBasketItem = (id:number) => {
    setBasketItems(basketItems.filter(p=>p.id !== id))
  }

  const clearAllBasketItem = () => {
    setBasketItems([])
  }

  const increaseAmountBasketItem = (id: number)  => {
    setBasketItems(() => {
      if (basketItems.find(item => item.id === id) == null) {
        return [...basketItems]
      } else {
        return basketItems.map(item => {
          if (item.id === id) {
            return {...item,quantity:item.quantity +1}
          } else {
            return item
          }
        })
      }
    })
  }

  const decreaseAmountBasketItem = (id: number) => {
    setBasketItems(() => {
      if (basketItems.find(item => item.id === id)?.quantity === 1) {
        return basketItems.filter(item => item.id !== id)
      } else {
        return basketItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  };


  //products logic
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

  const handleSearchProducts = async (item:string) => {
    const res = await axios.get(`https://dummyjson.com/products/search?q=${item}`);
    setProducts(res.data)
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

  //theme
  const checkTheme = (existing:string) => {
    const root = window.document.documentElement;
    const isDark = existing === 'dark';

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(existing);
    
    localStorage.setItem('current-theme', existing);
  };

  if (initialTheme) {
    checkTheme(initialTheme);
  }

  React.useEffect(() => {
    checkTheme(theme);
  }, [theme]);

  const value  = {
    products,
    categories,
    basketItems,
    getAllProducts,
    getCategories,
    handleCategorySelect,
    handlerPagination,
    isLoading,
    renderPagination,
    handleSearchProducts,
    addBasketItem,
    deleteBasketItem,
    increaseAmountBasketItem,
    decreaseAmountBasketItem,
    clearAllBasketItem,
    theme,
    setTheme
  }

  React.useEffect(() => {
    getAllProducts(10, 0)
    getCategories()
  },[])

  return <ProductsContext.Provider value={value}>{ children}</ProductsContext.Provider>
}