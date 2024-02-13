import { createBrowserRouter } from "react-router-dom";
import ProductCategoryIndex from "./container/product_categories";
import DashboardIndex from "./container/dashboard";
import ProductIndex from "./container/product";
import CustomerIndex from "./container/customer";
import AirlineIndex from "./container/airline";
import ProductOrderIndex from "./container/product_order";
import AddNewOrderPage from "./container/product_order/page/AddNewOrderPage";
import ProductOrderDetailPage from "./container/product_order/page/ProductOrderDetailsPage";
import ReportIndex from "./container/report";


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
    path: '/product-orders',
    children: [
      {
        path: '',
        element: <ProductOrderIndex />
      },
      {
        path: 'add-new',
        element: <AddNewOrderPage />
      },
      {
        path: 'view-detail/:orderId',
        element: <ProductOrderDetailPage />
      }
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
  {
    path: '/reports',
    children: [
      {
        path: '',
        element: <ReportIndex />
      }
    ]
  }
])