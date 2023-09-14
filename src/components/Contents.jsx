import { Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from './contexts/Contexts'
import Articles from './Articles/Articles'
import ArticlePage from './ArticlePage/ArticleSingle'
import Comments from './Comments/Comments'
import UserProfile from './User/UserProfile'
import Login from './User/Login'

export default function Contents() {
	const [articles, setArticles] = useState([])
	const [article, setArticle] = useState([])
	const [comments, setComments] = useState([])
	// the searchParam states must live here because the Articles page gets reloaded when selecting a new topic, which resets all the queries
	const [sortBy, setSortBy] = useState('created_at')
	const [order, setOrder] = useState('DESC')
	let navigate = useNavigate()

	useEffect(() => {
		if (!localStorage.getItem('user')) {
			return navigate('/login')
		}
	}, [localStorage.getItem('user')])

	return (
		<main>
			<Routes>
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

		// <main>
		// 	<Routes>
		// 		<Route
		// 			path="/topic/:topic"
		// 			element={
		// 				<Articles
		// 					articles={articles}
		// 					setArticles={setArticles}
		// 					sortBy={sortBy}
		// 					order={order}
		// 					setOrder={setOrder}
		// 					setSortBy={setSortBy}
		// 				/>
		// 			}
		// 		/>
		// 		<Route
		// 			path="/article/:article_id"
		// 			element={<ArticlePage article={article} setArticle={setArticle} />}
		// 		>
		// 			<Route
		// 				path=""
		// 				element={<Comments comments={comments} setComments={setComments} />}
		// 			/>
		// 		</Route>
		// 		<Route
		// 			path="/profile"
		// 			element={
		// 				<RequireAuth>
		// 					<UserProfile articles={articles} setArticles={setArticles} />
		// 				</RequireAuth>
		// 			}
		// 		/>

		// 		<Route path="/login" element={<Login />} />
		// 		<Route path="*" element={<Navigate to="/topic/all" />} />
		// 	</Routes>
		// </main>
	)
}
