'use client'

import React from 'react'
import { MessagesField } from './MessagesField'
import { useQuery } from '@tanstack/react-query'
import { fetchClient } from '@/$api/api.fetch'
import { IChat } from '@/types/chat.types'
import { Message } from './Message'
import { ChatHeader } from './ChatHeader'
import { useAuth } from '@/hooks/useAuth'
import { Loader } from '@/components/ui/loader/Loader'
// import { useUsersZustand } from '@/store/zustand'

export default function Chat({ id }: { id: string }) {
	const query = `/chats/${id}?populate[messages][populate][sender][populate][avatar]=*
	&populate[participants][populate][avatar]=*`

	const { data, isLoading } = useQuery({
		queryKey: ['chat', id],
		enabled: !!id,
		select: data => data.data,
		queryFn: () => fetchClient.get<{ data: IChat }>(query, undefined, true)
	})

	const { user } = useAuth()

	const correspondent = data?.participants.find(
		participant => participant.email !== user?.email
	)

	// const { setToFalse, setToTrue, showUsers } = useUsersZustand()

	return (
		<div
			className={`border-r border-border h-full grid `}
			style={{ gridTemplateRows: isLoading ? '1fr .1fr' : '.6fr 6fr .6fr' }}
		>
			{isLoading ? (
				<div className='flex items-center justify-center'>
					<Loader />
				</div>
			) : (
				<>
					<ChatHeader correspondent={correspondent} />
					<div className='p-layout border-t border-border'>
						{data?.messages.map(message => (
							<Message key={message.id} message={message} />
						))}
					</div>
					<MessagesField />
				</>
			)}
		</div>
	)
}
