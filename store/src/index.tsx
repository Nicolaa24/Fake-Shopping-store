import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { App } from './App';

import { ProductsProvider } from './context/ProductsProvider';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <ProductsProvider initialTheme=''>
      <body className='bg-white dark:bg-slate-700 transition-all'>
        <App />
      </body>
    </ProductsProvider>
);


