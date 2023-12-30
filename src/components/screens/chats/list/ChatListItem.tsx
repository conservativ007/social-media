'use client'

import { useAuth } from '@/hooks/useAuth'
import { IChat, IstrapiChat } from '@/types/chat.types'
import { IUser } from '@/types/user.types'
import React from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'
import { getImageUrl } from '@/app/config/get-image-url.config'

interface IChatListItem {
	data: IstrapiChat
}

export default function ChatListItem({ data: chat }: IChatListItem) {
	const { user } = useAuth()

	const correspondent = chat.participants.data.find(
		u => u.attributes.email !== user?.email
	)
	const lastMessage = chat.messages.data.at(-1)

	return (
		<div className='p-layout flex items-center'>
			<Image
				src={
					getImageUrl(correspondent?.attributes.avatar.data.attributes.url) ||
					'/avatar1.png'
				}
				alt='avatar'
				width={40}
				height={40}
				className='mr-4'
			/>
			<div className='w-full'>
				<div className='flex justify-between items-center'>
					<span>{correspondent?.attributes.username}</span>
					<span className='text-xs opacity-30'>
						{dayjs(lastMessage?.attributes.createdAt).format('HH:mm')}
					</span>
				</div>
				<div className='opacity-30'>{lastMessage?.attributes.text}</div>
			</div>
		</div>
	)
}
