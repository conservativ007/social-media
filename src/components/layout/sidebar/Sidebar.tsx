'use client'

import { headers } from 'next/headers'

import cn from 'clsx'

import { MessagesSquare, Phone, Settings, Sun, Users2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import styles from './Sidebar.module.scss'
import Link from 'next/link'
import { LINKS } from '@/constants/links'
import { MENU } from './sidebar.data'
import { getServerPathName } from '@/server-actions/get-path-name'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export function Sidebar() {
	const pathName = usePathname()
	const { isLoggedIn } = useAuth()

	// console.log(pathName)

	// if (isLoggedIn === false) return null

	// console.log(headerUrl?.split('/').slice(3).join('/'))

	return (
		// <aside className='flex items-center flex-col jusify-between'>
		<aside className={styles.sidebar}>
			{isLoggedIn === true ? (
				<>
					<Image src='/logo.svg' priority alt='' width={45} height={45} />
					<div>
						{MENU.map(item => (
							<Link
								key={item.url}
								href={item.url}
								className={cn({
									[styles.active]: pathName === item.url
								})}
								// className={pathName === item.url ? 'active' : ''}
							>
								<item.icon size={27} />
							</Link>
						))}
					</div>
					<Sun size={35} />
				</>
			) : null}
		</aside>
	)
}
