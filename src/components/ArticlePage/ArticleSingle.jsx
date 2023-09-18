import { useParams, Outlet, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getArticle, patchArticleVotes } from '../../../api'
import { timeSince } from '../../../utils'
import { portfolio } from '../../Portfolio'

export default function Article({ article, setArticle }) {
	const { article_id } = useParams()
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState('')
	const [votes, setVotes] = useState(0)
	const navigate = useNavigate()

	useEffect(() => {
		setIsLoading(true)
		setIsError(false)
		getArticle(article_id)
			.then((data) => {
				setArticle(data)
				setVotes(data.votes)
				setIsLoading(false)
			})
			.catch(
				({
					response: {
						data: { msg },
					},
				}) => {
					setIsLoading(false)
					setIsError(msg)
				}
			)
	}, [])

	const handleVote = (event, vote) => {
		event.preventDefault()
		setVotes((currVotes) => {
			currVotes += vote
			return currVotes
		})
		patchArticleVotes(article.article_id, vote).catch(() => {
			setVotes((currVotes) => {
				currVotes -= vote
				return currVotes
			})
			alert('your vote could not be added at this time')
		})
	}

	if (isLoading) return <p>Loading...</p>
	if (isError) return <h3>{isError}</h3>

	return (
		<div>
			<button
				onClick={() => {
					navigate(-1)
				}}
			>
				Go back
			</button>

			<div className="article-single-card">
				<div className="article-single-credit-bar">
					<strong>{article.author}</strong>
					<span>&ensp;</span>
					<span>{timeSince(article.created_at)}</span>
				</div>

				<div className="article-single-heading">
					<h3>{article.title}</h3>
				</div>
				<div className="article-single-img-thumbnail">
					<img src={article.article_img_url} />
				</div>
				<div className="article-single-body">
					<p>{article.body}</p>
				</div>
				<div className="article-single-action-bar">
					<div className="article-single-action-bar-votes">
						<button
							onClick={(event) => {
								handleVote(event, -1)
							}}
						>
							-
						</button>
						<strong>{votes}</strong>
						<button
							onClick={(event) => {
								handleVote(event, 1)
							}}
						>
							+
						</button>
					</div>
					<p> {article.comment_count} comments</p>
					<Link to={`/topic/${article.topic}`}>
						<button>cb/{article.topic}</button>
					</Link>
				</div>
			</div>
			<Outlet />
		</div>
	)
}
