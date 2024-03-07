import { fetchClient } from '@/$api/api.fetch'
import { IUser } from '@/types/user.types'
import { useQuery } from '@tanstack/react-query'

export function useProfile() {
	const query = '/users/me?populate=avatar&populate=friends'

	return useQuery({
		queryKey: ['profile'],
		queryFn: () => fetchClient.get<IUser>(query, undefined, true)
	})
}
