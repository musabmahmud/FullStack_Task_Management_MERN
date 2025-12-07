import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppProviders } from './lib/providers/app-provider.tsx'
import { Toaster } from 'sonner'
import AppRouter from './routes/AppRouter.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <AppRouter />
      <Toaster visibleToasts={3} richColors position="top-right" toastOptions={{
        style: {
          width: 'full',
        },
      }} />
    </AppProviders>
  </StrictMode>,
)
