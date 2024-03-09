'use client'

import { fetchClient } from '@/$api/api.fetch'
import { Field } from '@/components/ui/Field/Filed'
import { Loader } from '@/components/ui/loader/Loader'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import ChatListItem from './ChatListItem'
import { useAuth } from '@/hooks/useAuth'
import { useDebounce } from '@/hooks/useDebounce'
import { IUser } from '@/types/user.types'
import { IChat } from '@/types/chat.types'

export default function ChatList() {
	const { user, isLoggedIn } = useAuth()

	const [searchTerm, setSearchTerm] = useState('')
	const debounceSearchTerm = useDebounce(searchTerm)

	const { data, isLoading } = useQuery({
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
		<div className='min-w-[40px]'>
			<div className='border-t border-b border-border p-layout sm:hidden'>
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
						return <ChatListItem key={chat.id} chat={chat} />
					})
				) : (
					<p className='p-layout'>Chats not found!</p>
				)}
			</div>
		</div>
	)
}
