import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import EditClient from './pages/client/editClient'
import CreateClient from './pages/client/createClient'
import Home from './pages/home'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path={"/"}
            element={<Home />}
          />

          <Route
            path="/client/edit/:id"
            element={<EditClient />}
          />
          <Route
            path="/client/create"
            element={<CreateClient />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
