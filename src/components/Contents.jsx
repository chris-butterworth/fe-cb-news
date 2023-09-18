import { Route, Routes, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Articles from './Articles/Articles'
import ArticlePage from './ArticlePage/ArticleSingle'
import Comments from './Comments/Comments'
import UserProfile from './User/UserProfile'
import UserArticles from './User/UserArticles'
import CreditPage from './ArticlePage/CreditPage'

export default function Contents() {
	const [articles, setArticles] = useState([])
	const [article, setArticle] = useState([])
	const [comments, setComments] = useState([])
	// the searchParam states must live here because the Articles page gets reloaded when selecting a new topic, which resets all the queries
	const [sortBy, setSortBy] = useState('created_at')
	const [order, setOrder] = useState('DESC')
	const [user, setUser] = useState('jessjelly')

	return (
		<main>
			<Routes>
				<Route path="/credit" element={<CreditPage />} />

				<Route
					path="/topic/:topic"
					element={
						<Articles
							articles={articles}
							setArticles={setArticles}
							sortBy={sortBy}
							order={order}
							setOrder={setOrder}
							setSortBy={setSortBy}
						/>
					}
				/>
				<Route
					path="/article/:article_id"
					element={<ArticlePage article={article} setArticle={setArticle} />}
				>
					<Route
						path=""
						element={
							<Comments
								comments={comments}
								setComments={setComments}
								user={user}
							/>
						}
					/>
				</Route>
				<Route path="/user/:username" element={<UserProfile />}>
					<Route
						path=""
						element={
							<UserArticles articles={articles} setArticles={setArticles} />
						}
					/>
				</Route>
				<Route path="*" element={<Navigate to="/topic/all" />} />
			</Routes>
		</main>
	)
}
