import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GlobalFeed from '../pages/feed/globalFeed/GlobalFeed'
import Article from '../pages/acricle/Article'
import Auth from '../pages/auth/Auth'
import TagFeed from '../pages/feed/tagFeed/TagFeed'
import YourFeed from '../pages/feed/yourFeed/YourFeed'

const MyRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<GlobalFeed />} />
			<Route path='/feed' element={<YourFeed />} />
			<Route path='/tags/:slug' element={<TagFeed />} />
			<Route path='/register' element={<Auth />} />
			<Route path='/login' element={<Auth />} />
			<Route path='/articles/:slug' element={<Article />} />
		</Routes>
	)
}

export default MyRoutes
