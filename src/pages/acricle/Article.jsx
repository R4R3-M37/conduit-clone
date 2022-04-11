import React, { Fragment, useContext, useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TagList from '../feed/components/TagList'
import { CurrentUserContext } from '../../context/currentUser'

const Article = () => {
	const [isFavorite, setIsFavorite] = useState(true)
	const [currentUserState] = useContext(CurrentUserContext)

	const { slug } = useParams()
	const apiUrl = `/articles/${slug}`
	const navigate = useNavigate()
	const [isDeleted, setIsDeleted] = useState(false)
	const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl)
	const [{ response: responseArticleDelete }, doArticleDelete] = useFetch(apiUrl)

	const isAuthor = () => {
		if (!response || !currentUserState.isLoggedIn) {
			return false
		}
		return response.article.author.username === currentUserState.currentUser.username
	}

	const deleteArticle = () => {
		doArticleDelete({
			method: 'delete',
		})
		setIsDeleted(true)
	}

	useEffect(() => {
		if (isDeleted) {
			navigate('/')
		}
	})

	useEffect(() => {
		doFetch()
	}, [doFetch])

	return (
		<div className='article-page'>
			<div className='banner'>
				{!isLoading && response && (
					<div className='container'>
						<h1>{response.article.title}</h1>
						<div className='article-meta'>
							<Link to={`/profiles/${response.article.author.username}`}>
								<img src={response.article.author.image} alt='profile pic' />
							</Link>
							<div className='info'>
								<Link to={`/profiles/${response.article.author.username}`}>
									{response.article.author.username}
								</Link>
								<span className='date'>{response.article.createdAt}</span>
							</div>
							{isAuthor() && (
								<span>
									<Link
										to={`/articles/${response.article.slug}/edit`}
										className='btn btn-outline-secondary btn-sm'>
										Edit Article
									</Link>
									<button className='btn btn-outline-danger btn-sm' onClick={deleteArticle}>
										Delete Article
									</button>
								</span>
							)}
						</div>
					</div>
				)}
			</div>
			<div className='container page'>
				{isLoading && <div>Loading...</div>}
				{error && <div>Some error happened</div>}
				{!isLoading && response && (
					<Fragment>
						<div className='row article-content'>
							<div className='col-xs-12'>
								<div>
									<p>{response.article.body}</p>
								</div>
								<TagList article={response.article} />
							</div>
						</div>
						<hr />
					</Fragment>
				)}
			</div>
		</div>
	)
}

export default Article
