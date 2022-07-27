import React from 'react'
import { useProducts } from '../context/useProducts'

export const Categories = () => {
  
  const { categories, handleCategorySelect, getAllProducts,} = useProducts();
  
  return (
    <div className='flex flex-wrap flex-col w-[24%] mr-4'>
      {/* <div>
        <input placeholder='Search...' onChange={(e)=>setSearch(e.target.value)}/>
        <button>Confirm</button>
      </div> */}
      <button className='border m-3 rounded-lg p-1' onClick={() => { getAllProducts(10, 0) }}>
        All Products
      </button>
      {categories.map(item => (
        <button key={item} onClick={() => handleCategorySelect(item)} className='border m-2 rounded-lg p-1'>{item}</button>
      ))}
    </div>
  )
};

