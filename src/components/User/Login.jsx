import { useContext, useEffect, useState } from 'react'
import { getUsers } from '../../../api'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/Contexts'

export default function Login() {
	const [users, setUsers] = useState([])
	const { setUser } = useContext(UserContext)

	useEffect(() => {
		getUsers().then((data) => {
			setUsers(data)
		})
	}, [])

	return (
		<div>
			<h2> Welcome, please select a user</h2>
			<ul>
				{users.map((user) => {
					return (
						<li key={user.username}>
							<h3>{user.username}</h3>
							<h4>{user.name}</h4>
							<img src={user.avatar_url} />
							<Link
								onClick={() => {
									setUser(user.username)
									localStorage.setItem('user', user.username)
								}}
								to="/topics/all"
							>
								<button>Login</button>
							</Link>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
