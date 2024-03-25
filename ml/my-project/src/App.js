import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import ImageInputPage from './pages/ImageInputPage'
import Home from './pages/Home'

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
        { path: '/', element: <ImageInputPage /> },
        { path: 'home', element: <Home /> },
      ],
    },
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App