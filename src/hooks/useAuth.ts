import { useSession } from 'next-auth/react'

export const useAuth = () => {
	const { data, status } = useSession()

	return { user: data?.user, isLoggedIn: status === 'authenticated' }
}
