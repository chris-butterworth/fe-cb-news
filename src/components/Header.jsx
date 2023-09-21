import { Link } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { getTopics } from '../../api'
import { Context } from './contexts/Contexts'

export default function Header({ setTopic }) {
	const [topics, setTopics] = useState([])
	const { setUser } = useContext(Context)
	useEffect(() => {
		getTopics().then((data) => {
			setTopics(data)
		})
	}, [])

	return (
		<header>
			<Link
				to={`/topic/all`}
				onClick={() => {
					setTopic('')
				}}
			>
				<img
					className="header-logo"
					src="https://pic.onlinewebfonts.com/thumbnails/icons_4116.svg"
					alt="website logo"
				/>
			</Link>
			<nav>
				<ul>
					<li>
						<Link
							to={`/topic/all`}
							onClick={() => {
								setTopic('')
							}}
						>
							Home
						</Link>
					</li>
					<li>
						<a>Topics</a>
						<ul>
							{topics.map((item, index) => {
								return (
									<li key={index}>
										<Link
											role="button"
											to={`/topic/${item.slug}`}
											onClick={() => {
												setTopic(item.slug)
											}}
										>
											{item.slug}
										</Link>
									</li>
								)
							})}
						</ul>
					</li>
					<li>
						<Link to={`/profile`}>Profile</Link>
					</li>
					<li>
						<Link
							onClick={() => {
								setUser('')
								localStorage.setItem('user', '')
							}}
						>
							Logout
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}
