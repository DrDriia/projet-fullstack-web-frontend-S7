import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createElement } from 'react'
import Layout from './components/common/Layout'
import UserProvider from './utils/context/UserProvider'
import { navigationItems } from './utils/navigation'
import './App.css'

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {
            navigationItems.filter(item => !item.hidden).map(({ to, page, label }, index) => (
              <Route key={index} path={to} element={
                <Layout title={label} >
                  {createElement(page)}
                </Layout>
                }
              />
            ))
          }
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
