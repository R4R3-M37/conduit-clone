import React, { Fragment, useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { Link, useParams } from 'react-router-dom'
import TagList from '../feed/components/TagList'

const Article = () => {
	const [isFavorite, setIsFavorite] = useState(true)

	const { slug } = useParams()
	const apiUrl = `/articles/${slug}`
	const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl)

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
						<div className='article-actions'>
							<app-article-meta>
								<div className='article-meta'>
									<a href='/profile/Gerome' />
									<img src='https://api.realworld.io/images/demo-avatar.png' />
									<div className='info'>
										<a className='author' href='/profile/Gerome'>
											{' '}
											Gerome{' '}
										</a>
										<span className='date'> November 24, 2021 </span>
									</div>
									<span hidden=''>
										<a
											className='btn btn-sm btn-outline-secondary'
											href='/editor/Create-a-new-implementation-1'>
											<i className='ion-edit' /> Edit Article
										</a>
										<button className='btn btn-sm btn-outline-danger'>
											<i className='ion-trash-a' /> Delete Article
										</button>
									</span>
									<span>
										<app-follow-button>
											<button className='btn btn-sm action-btn btn-secondary'>
												<i className='ion-plus-round' /> &nbsp; Unfollow Gerome
											</button>
										</app-follow-button>
										<app-favorite-button>
											<button
												className={
													isFavorite
														? 'btn btn-sm btn-outline-primary'
														: 'btn btn-sm btn-primary'
												}
												onClick={() => setIsFavorite(!isFavorite)}>
												<span className='material-icons-outlined'>favorite</span>
												Favorite Article
												<span className='counter'>(1858)</span>
											</button>
										</app-favorite-button>
									</span>
								</div>
							</app-article-meta>
						</div>
					</Fragment>
				)}
			</div>
		</div>
	)
}

export default Article
