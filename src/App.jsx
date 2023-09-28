// import './App.css'
import Contents from './components/Contents'
import Header from './components/Header'
import { useEffect, useState } from 'react'
import Login from './components/user/Login'
import { useContext } from 'react'
import { Context } from './components/contexts/Contexts'
import { Box, Container, Grid, Paper } from '@mui/material'

function App() {
	const [topic, setTopic] = useState('all')
	const { user } = useContext(Context)

	return (
		<Grid container>
			{user ? (
				<Box sx={{maxWidth:'1000px', margin:'auto'}}>
					<Header topic={topic} setTopic={setTopic} />
					<Contents topic={topic} />
				</Box>
			) : (
				<Login />
			)}
		</Grid>
	)
}

export default App
