import './App.css'
import { Route, Routes } from 'react-router-dom'
import DashboardAdmin from './pages/admin/DashboardAdmin'
import DashboardEstudiantes from './pages/estudiantes/DashboardEstudiantes'
import DashboardTutor from './pages/tutores/DashboardTutor'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/estudiantes" element={<DashboardEstudiantes />} />
        <Route path="/tutores" element={<DashboardTutor />} />
      </Routes>
    </>
  )
}

export default App
