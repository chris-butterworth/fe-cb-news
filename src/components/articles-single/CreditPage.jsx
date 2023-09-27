import { useNavigate } from 'react-router-dom'
import { timeSince } from '../../../utils'
import { portfolio } from '../../Portfolio'
import { Button, Paper } from '@mui/material'

export default function CreditPage() {
	const navigate = useNavigate()

	return (
		<Paper>
			<Button
				onClick={() => {
					navigate(-1)
				}}
			>
				Go back
			</Button>

			<div className="article-single-card">
				<div className="article-single-credit-bar">
					<strong>{portfolio.author}</strong>
					<span>&ensp;</span>
					<span>{timeSince(portfolio.created_at)}</span>
				</div>

				<div className="article-single-heading">
					<h3>{portfolio.title}</h3>
				</div>
				<div className="article-single-body">
					<p>{portfolio.body}</p>
				</div>
				<div className="article-single-img-thumbnail">
					<img src={portfolio.article_img_url} />
				</div>
			</div>
		</Paper>
	)
}
