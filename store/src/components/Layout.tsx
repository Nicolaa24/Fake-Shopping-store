import React from 'react'
import { Link } from 'react-router-dom'

export const Loyout = () => {
  return (
    <div className='w-screen h-20  bg-slate-600 flex justify-between items-center drop-shadow-lg mb-8'>
      <div className="text-3xl p-4 text-white font-bold">Shopping store</div>
      <div className='text-white p-7 text-lg'>
        <Link to="/" className='mx-5 hover:text-2xl'>Products</Link>
        <Link to="/basket" className='hover:text-2xl'>Basket</Link>
      </div>
    </div>
  )
}

