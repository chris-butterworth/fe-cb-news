import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './reset.css'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<ModeProvider>
				<CssBaseline />
				<App />
			</ModeProvider>
		</BrowserRouter>
	</React.StrictMode>
)
