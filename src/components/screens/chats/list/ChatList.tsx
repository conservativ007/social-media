'use client'

import { fetchClient } from '@/$api/api.fetch'
import { Field } from '@/components/ui/Field/Filed'
import { Loader } from '@/components/ui/loader/Loader'
import { IChat } from '@/types/chat.types'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ChatListItem from './ChatListItem'
import { useAuth } from '@/hooks/useAuth'
import { useDebounce } from '@/hooks/useDebounce'

export default function ChatList() {
	const { user, isLoggedIn } = useAuth()

	const [searchTerm, setSearchTerm] = useState('')
	const debounceSearchTerm = useDebounce(searchTerm)

	// console.log(user)

	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['chats', debounceSearchTerm],
		queryFn: () =>
			fetchClient.get<{ data: IChat[] }>(
				`/chats?sort=createdAt:desc
					&populate[messages]=*
					&populate[participants][populate][avatar]=*
					&filters[participants][email][$eq]=${user?.email}
					&filters[$or][0][participants][username][$contains]=${debounceSearchTerm}
					&filters[$or][1][messages][text][$contains]=${debounceSearchTerm}
					`,

				undefined,
				true
			),
		enabled: isLoggedIn
	})

	return (
		<div>
			<div className='border-t border-b border-border p-layout'>
				<Field
					placeholder='Search chats'
					Icon={Search}
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
				/>
			</div>
			<div>
				{isLoading ? (
					<div className='p-layout'>
						<Loader />
					</div>
				) : data?.data?.length ? (
					data?.data.map(chat => {
						// console.log('participants')
						// console.log(participants)

						// const chat = {
						// 	messages,
						// 	participants
						// }
						// return <div></div>
						return <ChatListItem key={chat.id} chat={chat} />
					})
				) : (
					<p className='p-layout'>Chats not found!</p>
				)}
			</div>
		</div>
	)
	// return (
	// 	<div>
	// 		<div className='border-t border-b border-border p-layout'>
	// 			<Field placeholder='Search chats' Icon={Search} />
	// 		</div>
	// 		<div>
	// 			{isLoading ? (
	// 				<div className='p-layout'>
	// 					<Loader />
	// 				</div>
	// 			) : data?.data.length ? (
	// 				data?.data.map(({ id, attributes: chat }) => {
	// 					console.log('chat')
	// 					console.log(chat)
	// 					return <ChatListItem key={id} data={chat} />
	// 				})
	// 			) : (
	// 				<p className='p-layout'>Chats not found!</p>
	// 			)}
	// 		</div>
	// 	</div>
	// )
}
