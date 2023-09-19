import { Route, Routes, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Articles from './articles-all/AllArticles'
import ArticlePage from './articles-single/ArticleSingle'
import Comments from './comments/Comments'
import UserProfile from './user/UserProfile'
import Login from './user/Login'
import CreditPage from './articles-single/CreditPage'

export default function Contents() {
	const [articles, setArticles] = useState([])
	const [article, setArticle] = useState([])
	const [comments, setComments] = useState([])
	// the searchParam states must live here because the Articles page gets reloaded when selecting a new topic, which resets all the queries
	const [sortBy, setSortBy] = useState('created_at')
	const [order, setOrder] = useState('DESC')

	return (
		<main>
			<Routes>
				<Route path="/credit" element={<CreditPage />} />

				<Route path="/login" element={<Login />} />

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
						element={<Comments comments={comments} setComments={setComments} />}
					/>
				</Route>
				<Route
					path="/profile"
					element={
						<UserProfile articles={articles} setArticles={setArticles} />
					}
				/>

				<Route path="/login" element={<Login />} />
				<Route path="*" element={<Navigate to="/topic/all" />} />
			</Routes>
		</main>
	)
}
