import './reset.css'
import ReactDOM from 'react-dom/client'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider } from './components/contexts/Contexts'
import { CssBaseline } from '@mui/material'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<ContextProvider>
				<CssBaseline />
				<App />
			</ContextProvider>
		</BrowserRouter>
	</React.StrictMode>
)
