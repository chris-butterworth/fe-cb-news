import './App.css'
import Contents from './components/Contents'
import Header from './components//HeaderBar/Header'
import { useEffect, useState } from 'react'
import { UserContext } from './components/contexts/Contexts'

function App() {
	const [topic, setTopic] = useState('all')
	const [user, setUser] = useState('')

	useEffect(() => {
		setUser(localStorage.getItem('user'))
	}, [localStorage.getItem('user')])

	return (
		<div className="main-container">
			<UserContext.Provider value={{ user, setUser }}>
				<Header topic={topic} setTopic={setTopic} />
				<Contents topic={topic} />
			</UserContext.Provider>
		</div>
	)
}

export default App
