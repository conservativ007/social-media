import { IUser } from './user.types'

export interface IMessage {
	id: number
	text: string
	createdAt: string
	sender: IUser
}

export interface IChat {
	id: number
	// createdAt: string
	messages: IMessage[]
	participants: IUser[]
}

export interface IstrapiChat {
	id: number
	messages: { data: IMessage[] }
	participants: { data: IUser[] }
}

export interface IstrapiChat2 {
	messages: IMessage[]
	participants: IUser[]
}

export interface IStrapiResponse<T> {
	attributes: T
	id: number
}
