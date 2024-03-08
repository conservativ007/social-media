'use client'

import cn from 'clsx'

import { Sun } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import styles from './Sidebar.module.scss'
import Link from 'next/link'
import { MENU } from './sidebar.data'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export function Sidebar() {
	const pathName = usePathname()
	const { isLoggedIn } = useAuth()

	return (
		<aside className={styles.sidebar}>
			{isLoggedIn === true ? (
				<>
					<Image
						src='/logo.svg'
						priority
						alt=''
						width={45}
						height={45}
						className='sm:w-[30px] sm:h-[30px]'
					/>
					<div className='sm:flex'>
						{MENU.map(item => (
							<Link
								key={item.url}
								href={item.url}
								className={cn({
									[styles.active]: pathName === item.url
								})}
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
