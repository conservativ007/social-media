'use client'

import { fetchClient } from '@/$api/api.fetch'
import { Field } from '@/components/ui/Field/Filed'
import { useAuth } from '@/hooks/useAuth'
import { useReactQuerySubscription } from '@/hooks/useReactQuerySubscription'
import { useMutation } from '@tanstack/react-query'
import { ArrowRightToLine, Send } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

export function MessagesField() {
	const [message, setMessage] = useState('')
	const { user } = useAuth()

	const send = useReactQuerySubscription()

	const { id } = useParams()
	const { mutate } = useMutation({
		mutationKey: ['update chat'],
		mutationFn: () =>
			fetchClient.post('/messages', {
				data: {
					text: message,
					sender: user?.id,
					chat: id
				}
			}),
		onSuccess() {
			send({
				operation: 'invalidate',
				entity: 'chat',
				id: id.toString()
			})
			setMessage('')
		}
	})

	const onSubmit = () => {
		if (!message) return

		mutate()
	}

	return (
		<div className='border-t border-border p-layout flex items-center justify-between sm:fixed bottom-0 left-0 right-0'>
			<div className='sm:max-w-[360px] sm:ml-auto sm:mr-auto flex'>
				<Field
					placeholder='Write a message...'
					Icon={ArrowRightToLine}
					value={message}
					onChange={e => setMessage(e.target.value)}
					className='w-4/5'
					onKeyDown={e => {
						if (e.key === 'Enter') onSubmit()
					}}
				/>
				<button
					className='hover:text-primary transition-colors'
					onClick={onSubmit}
					disabled={!message}
				>
					<Send />
				</button>
			</div>
		</div>
	)
}
