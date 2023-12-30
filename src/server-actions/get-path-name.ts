'use server'

import { headers } from 'next/headers'

export const getServerPathName = () => {
	const headersList = headers()
	const referer = headersList.get('referer')
	return referer
}
