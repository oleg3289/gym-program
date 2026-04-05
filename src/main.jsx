import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import WorkoutTracker from '../workout-tracker'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WorkoutTracker />
  </StrictMode>,
)
