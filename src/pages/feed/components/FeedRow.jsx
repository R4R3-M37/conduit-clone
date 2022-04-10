import React from 'react'
import FeedToggler from './FeedToggler'
import Feed from './Feed'
import PopularTags from './PopularTags'
import { useParams } from 'react-router-dom'

const FeedRow = ({ response, isLoading, error }) => {
	const { slug } = useParams()

	return (
		<div className='container page'>
			<div className='row'>
				<div className='col-md-9'>
					<FeedToggler tag={slug} />
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
	)
}

export default FeedRow
