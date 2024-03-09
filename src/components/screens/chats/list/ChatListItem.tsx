'use client'

import { useAuth } from '@/hooks/useAuth'
import { IChat } from '@/types/chat.types'
import React from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'
import { getImageUrl } from '@/app/config/get-image-url.config'
import Link from 'next/link'

interface IChatListItem {
	chat: IChat
}

export default function ChatListItem({ chat }: IChatListItem) {
	const { user } = useAuth()

	const correspondent = chat.participants.find(u => u.email !== user?.email)
	const lastMessage = chat.messages.at(-1)

	return (
		<Link
			href={`/chat/${chat.id}`}
			className='h-[96px] p-layout flex items-center sm:justify-center border-b border-border duration-100 ease-linear transition-colors hover:bg-border animation-slide-fade sm:p-0 sm:h-[70px] sm:border-b-0'
		>
			<Image
				src={getImageUrl(correspondent?.avatar?.url) || '/no-avatar.png'}
				alt='avatar'
				width={40}
				height={40}
				className='mr-4 w-[40px] sm:w-[30px] h-[40px] sm:h-[30px] sm:mr-0'
			/>
			<div className='w-full sm:hidden'>
				<div className='flex justify-between items-center'>
					<span>{correspondent?.username}</span>
					<span className='text-xs opacity-30'>
						{dayjs(lastMessage?.createdAt).format('HH:mm')}
					</span>
				</div>
				<div className=' opacity-30 mt-0.5'>{lastMessage?.text}</div>
			</div>
		</Link>
	)
}
