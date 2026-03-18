import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Settings from './pages/Settings'
import './styles/globals.css'

const ROUTE_TITLES = {
  '/':         'Repurpose Content',
  '/history':  'History',
  '/settings': 'Settings',
}

function AppLayout({ title, children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <TopBar title={title} />
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <AppLayout title="Repurpose Content">
            <Dashboard />
          </AppLayout>
        } />
        <Route path="/history" element={
          <AppLayout title="History">
            <History />
          </AppLayout>
        } />
        <Route path="/settings" element={
          <AppLayout title="Settings">
            <Settings />
          </AppLayout>
        } />
      </Routes>
    </BrowserRouter>
  )
}
