import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		id?: string
		token?: string
		user?: User
	}

	interface User {
		email?: string
		username?: string
		avatar?: string
		id?: string
		jwt?: string
		friends?: User[]
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		token: string
	}
}
