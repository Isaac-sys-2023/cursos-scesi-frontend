import './App.css'
import { Route, Routes } from 'react-router-dom'
import DashboardAdmin from './pages/admin/DashboardAdmin'
import DashboardEstudiantes from './pages/estudiantes/DashboardEstudiantes'
import DashboardTutor from './pages/tutores/DashboardTutor'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import { PrivateRoute } from './routes/PrivateRoutes'
import RegisterAdminPage from './pages/admin/RegisterAdminPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<PrivateRoute roles={["admin"]}><DashboardAdmin /></PrivateRoute>} />
        <Route path="/register" element={<PrivateRoute roles={["admin"]}><RegisterAdminPage /></PrivateRoute>} />
        
        <Route path="/estudiantes" element={<PrivateRoute roles={["admin","estudiante"]}><DashboardEstudiantes /></PrivateRoute>} />
        
        <Route path="/tutores" element={<PrivateRoute roles={["tutor"]}><DashboardTutor /></PrivateRoute>} />
      </Routes>
    </>
  )
}

export default App
