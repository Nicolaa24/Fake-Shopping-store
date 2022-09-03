import React from 'react';

import { Categories } from '../components/Categories';
import { Product } from '../components/Product';
import { Slider } from '../components/Slider/Slider';
import { useProducts } from '../context/useProducts';
import { IProduct } from '../interface';


export const Products = () => {
  const { products, renderPagination } = useProducts();
  
  const AllItems: IProduct[] = (Object.assign(products).products);
  
  return (
    <div className='flex '>

        <div>
          <Slider />
          <div className='flex'>
            <Categories />
            <div className='flex flex-wrap '>
              {AllItems?.map(product => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      
      <div>{renderPagination() as React.ReactNode}</div>
    </div>
  )
};

