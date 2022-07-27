import React from "react";
import { ProductsContext } from "./ProductsContext";


export const useProducts = () => React.useContext(ProductsContext);