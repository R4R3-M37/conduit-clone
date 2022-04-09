import { createContext, useContext, useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import useStorage from '../hooks/useStorage'

const CurrentUserContext = createContext([{}, () => {}])

const CurrentUserProvider = ({ children }) => {
	const [state, setState] = useState({
		isLoading: false,
		isLoggedIn: null,
		currentUser: null,
	})
	return <CurrentUserContext.Provider value={[state, setState]}>{children}</CurrentUserContext.Provider>
}

const CurrentUserChecker = ({ children }) => {
	const [{ response }, doFetch] = useFetch('/user')
	const [, setCurrentUserState] = useContext(CurrentUserContext)
	const [token] = useStorage('token')
	useEffect(() => {
		if (!token) {
			setCurrentUserState((state) => ({
				...state,
				isLoggedIn: false,
			}))
		}
		doFetch()
		setCurrentUserState((state) => ({
			...state,
			isLoading: true,
		}))
	}, [doFetch, setCurrentUserState, token])

	useEffect(() => {
		if (!response) {
			return
		}

		setCurrentUserState((state) => ({
			...state,
			isLoggedIn: true,
			isLoading: false,
			currentUser: response.user,
		}))
	}, [response, setCurrentUserState])

	return children
}

export { CurrentUserContext, CurrentUserProvider, CurrentUserChecker }
