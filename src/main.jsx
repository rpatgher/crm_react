import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


// ************* Components *************
import Layout from './components/Layout'

// ************* Pages *************
import Index, { loader as customersLoader} from './pages/Index';
import NewCustomer, { action as actionNewCustomer } from './pages/NewCustomer'
import EditCustomer, { loader as loaderEditCustomer, action as actionEditCustomer} from './pages/EditCustomer'
import { action as actionRemoveCustomer } from './components/Customer';
import Error from './pages/Error'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout  />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: customersLoader,
        errorElement: <Error />
      },
      {
        path: '/customers/new',
        element: <NewCustomer />,
        action: actionNewCustomer,
        errorElement: <Error />
      },
      {
        path: '/customers/:customerId/edit',
        element: <EditCustomer />,
        loader: loaderEditCustomer,
        action: actionEditCustomer,
        errorElement: <Error />
      },
      {
        path: '/customers/:customerId/remove',
        action: actionRemoveCustomer,
        errorElement: <Error />
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
