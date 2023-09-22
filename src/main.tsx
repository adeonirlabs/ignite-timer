import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { router } from '~/router'

import { CyclesProvider } from './context/cycles'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CyclesProvider>
      <RouterProvider router={router} />
    </CyclesProvider>
  </React.StrictMode>,
)
