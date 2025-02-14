import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { SystemMessageProvider } from './context/SystemMessageContext.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { UserDataProvider } from './context/UserDataContext.jsx'
import { ChatsDataProvider } from './context/ChatsDataContext.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <LanguageProvider>
    <SystemMessageProvider>
      <UserDataProvider>
        <ChatsDataProvider>
          <Router>
            <App />
          </Router>
        </ChatsDataProvider>
      </UserDataProvider>
    </SystemMessageProvider>
  </LanguageProvider >
)
