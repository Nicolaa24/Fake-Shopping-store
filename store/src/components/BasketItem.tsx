import React from 'react';

import { useProducts } from '../context/useProducts';
import { IProduct } from '../interface'

interface IBasketItem { 
  product:IProduct
}

export const BasketItem: React.FC<IBasketItem> = ({ product }) => {

  const { deleteBasketItem, increaseAmountBasketItem, decreaseAmountBasketItem } = useProducts();

  return (
    <div className='flex justify-between items-center text-center mb-5 p-3 rounded-xl shadow-lg mb-7 '>
      <img src={product.images[0]} alt={product.title} className='rounded-md h-[220px] w-[400px]' />
      <div className='p-2 m-2 text-lg '>
        <p>{product.title}</p>
        <p className='m-4'>$ {product.price}</p>
        <p>{product.brand}</p>
      </div>
      <div className='text-xl'>
        <button className='text-2xl'
        onClick={()=>increaseAmountBasketItem(product.id)}
        >
          +
        </button>
        <span className='m-3 '>{product.quantity}</span>
        <button className='text-2xl' onClick={()=> decreaseAmountBasketItem(product.id)}>
          -
        </button>
      </div>
      <button className='bg-slate-500 p-3 hover:bg-slate-700 hover:text-white hover:font-semibold hover:p-4 rounded-xl mr-4'
      onClick={()=>deleteBasketItem(product.id)}
      >Delete
      </button>
    </div>
  )
};

