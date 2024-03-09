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

	return (
		<div
			className={`border-r border-border sm:min-w-[293px] flex flex-col`}
			style={{ gridTemplateRows: isLoading ? '1fr .1fr' : '.6fr 6fr .6fr' }}
		>
			{isLoading ? (
				<div className='flex items-center justify-center'>
					<Loader />
				</div>
			) : (
				<>
					<ChatHeader correspondent={correspondent} />
					<div className='p-layout border-t border-border overflow-auto sm:h-[calc(100vh-220px)] sm:min-w-[293px] h-[calc(100vh-160px)]'>
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
