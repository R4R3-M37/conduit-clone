import React, { useContext, useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import { CurrentUserContext } from '../../../context/currentUser'
import { useNavigate } from 'react-router-dom'

const FormComment = ({ slug }) => {
	const navigate = useNavigate()
	const apiUrl = `/articles/${slug}/comments`
	const [currentUserState] = useContext(CurrentUserContext)
	const [response, doFetch] = useFetch(apiUrl)
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [comment, setComment] = useState('')

	console.log(response)

	const handleSubmit = (e) => {
		e.preventDefault()
		doFetch({
			method: 'post',
			data: {
				comment: {
					body: comment,
				},
			},
		})
	}

	if (response.isLoading || response === null) {
		document.location.reload()
	}

	return (
		<form className='card comment-form ng-untouched ng-pristine ng-valid' onSubmit={handleSubmit}>
			<fieldset>
				<div className='card-block'>
					<textarea className='form-control ng-untouched ng-pristine ng-valid'
					          placeholder='Write a comment...' rows='3' value={comment}
					          onChange={(e) => setComment(e.target.value)} />
				</div>
				<div className='card-footer'>
					<img className='comment-author-img'
					     src={currentUserState.currentUser.image} alt='profile pic' />
					<button className='btn btn-sm btn-primary' type='submit'> Post Comment
					</button>
				</div>
			</fieldset>
		</form>
	)
}

export default FormComment