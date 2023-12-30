'use client'

import { useAuth } from '@/hooks/useAuth'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, type PropsWithChildren } from 'react'

export default function AuthProvider({ children }: PropsWithChildren<unknown>) {
	const { user, isLoggedIn } = useAuth()
	const pathName = usePathname()
	const { push } = useRouter()

	useEffect(() => {
		if (isLoggedIn) {
			window.localStorage.setItem('token', user?.jwt || '')
		}
	}, [user, isLoggedIn])

	useEffect(() => {
		if (pathName !== '/login' && pathName !== '/register') {
			const isLoggedIn = !!window.localStorage.getItem('token')

			if (!isLoggedIn) {
				push('/login')
				return
			}
		}
	}, [pathName, isLoggedIn, user])

	return <>{children}</>
}
