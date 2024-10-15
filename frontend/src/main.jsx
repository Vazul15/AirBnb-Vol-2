import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.jsx";
import './index.css'

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './components/auth/AuthProvider.jsx'
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
)
