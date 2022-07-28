import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Loyout } from './components/Layout'
import { Basket } from './pages/Basket'
import { Products } from './pages/Products'

export const App = () => {
  return (
    <div>
      <Loyout />
      <Routes>
     
     
      <Route path='/' element={<Products />} />
      <Route path='/basket' element={<Basket /> } />
    </Routes>
    </div>
    
    
  )
}


