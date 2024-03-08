'use client'

import { Loader } from '@/components/ui/loader/Loader'
import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function CurrentUser() {
	const { user } = useAuth()
	const { push } = useRouter()

	const { isLoading } = useProfile()

	return (
		<div className='sm:p-0 sm:pt-5  p-layout flex items-center justify-between sm:flex-col sm:gap-5'>
			<div className='flex items-center '>
				{isLoading ? (
					<Loader />
				) : (
					<Image
						src={user?.avatar || '/no-avatar.png'}
						alt='avatar'
						width={40}
						height={40}
						className='mr-4 sm:mr-0 sm:w-[30px] sm:h-[30px]'
					/>
				)}
				<span className='sm:hidden'>{user?.name}</span>
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
