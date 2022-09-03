import React from 'react'

import { Link } from 'react-router-dom'
import { useProducts } from '../context/useProducts'
import { Toggle } from './Toggle'

export const Layout = () => {

  const { basketItems } = useProducts()

  return (
    <div className='w-screen h-20  bg-slate-600 flex justify-between items-center drop-shadow-lg mb-8'>
      <div className="flex text-3xl p-4 text-white font-bold">
        <div> Shopping store</div>
        <Toggle />
      </div>
      
      <div className='text-white p-7 text-lg flex flex-row'>
        <Link to="/" className='mx-5 hover:text-2xl'>Products</Link>
        <Link to="/basket" className='hover:text-2xl flex flex-col relative mr-3'>
          Basket
          <span className='bg-orange-300 absolute top-[-15px] right-[-16px] p-[2px] rounded-xl '>{basketItems.length}
          </span>
        </Link>
        
      </div>
    </div>
  )
};

