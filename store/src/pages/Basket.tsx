import React from 'react'

import { BasketItem } from '../components/BasketItem';
import {Modal} from '../components/Modal';
import OrderForm from '../components/OrderForm';

import { useProducts } from '../context/useProducts';


export const Basket: React.FC = () => {
  const [modal, setModal] = React.useState(false)
  const { basketItems, clearAllBasketItem } = useProducts();

  const totalPrice: number = basketItems.reduce((total, basketItem) => {
    const item = basketItems.find(item => item.id === basketItem.id)
    return total + (item?.price || 0) * basketItem.quantity
  }, 0)

  const succedOrder = () => {
    setModal(false)
    alert('Thank for order')
    clearAllBasketItem()
  }
  
  return (
    <div>
      {basketItems.length === 0
        ? <div className=' w-[300px] h-screen m-auto text-center text-3xl font-semibold dark:text-white'>Basket is empty</div>
        : <div className='h-screen dark:text-white'>
          <div className='flex justify-between items-center text-center p-3'>
            <p className='text-3xl font-semibold'>Basket</p>
            <div>
              <button
                className='bg-slate-500 p-2 hover:bg-slate-700 hover:text-white hover:font-semibold ml-3 rounded-xl'
                onClick={clearAllBasketItem}>
                Clear all
              </button>
              <button className='py-2 px-3 border bg-yellow-300 hover:bg-yellow-500 hover:text-white hover:font-semibold cursor-pointer mx-2 rounded-xl '
                onClick={() => setModal(true)}
              >To order</button>
            </div>
            <p className='text-2xl font-semibold'> Total price: $ {totalPrice.toFixed(2)}</p>
          </div>
          {modal && <Modal closeModal={()=>setModal(false)}>
            <OrderForm succedOrder={succedOrder} />
          </Modal>
          }
          <div>
            {basketItems.map(item => (
              <BasketItem key={item.id} product={item} />
            ))}
          </div>
        </div>
      }
    </div>
  )
};

