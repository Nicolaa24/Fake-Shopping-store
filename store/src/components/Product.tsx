import React from 'react'
import { IProduct } from '../interface'

interface IProductProps {
  product:IProduct
}

export const Product: React.FC<IProductProps> = ({ product }) => {
  const [details, setDetails] = React.useState(false);

  return (
    <div className='flex flex-col w-[29%] m-4 shadow-lg'>
      <img src={product.images[0]} alt={product.title} className='w-[100%] h-[200px]' />
      <div className='p-2 m-1'>
        <p>Title: {product.title}</p>
        <p>Price: {product.price}$</p>
        <p>Brand: {product.brand}</p>
      </div>
     
      <button
        className='py-2 px-3 border bg-yellow-400 cursor-pointer mb-2 '
        onClick={() => setDetails(prev => !prev)}
      >{details ? 'Hide Details' : 'Show Details'}
      </button>

      {details && <div className='flex flex-col p-2 m-1'>
        <p>Info: {product.description}</p>
        <p>Rate: {product.rating}</p>
      </div>}
      <button className='bg-slate-500 p-2'>
        Add to basket
      </button>
    </div>
  )
}
