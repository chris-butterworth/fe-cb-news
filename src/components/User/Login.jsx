import { useEffect, useState, useContext } from 'react'
import { getUsers } from '../../../api'
import { Link } from 'react-router-dom'

export default function Login() {
	const [users, setUsers] = useState([])

	useEffect(() => {
		getUsers().then((data) => {
			setUsers(data)
		})
	}, [])

	return (
		<ul>
			{users.map((user) => {
				return (
					<li key={user.username}>
						<h3>{user.username}</h3>
						<h4>{user.name}</h4>
						<img src={user.avatar_url} />
						<Link
							onClick={(e) => {
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
	)
}
