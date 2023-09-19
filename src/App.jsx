import './App.css'
import Contents from './components/Contents'
import Header from './components/Header'
import { useEffect, useState } from 'react'
import { UserContext } from './components/contexts/Contexts'
import Login from './components/user/Login'

function App() {
	const [topic, setTopic] = useState('all')
	const [user, setUser] = useState('')
	console.log(user)

	useEffect(() => {
		setUser(localStorage.getItem('user'))
	}, [])

	return (
		<div className="main-container">
			<UserContext.Provider value={{ user, setUser }}>
				{user ? (
					<div>
						<Header topic={topic} setTopic={setTopic} />
						<Contents topic={topic} />
					</div>
				) : (
					<Login />
				)}
			</UserContext.Provider>
		</div>
	)
}

export default App
