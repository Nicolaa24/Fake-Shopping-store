import React from 'react'
import { useProducts } from '../context/useProducts'

export const Categories: React.FC = () => {
  const [search, setSearch] = React.useState('');

  const { categories, handleCategorySelect, getAllProducts, handleSearchProducts } = useProducts();
  
  const onClickSearch = () => {
    handleSearchProducts(search)
    setSearch('')
  }

  return (
    <div className='flex flex-wrap flex-col w-[24%] mr-4'>
      <div className='m-2'>
        <input placeholder='Search...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='p-1 m-1 cursor-pointer hover:border-2 hover:font-semibold rounded-lg outline-none' />
        <button className='p-1 m-1 border bg-sky-500 hover:bg-sky-700 hover:text-white hover:font-semibold rounded-lg w-[100%]'
          onClick={onClickSearch}>Search</button>
      </div>
      <button
        className='border m-3 rounded-lg p-1 hover:bg-slate-500 hover:font-semibold hover:text-white hover:border-black hover:border-2'
        onClick={() => { getAllProducts(10, 0) }}>
        All Products
      </button>
      {categories.map(item => (
        <button key={item} onClick={() => handleCategorySelect(item)}
          className='border m-2 rounded-lg hover:bg-slate-500 hover:font-semibold hover:text-white hover:border-black hover:border-2 p-1'>{item}</button>
      ))}
    </div>
  )
};

