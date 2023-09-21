import './App.css'
import Contents from './components/Contents'
import Header from './components/Header'
import { useEffect, useState } from 'react'
import Login from './components/user/Login'
import { useContext } from 'react'
import { Context } from './components/contexts/Contexts'

function App() {
	const [topic, setTopic] = useState('all')
	const { user } = useContext(Context)

	return (
		<div className="main-container">
			{/* <UserContext.Provider value={{ user, setUser }}> */}
			{user ? (
				<div>
					<Header topic={topic} setTopic={setTopic} />
					<Contents topic={topic} />
				</div>
			) : (
				<Login />
			)}
			{/* </UserContext.Provider> */}
		</div>
	)
}

export default App
