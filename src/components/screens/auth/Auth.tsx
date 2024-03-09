'use client'

import { Field } from '@/components/ui/Field/Filed'
import { Button } from '@/components/ui/button/Button'
import { AtSign, Key } from 'lucide-react'
import React, { useState } from 'react'
import { IAuthFormState } from './auth.types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { generateRandomName } from '@/utils/generateRandomName'
import toast from 'react-hot-toast'

interface IAuth {
	type?: 'Login' | 'Register'
}

function Auth({ type }: IAuth) {
	const [loading, setIsLoading] = useState(false)
	const { register, handleSubmit } = useForm<IAuthFormState>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IAuthFormState> = async data => {
		setIsLoading(true)

		const someData =
			type === 'Login'
				? {
						redirect: false,
						...data
				  }
				: {
						redirect: false,
						...data,
						username: generateRandomName()
				  }

		const response = await signIn('credentials', someData)

		if (response?.error) {
			toast.error(response.error)
			setIsLoading(false)
			return
		}

		setIsLoading(false)
		window.location.href = '/'
	}

	return (
		<div className='flex h-full'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='m-auto block w-96 border border-border p-8'
			>
				<h1 className='text-center mb-10'>{type}</h1>
				<Field
					{...register('email', { required: true })}
					placeholder='Enter email'
					type='email'
					Icon={AtSign}
					className='mb-7'
					value={'maks@email.com'}
				/>
				<Field
					{...register('password', { required: true })}
					placeholder='Enter password'
					type='password'
					Icon={Key}
					className='mb-12'
					value={'123456'}
				/>
				<div className='text-center'>
					<Button type='submit' isLoading={loading}>
						{type}
					</Button>
				</div>
			</form>
		</div>
	)
}

export default Auth
