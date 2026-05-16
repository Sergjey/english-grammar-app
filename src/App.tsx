import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { HomePage } from '@/pages/HomePage'
import { UnitsPage } from '@/pages/UnitsPage'
import { UnitHubPage } from '@/pages/UnitHubPage'
import { PracticePage } from '@/pages/PracticePage'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="units" element={<UnitsPage />} />
          <Route path="unit/:unitId" element={<UnitHubPage />} />
          <Route path="practice/:unitId/:categoryId" element={<PracticePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
