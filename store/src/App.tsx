import React from 'react'

import {BrowserRouter, Route, Routes } from 'react-router-dom'

import { Layout } from './components/Layout'
import { Loader } from './components/Loader/Loader'
import { useProducts } from './context/useProducts'
import { Basket } from './pages/Basket'
import { Products } from './pages/Products'

export const App = () => {

  const { isLoading } = useProducts()

  return (
    <BrowserRouter>
      {isLoading
        ? <div className='h-screen'>
          <Loader />
          </div>
        : <>
          <Layout />
          <Routes>
            <Route path='/' element={<Products />} />
            <Route path='/basket' element={<Basket />} />
          </Routes>
        </>
      }
    </BrowserRouter>
  )
};


