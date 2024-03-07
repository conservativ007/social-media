'use client'

import { fetchClient } from '@/$api/api.fetch'
import { Loader } from '@/components/ui/loader/Loader'
import { useProfile } from '@/hooks/useProfile'
import { IUser } from '@/types/user.types'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React from 'react'
import { getImageUrl } from '../config/get-image-url.config'

export function Friends() {
	const { data, isLoading, isFetching } = useQuery({
		queryKey: ['users'],
		queryFn: () =>
			fetchClient.get<IUser[]>('/users?populate=avatar&populate=friends')
	})

	const { data: authUser } = useProfile()

	return (
		<div className='w-7/12'>
			<h1 className='p-layout'>People</h1>
			{isLoading || isFetching ? (
				<div className='p-layout'>
					<Loader />
				</div>
			) : (
				<div className=' grid grid-cols-3 border border-border border-b-0 border-r-0 border-l-0'>
					{data?.map(user => {
						const isFriend = authUser?.friends?.some(u => u.id === user.id)

						return (
							<div
								key={user.id}
								className='text-center p-layout border border-border border-t-0'
							>
								<Image
									src={getImageUrl(user.avatar?.url) || '/avatar1.png'}
									alt='user-avatar'
									width={50}
									height={50}
									className='mx-auto'
								/>
								<p className='mt-3 text-xl font-medium'>{user.username}</p>
								<button className='border-b border-white transition-colors hover:border-primary cursor-pointer mt-2'>
									{isFriend ? 'Remove from friend' : 'Add to friend'}
								</button>
							</div>
						)
					})}
				</div>
			)}
		</div>
	)
}
