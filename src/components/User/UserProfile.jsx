import { useContext } from 'react'
import { UserContext } from '../contexts/Contexts'
import UserArticles from './UserArticles'

export default function UserProfile({ articles, setArticles }) {
	const { user } = useContext(UserContext)
	return (
		<div>
			<div className="profile-header">
				<h3>Logged in user: {user}</h3>
				<br />
				<h4>This is a portfolio piece created by Chris Butterworth</h4>
				<p>
					The back end API was created using Express.js and PostgreSQL, the
					front end is made with React.
					<br /> It remains a work in progress, I will continue to update and
					add new features. <br />
				</p>
				<br />
				<a href="www.linkedin.com/in/chris-butterworth-74b77a25a">
					Linked In
				</a>{' '}
				<span> / </span>
				<a href="https://github.com/chris-butterworth/cb-news">
					Back end code{' '}
				</a>{' '}
				<span> / </span>
				<a href="https://github.com/chris-butterworth/fe-cb-news">
					Front end code{' '}
				</a>
				<br />
			</div>
			<UserArticles articles={articles} setArticles={setArticles} />
		</div>
	)
}
