import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import ImageInputPage from './pages/ImageInputPage'

  
const App = () => {

  const Layout = () => {
    return (
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    )
  }
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,  
      children: [
        {
        path: "/",
        element: <Home /> 
      },
      {
        path:"/ImageInputPage",
        element: <ImageInputPage />
      }
    ]
    }])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App