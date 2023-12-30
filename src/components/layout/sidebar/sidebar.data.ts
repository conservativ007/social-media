import { LINKS } from '@/constants/links'
import { MessagesSquare, Phone, Settings, Users2 } from 'lucide-react'

export const MENU = [
	{
		url: LINKS.friends,
		icon: Users2
	},
	{
		url: LINKS.calls,
		icon: Phone
	},
	{
		url: '/',
		icon: MessagesSquare
	},
	{
		url: LINKS.settings,
		icon: Settings
	}
]
