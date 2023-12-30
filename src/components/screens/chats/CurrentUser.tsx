'use client'

import { useAuth } from '@/hooks/useAuth'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function CurrentUser() {
	const { user, isLoggedIn } = useAuth()
	const { push } = useRouter()

	// console.log(isLoggedIn)

	return (
		<div className='p-layout flex items-center justify-between'>
			<div className='flex items-center'>
				<Image
					src={user?.avatar || '/no-avatar.png'}
					alt='avatar'
					width={50}
					height={50}
					className='mr-4'
				/>

				<span>{user?.name}</span>
			</div>
			<button
				className='text-[#7C7275] hover:text-white transition-colors'
				onClick={() =>
					signOut({ redirect: false }).then(() => {
						window.localStorage.removeItem('token')
						push('/login')
					})
				}
			>
				<LogOut />
			</button>
		</div>
	)
}
