import type { Metadata } from 'next'
import React from 'react'
import { Friends } from './Friends'

export const metadata: Metadata = {
	title: 'Friends'
}

export default function FriendsPage() {
	return <Friends />
}
