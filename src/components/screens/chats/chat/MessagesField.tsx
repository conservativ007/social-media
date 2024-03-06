'use client'

import { Field } from '@/components/ui/Field/Filed'
import { ArrowRightToLine, Send } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export function MessagesField() {
	const [message, setMessage] = useState('')

	const onSubmit = () => {
		if (!message) return
	}

	return (
		<div className='border-t border-border p-layout flex items-center justify-between'>
			<Field
				placeholder='Write a message...'
				Icon={ArrowRightToLine}
				value={message}
				onChange={e => setMessage(e.target.value)}
				className='w-4/5'
			/>
			<button
				className='hover:text-primary transition-colors'
				onClick={onSubmit}
				disabled={!message}
			>
				<Send />
			</button>
		</div>
	)
}
