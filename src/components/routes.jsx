import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GlobalFeed from '../pages/globalFeed/GlobalFeed'
import Article from '../pages/acricle/Article'
import Auth from '../pages/auth/Auth'
import TagFeed from '../pages/tagFeed/TagFeed'

const MyRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<GlobalFeed />} />
			<Route path='/tags/:slug' element={<TagFeed />} />
			<Route path='/register' element={<Auth />} />
			<Route path='/login' element={<Auth />} />
			<Route path='/articles/:slug' element={<Article />} />
		</Routes>
	)
}

export default MyRoutes
