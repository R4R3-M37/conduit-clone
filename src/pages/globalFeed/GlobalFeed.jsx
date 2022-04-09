import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import Feed from '../../components/feed/Feed'
import PopularTags from './components/PopularTags'
import FeedToggler from './components/FeedToggler'

const GlobalFeed = () => {
	const apiUrl = '/articles?limit=10&offset=0'
	const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl)

	useEffect(() => {
		doFetch()
	}, [doFetch])

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
						<FeedToggler />
						{isLoading && <div>Loading articles...</div>}
						{error && <div>Some error happened</div>}
						{!isLoading && response && <Feed articles={response.articles} />}
					</div>
					<div className='col-md-3'>
						{isLoading && <div>Loading popular tags...</div>}
						{error && <div>Some error happened</div>}
						{!isLoading && response && <PopularTags isLoading={isLoading} response={response} />}
					</div>
				</div>
			</div>
		</div>
	)
}

export default GlobalFeed
