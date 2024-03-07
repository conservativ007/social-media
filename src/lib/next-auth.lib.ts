import { IAuthFormState } from '@/components/screens/auth/auth.types'
import NextAuth, { User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { fetchClient } from '@/$api/api.fetch'
import { IUser, UserJwt } from '@/types/user.types'

export default NextAuth({
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: 'Credentials',
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: { type: 'text' },
				email: { type: 'text' },
				password: { type: 'password' }
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) return null
				// Add logic here to look up the user from the credentials supplied
				// const { email, password } = credentials
				if (credentials.username) {
					try {
						const data = await fetchClient.post<UserJwt>(
							`auth/local/register`,
							credentials
						)
						console.log('register', data)
						return {
							id: data.user.id.toString(),
							email: data.user.email,
							avatar: data.user.avatar?.url,
							name: data.user.username,
							jwt: data.jwt
						} as User
					} catch (e) {
						return Promise.reject({ message: 'Register error, not valid data' })
					}

					return null
				}

				// credentials.identifier = 'test@email.com'

				try {
					const data = await fetchClient.post<UserJwt>(`/auth/local`, {
						identifier: credentials.email,
						password: credentials.password
					})

					console.log('login')
					// console.log(req.body)
					console.dir(data, { depth: null })
					return {
						id: data.user.id.toString(),
						email: data.user.email,
						avatar: data.user.avatar?.url,
						name: data.user.username,
						jwt: data.jwt
					} as User
				} catch (e) {
					return Promise.reject({ message: 'Login error, not valid data' })
				}

				// const data = await fetchClient.get<IUser[]>(
				// 	`/users?filters[email][$eq]=${email}`
				// )

				return null
			}
		})
	],
	callbacks: {
		jwt({ token, user, account }) {
			// console.log('-----------JWT----------')
			// console.log('token')
			// console.log(token)
			// console.log('user')
			// console.log(user)
			// console.log('account')
			// console.log(account)
			// console.log('---------------------')

			return { ...token, ...user }
		},
		session({ session, token, user }) {
			// session.jwt = token.jwt
			// console.log('-----------SESSION----------')
			// console.log('session')
			// console.log(session)
			// console.log('token')
			// console.log(token)
			// console.log('user')
			// console.log(user)

			session.user = token as User

			// session.token = token.token
			// session.id = user.id

			return session
		}

		// session: async (session, user) => {
		// 	session.jwt = user.jwt
		// 	session.id = user.id
		// 	return Promise.resolve(session)
		// },
		// jwt: async (token, user, account) => {
		// 	const isSignIn = user ? true : false
		// 	if (isSignIn) {
		// 		const response = await fetch(
		// 			`${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account?.accessToken}`
		// 		)
		// 		const data = await response.json()
		// 		token.jwt = data.jwt
		// 		token.id = data.user.id
		// 	}
		// 	return Promise.resolve(token)
		// }
	}
})
