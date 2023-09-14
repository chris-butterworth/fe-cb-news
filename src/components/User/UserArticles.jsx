import ArticleCard from '../Articles/ArticleCard'
import { useEffect, useState, useContext } from 'react'
import { getArticles } from '../../../api'
import { UserContext } from '../contexts/Contexts'
import { useParams } from 'react-router-dom'

export default function UserArticles({ articles, setArticles }) {
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState('')
	const [viewAllUserPosts, setViewAllUserPosts] = useState(false)
	const { user } = useContext(UserContext)

	useEffect(() => {
		setIsLoading(true)
		setIsError(false)
		getArticles()
			.then((data) => {
				setArticles(data)
				setIsLoading(false)
			})
			.catch(
				({
					response: {
						data: { msg },
					},
				}) => {
					setIsLoading(false)
					setIsError(JSON.stringify(msg))
				}
			)
	}, [])

	if (isLoading)
		return (
			<p>
				Loading... <br /> the data is hosted using a free plan at Render which
				spins down during inactivity. It won't be a moment!{' '}
			</p>
		)
	if (isError) return <strong>{isError}</strong>
	return (
		<div className="user-articles">
			<ul>
				<h3>Your most recent posts</h3>
				<br />
				<button
					onClick={() => {
						viewAllUserPosts
							? setViewAllUserPosts(false)
							: setViewAllUserPosts(true)
					}}
				>
					{viewAllUserPosts ? 'View less' : 'View all'}
				</button>
				{articles
					.filter((article) => article.author === user)
					.slice(0, viewAllUserPosts ? articles.length : 3)
					.map((article) => {
						return (
							<ArticleCard
								key={article.article_id}
								article={article}
								articleVotes={article.votes}
							/>
						)
					})}
			</ul>
		</div>
	)
}
