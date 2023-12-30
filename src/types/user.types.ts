import { IChat, IStrapiResponse } from './chat.types'

export type IUser = {
	username: string
	email: string
	confirmed: boolean
	role: string
	avatar: {
		data: IStrapiResponse<{ url: string }>
	}
}

export type UserJwt = {
	user: IUser
	jwt: string
}
