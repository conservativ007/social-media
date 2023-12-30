import { IUser } from './user.types'

export interface IMessage {
	id: string
	text: string
	createdAt: string
	sender: IUser
}

export interface IChat {
	createdAt: string
	messages: IMessage[]
	participants: IUser[]
}

export interface IstrapiChat {
	messages: { data: IStrapiResponse<IMessage>[] }
	participants: { data: IStrapiResponse<IUser>[] }
}

export interface IStrapiResponse<T> {
	attributes: T
	id: number
}
