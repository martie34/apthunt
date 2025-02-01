import { ConfigProvider, theme } from 'antd'
import Apartments from 'pages/Apartments'
import Budget from 'pages/Budget'
import CarsPage from 'pages/Cars'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useLoadLocalStorage } from '../hooks/useLoadLocalStorage'
import '../styles.css'
import NavBar from './NavBar'

const { darkAlgorithm } = theme

function App() {
  useLoadLocalStorage()

  return (
    <ConfigProvider theme={{ algorithm: darkAlgorithm }}>
      <div className="mx-auto max-w-screen-2xl">
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Budget />} />
            <Route path="/apartments" element={<Apartments />} />
            <Route path="/cars" element={<CarsPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ConfigProvider>
  )
}

export default App
