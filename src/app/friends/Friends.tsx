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
		<div>
			<h1 className='p-layout'>People</h1>
			{isLoading || isFetching ? (
				<div className='p-layout'>
					<Loader />
				</div>
			) : (
				<div className=' grid grid-cols-3 gap-3'>
					{data?.map(user => {
						const isFriend = authUser?.friends?.some(u => u.id === user.id)

						return (
							<div
								key={user.id}
								className='text-center p-layout border border-border max-w-[300px]'
							>
								<Image
									src={getImageUrl(user.avatar?.url) || '/avatar1.png'}
									alt='user-avatar'
									width={50}
									height={50}
									className='mx-auto'
								/>
								<p className='mt-3 text-xl font-medium sm:text-sm '>
									{user.username}
								</p>
								<button className='border-b border-white transition-colors hover:border-primary cursor-pointer mt-2 sm:text-sm'>
									{isFriend ? 'Remove friend' : 'Add friend'}
								</button>
							</div>
						)
					})}
				</div>
			)}
		</div>
	)
}
