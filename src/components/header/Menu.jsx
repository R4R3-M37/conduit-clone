import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Menu = ({ active, setActive, currentUserState }) => {
	return (
		<div className={active ? 'menu active' : 'menu'} onClick={() => setActive(false)}>
			<div className='menu-content' onClick={(e) => e.stopPropagation()}>
				<Link to='/' className='menu-header' onClick={() => setActive(false)}>
					conduit
				</Link>
				<ul>
					<li onClick={() => setActive(false)}>
						<Link to='/' className='menu-item'>
							Home <span className='material-icons'>home</span>
						</Link>
					</li>
					{currentUserState.isLoggedIn === false && (
						<Fragment>
							<li onClick={() => setActive(false)}>
								<Link to='/login' className='menu-item'>
									Sing In <span className='material-icons'>input</span>
								</Link>
							</li>
							<li onClick={() => setActive(false)}>
								<Link to='/register' className='menu-item'>
									Sing Up <span className='material-icons'>login</span>
								</Link>
							</li>
						</Fragment>
					)}
					{currentUserState.isLoggedIn && (
						<Fragment>
							<li onClick={() => setActive(false)}>
								<Link to='/articles/new' className='menu-item'>
									New Post <span className='material-icons'>post_add</span>
								</Link>
							</li>
							<li onClick={() => setActive(false)}>
								<Link to={`/profiles/${currentUserState.currentUser.username}`} className='menu-item'>
									{currentUserState.currentUser.username}
									<span className='material-icons'>account_circle</span>
								</Link>
							</li>
							<li onClick={() => setActive(false)}>
								<Link to={`/profiles/${currentUserState.currentUser.username}`}>
									<img
										src={currentUserState.currentUser.image}
										alt='Profile pic'
										style={{
											transform: 'translate(-50%,-50%)',
											position: 'absolute',
											top: '80%',
										}}
									/>
								</Link>
							</li>
						</Fragment>
					)}
				</ul>
			</div>
		</div>
	)
}

export default Menu
