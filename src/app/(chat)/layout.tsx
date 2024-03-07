'use client'

import CurrentUser from '@/components/screens/chats/CurrentUser'
import ChatList from '@/components/screens/chats/list/ChatList'
import { PropsWithChildren } from 'react'

export default function ChatLayout({ children }: PropsWithChildren) {
	return (
		<div className='grid h-full' style={{ gridTemplateColumns: '.7fr 5fr' }}>
			<div
				className={`border-r border-l border-border md:max-w-[200px] sm:max-w-[40px]`}
			>
				<CurrentUser />
				<ChatList />
			</div>
			{children}
		</div>
	)
}
