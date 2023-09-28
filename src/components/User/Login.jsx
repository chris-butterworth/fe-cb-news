import { useContext, useEffect, useState } from 'react'
import { getUsers } from '../../../api'
import { Link } from 'react-router-dom'
import { Context } from '../contexts/Contexts'
import { Paper, Typography } from '@mui/material'

export default function Login() {
	const [users, setUsers] = useState([])
	const { setUser } = useContext(Context)

	useEffect(() => {
		getUsers().then((data) => {
			setUsers(data)
		})
	}, [])

	return (
		<Paper>
			<Typography variant='h4'> Welcome, please select a user</Typography>
			<ul>
				{users.map((user) => {
					return (
						<li key={user.username}>
							<h3>{user.username}</h3>
							<h4>{user.name}</h4>
							<Image src={user.avatar_url} />
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
		</Paper>
	)
}
