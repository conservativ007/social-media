import Chat from '@/components/screens/chats/chat/Chat'
import ChatList from '@/components/screens/chats/list/ChatList'
import CurrentUser from '@/components/screens/chats/CurrentUser'
import Image from 'next/image'

export default function ChatsPage() {
	return (
		<div className='grid h-full' style={{ gridTemplateColumns: '.7fr 3fr' }}>
			<div className='border-r border-l border-border'>
				<CurrentUser />
				<ChatList />
			</div>
			<div>
				<Chat />
			</div>
		</div>
	)
}
