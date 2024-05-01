import logo from './logo.svg';
import './App.css';
import React,{lazy,Suspense} from 'react'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom' 
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'


const Home=lazy(()=>import('./pages/Home'))
const Login=lazy(()=>import('./pages/Login'))
const Signup=lazy(()=>import('./pages/Signup'))
const ForgotPassword=lazy(()=>import('./pages/ForgotPassword'))
const VerifyOtp=lazy(()=>import('./pages/VerifyOtp'))
const Products=lazy(()=>import('./pages/Products'))
const AdminDashboard=lazy(()=>import('./pages/AdminDashboard'))
const BrowseProducts=lazy(()=>import('./pages/BrowseProducts'))
const AdminAddProduct=lazy(()=>import('./pages/AdminAddProduct'))

const router=createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/verify-otp',
    element: <VerifyOtp />
  },
  {
    path: '/products',
    element: <Products />
  },
  {
    path: '/admin-dashboard',
    element: <AdminDashboard />
  },
  {
    path: '/search-product',
    element: <BrowseProducts />
  },
  {
    path: '/admin-add-product',
    element: <AdminAddProduct />
  },
])

const queryClient=new QueryClient()

function App() {
  return (
   <div>
   <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
      </Suspense>
   </QueryClientProvider>
   
   </div>
  );
}

export default App;
