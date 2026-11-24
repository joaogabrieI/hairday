import { AppointmentsProvider } from './context/AppointmentsContext'
import { Logo } from './components/Logo'
import { ScheduleForm } from './components/ScheduleForm'
import { Schedule } from './components/Schedule'

export default function App() {
  return (
    <AppointmentsProvider>
      <div className="app">
        <aside className="sidebar">
          <Logo />
          <ScheduleForm />
        </aside>
        <Schedule />
      </div>
    </AppointmentsProvider>
  )
}
