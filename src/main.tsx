
import React from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence } from 'framer-motion'
import App from './App.tsx'
import './index.css'

const root = document.getElementById('root')

// Register service worker (required for Razorpay)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <AnimatePresence mode="wait">
        <App />
      </AnimatePresence>
    </React.StrictMode>
  )
}
