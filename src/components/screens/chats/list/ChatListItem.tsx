'use client'

import { useAuth } from '@/hooks/useAuth'
import {
	IChat,
	IstrapiChat,
	IstrapiChat2
	// IstrapiChat
} from '@/types/chat.types'
import { IUser } from '@/types/user.types'
import React from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'
import { getImageUrl } from '@/app/config/get-image-url.config'
import Link from 'next/link'

interface IChatListItem {
	// data: IstrapiChat2
	// id: number
	chat: IChat
}

export default function ChatListItem({ chat }: IChatListItem) {
	const { user } = useAuth()

	// console.log('chat')
	// console.log(chat)

	// if (chat === undefined) return null

	const correspondent = chat.participants.find(u => u.email !== user?.email)
	const lastMessage = chat.messages.at(-1)

	// console.log('correspondent')
	// console.log(correspondent)

	return (
		// <div className='p-layout flex items-center'>
		<Link
			href={`/chat/${chat.id}`}
			className='p-layout flex items-center border-b border-border duration-100 ease-linear transition-colors hover:bg-border animation-slide-fade'
		>
			<Image
				src={getImageUrl(correspondent?.avatar?.url) || '/avatar1.png'}
				alt='avatar'
				width={40}
				height={40}
				className='mr-4'
			/>
			<div className='w-full'>
				<div className='flex justify-between items-center'>
					<span>{correspondent?.username}</span>
					<span className='text-xs opacity-30'>
						{dayjs(lastMessage?.createdAt).format('HH:mm')}
					</span>
				</div>
				<div className='opacity-30 mt-0.5'>{lastMessage?.text}</div>
			</div>
		</Link>
		// </div>
	)
}
