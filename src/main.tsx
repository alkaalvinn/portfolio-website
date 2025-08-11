import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ActiveSectionContextProvider } from "./context/active-section-context.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <ActiveSectionContextProvider>
          <App />
        </ActiveSectionContextProvider>
    </BrowserRouter>
  </StrictMode>
);