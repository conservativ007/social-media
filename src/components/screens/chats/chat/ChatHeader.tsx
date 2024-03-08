import { Search } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import { IUser } from '@/types/user.types'
import { getImageUrl } from '@/app/config/get-image-url.config'

export function ChatHeader({ correspondent }: { correspondent?: IUser }) {
	return (
		<div className='p-layout flex items-center justify-between border-border border-t sm:flex-shrink-0'>
			<div className='flex items-center'>
				<Image
					src={getImageUrl(correspondent?.avatar?.url) || '/no-avatar.png'}
					alt='avatar'
					width={50}
					height={50}
					className='mr-4'
				/>

				<div className='text-sm'>
					<div>{correspondent?.username}</div>
					<div className='opacity-30'>2 members</div>
				</div>
			</div>
			<button className='text-[#7C7275] hover:text-white transition-colors'>
				<Search />
			</button>
		</div>
	)
}
