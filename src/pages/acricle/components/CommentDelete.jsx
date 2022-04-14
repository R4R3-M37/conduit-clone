import React from 'react'
import useFetch from '../../../hooks/useFetch'

const CommentDelete = ({ slug, id }) => {
	const apiDelete = `/articles/${slug}/comments/${id}`
	const [response, doFetchDelete] = useFetch(apiDelete)
	const handleDelete = () => {
		doFetchDelete({
			method: 'delete',
		})
	}

	return (
		<i className='ion-trash-a' onClick={handleDelete} />
	)
}

export default CommentDelete