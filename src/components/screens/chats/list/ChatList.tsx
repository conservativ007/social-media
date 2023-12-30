'use client'

import { fetchClient } from '@/$api/api.fetch'
import { Field } from '@/components/ui/Field/Filed'
import { Loader } from '@/components/ui/loader/Loader'
import { IChat, IStrapiResponse, IstrapiChat } from '@/types/chat.types'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import React, { useEffect } from 'react'
import ChatListItem from './ChatListItem'
import { IUser } from '@/types/user.types'
import { useAuth } from '@/hooks/useAuth'

export default function ChatList() {
	const { user } = useAuth()

	// console.log(user?.email)
	// [populate][avatar]

	const { data, isLoading } = useQuery({
		queryKey: ['chats'],
		queryFn: () =>
			fetchClient
				.get<{ data: IStrapiResponse<IstrapiChat>[] }>(
					`/chats?sort=createdAt:desc
					&populate[messages]=*
					&populate[participants][populate][avatar]=*
					&filters[participants][email][$eq]=test@email.com`,
					undefined,
					true
				)
				.then(response => response)
	})

	if (data === undefined) return null
	// console.log(data.data)

	// console.log(42)

	return (
		<div>
			<div className='border-t border-b border-border p-layout'>
				<Field placeholder='Search chats' Icon={Search} />
			</div>
			<div>
				{isLoading ? (
					<div className='p-layout'>
						<Loader />
					</div>
				) : data?.data.length ? (
					data?.data.map(({ id, attributes: chat }) => {
						// console.log(chat)
						return <ChatListItem key={id} data={chat} />
					})
				) : (
					<p className='p-layout'>Chats not found!</p>
				)}
			</div>
		</div>
	)
}
