import { IChat, IStrapiResponse } from './chat.types'

export type IUser = {
	id: number
	username: string
	email: string
	confirmed: boolean
	role: string
	friends: IUser[]
	avatar: {
		url: string
		// data: IStrapiResponse<{ url: string }>
	} | null
}

export type UserJwt = {
	user: IUser
	jwt: string
}
