import { createBrowserRouter } from "react-router-dom";
import ProductCategoryIndex from "./container/product_categories";
import DashboardIndex from "./container/dashboard";
import ProductIndex from "./container/product";
import CustomerIndex from "./container/customer";
import AirlineIndex from "./container/airline";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardIndex />
  },
  {
    path: '/product-categories',
    children: [
      {
        path: '',
        element: <ProductCategoryIndex/>
      },
    ]
  },
  {
    path: '/products',
    children: [
      {
        path: '',
        element: <ProductIndex/>
      },
    ]
  },
  {
    path: '/customers',
    children: [
      {
        path: '',
        element: <CustomerIndex/>
      },
    ]
  },
  {
    path: '/airlines',
    children: [
      {
        path: '',
        element: <AirlineIndex/>
      },
    ]
  },
])