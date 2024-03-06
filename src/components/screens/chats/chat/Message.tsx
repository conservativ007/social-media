import { useAuth } from '@/hooks/useAuth'
import { IMessage } from '@/types/chat.types'
import React from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'
import { getImageUrl } from '@/app/config/get-image-url.config'

export function Message({ message }: { message: IMessage }) {
	// return
	const { user } = useAuth()
	const isSender = user?.email === message.sender.email

	// console.log(user)

	return (
		<div
			className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-2.5`}
		>
			<div
				className={`relative flex items-center ${
					isSender ? 'flex-row-reverse' : ''
				}`}
			>
				<Image
					src={getImageUrl(message.sender.avatar?.url) || '/no-avatar.png'}
					alt='Avatar'
					className='rounded-full'
					width={45}
					height={45}
				/>
				<div
					className={`bg-gray-200 p-2 rounded-lg ${isSender ? 'mr-2' : 'ml-3'}`}
				>
					<p className='text-sm text-gray-800'>{message.text}</p>
					<span className='text-xs opacity-30 block mt-1 text-slate-950'>
						{dayjs(message.createdAt).format('HH:mm')}
					</span>
				</div>
			</div>
		</div>
	)
}
