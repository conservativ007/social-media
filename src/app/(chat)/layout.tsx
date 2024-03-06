import CurrentUser from '@/components/screens/chats/CurrentUser'
import ChatList from '@/components/screens/chats/list/ChatList'
import { Component, PropsWithChildren } from 'react'

export default function ChatLayout({ children }: PropsWithChildren) {
	return (
		<div className='grid h-full' style={{ gridTemplateColumns: '.7fr 3fr' }}>
			<div className='border-r border-l border-border'>
				<CurrentUser />
				<ChatList />
			</div>
			<div>{children}</div>
		</div>
	)
}
