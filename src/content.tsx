import './index.css'

import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import ResumeContainer from '@/content/content'

const root = document.createElement('div')
root.id = '_ai_resume_generator_root'
document.body.append(root)

createRoot(root).render(
  <StrictMode>
    <ResumeContainer />
  </StrictMode>
)
