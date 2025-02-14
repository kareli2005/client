import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SystemMessage from './components/SystemMessage'
import routes from './routes'

const App = () => {
  return (
    <div className='w-full h-screen overflow-y-auto font-primary relative'>
      <SystemMessage />
      <Routes>
        {Object.values(routes).map((route, key) => {
          if (route.children) {
            return (
              <Route key={key} path={route.path} element={route.element}>
                {Object.entries(route.children).map(([childKey, child], childKeyIndex) => (
                  <Route key={childKeyIndex} path={child.path} element={child.element} />
                ))}
              </Route>
            )
          }

          return <Route key={key} path={route.path} element={route.element} />
        })}
      </Routes>
    </div>
  )
}

export default App
