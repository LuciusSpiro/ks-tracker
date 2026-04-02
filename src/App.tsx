import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import NavBar from './components/common/NavBar';
import FloatingAddButton from './components/addEvent/FloatingAddButton';
import CalendarPage from './pages/CalendarPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <HashRouter>
      <AppProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <NavBar />
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/calendar" replace />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
          <FloatingAddButton />
        </div>
      </AppProvider>
    </HashRouter>
  );
}
