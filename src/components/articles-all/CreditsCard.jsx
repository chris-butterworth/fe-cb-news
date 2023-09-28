import { Link } from 'react-router-dom'
import { useState } from 'react'
import { timeSince } from '../../../utils'
import { portfolio } from '../../Portfolio'
import { Paper } from '@mui/material'

export default function CreditsCard() {
	const [bodyPreview, setBodyPreview] = useState(true)
    
	const bodyShortner = (body) => {
		if (body.length < 200) {
			return body
		} else {
			return <>{body.slice(0, 200)}...</>
		}
	}

	return (
		<Paper sx={{margin:'0.5em', padding:'0.5em'}}>
			<div className="articles-credit-bar">
				<strong>{portfolio.author}</strong>
				<span>&ensp;</span>
				<span>{timeSince(portfolio.created_at)}</span>
			</div>

			<div className="articles-img-thumbnail">
				<Link to={`/credit`}>
					<img src={portfolio.article_img_url} />
				</Link>
			</div>
			<div className="articles-content">
				<Link to={`/credit`}>
					<div className="articles-heading">
						<h3>{portfolio.title}</h3>
					</div>

					<div className="articles-body">
						{bodyPreview && bodyShortner(portfolio.body)}

						{!bodyPreview && portfolio.body}
					</div>
				</Link>
				{bodyPreview && (
					<Link
						to=""
						onClick={(e) => {
							e.preventDefault()
							setBodyPreview(false)
						}}
					>
						<p className="view-full-post">View full post</p>
					</Link>
				)}
			</div>
		</Paper>
	)
}
