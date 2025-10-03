import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GameProvider} from "./context/GameProvider"
import { store, persistor } from "./store/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; 
import { SpeedInsights } from "@vercel/speed-insights/react";

import "./i18n"; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <GameProvider>
      <PersistGate persistor={persistor}>
        <SpeedInsights/>
    <App />
    </PersistGate>
    </GameProvider>
    </ Provider>
  </StrictMode>,
)
