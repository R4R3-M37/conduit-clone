import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import Feed from '../../components/feed/Feed'
import PopularTags from '../globalFeed/components/PopularTags'
import { useParams } from 'react-router-dom'
import FeedToggler from '../globalFeed/components/FeedToggler'

const TagFeed = () => {
	const slug = useParams()
	const apiUrl = `/articles?limit=10&offset=0&tag=${slug.slug}`
	const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl)

	useEffect(() => {
		doFetch()
	}, [doFetch, slug])

	return (
		<div className='home-page'>
			<div className='banner'>
				<div className='container'>
					<h1>conduit</h1>
					<p>A place to share knowledge</p>
				</div>
			</div>
			<div className='container page'>
				<div className='row'>
					<div className='col-md-9'>
						<FeedToggler tag={slug.slug} />
						{isLoading && <div>Loading articles...</div>}
						{error && <div>Some error happened</div>}
						{!isLoading && response && <Feed articles={response.articles} />}
					</div>
					<div className='col-md-3'>
						{isLoading && <div>Loading popular tags...</div>}
						{error && <div>Some error happened</div>}
						{!isLoading && response && <PopularTags />}
					</div>
				</div>
			</div>
		</div>
	)
}

export default TagFeed
