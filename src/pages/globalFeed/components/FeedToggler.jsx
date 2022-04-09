import React from 'react'
import { NavLink } from 'react-router-dom'

const FeedToggler = ({ tag }) => {
	return (
		<div className='feed-toggle'>
			<ul className='nav-pills outline-active'>
				<li className='feed-item'>
					<NavLink to='/feed' className='feed-link'>
						<h2>Your feed</h2>
					</NavLink>
				</li>
				<li className='feed-item'>
					<NavLink to='/' className='feed-link'>
						<h2>Global feed</h2>
					</NavLink>
				</li>
				{tag && (
					<li className='feed-item'>
						<NavLink to={`/tags/${tag}`} className='feed-link'>
							<h2>#{tag}</h2>
						</NavLink>
					</li>
				)}
			</ul>
		</div>
	)
}

export default FeedToggler
