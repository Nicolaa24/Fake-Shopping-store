import React from 'react'
import { BasketItem } from '../components/BasketItem';

import { useProducts } from '../context/useProducts';



export const Basket: React.FC = () => {

  const { basketItems } = useProducts();

  const totalPrice: number = basketItems.reduce((total, basketItem) => {
    const item = basketItems.find(item => item.id === basketItem.id)
    return total + (item?.price || 0) * basketItem.quantity
  }, 0)

  return (
    <div>
      <div className='flex justify-between items-center text-center p-3'>
        <p className='text-3xl font-semibold'>Basket</p>
        <p className='text-2xl font-semibold'> Total price: $ {totalPrice.toFixed(2)}</p>
      </div>
      <div>
        {basketItems.map(item => (
          <BasketItem key={item.id} product={item} />
        ))}
      </div>
    </div>
  )
};

