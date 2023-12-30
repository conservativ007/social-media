class FetchClient {
	private defaultHeaders: Record<string, string>
	private API_URL = process.env.API_URL as string

	constructor(defaultHeaders: Record<string, string> = {}) {
		this.defaultHeaders = defaultHeaders
	}

	private async performFetch<T>(
		endpoint: string,
		method: string,
		body?: Record<string, any>,
		customHeaders?: Record<string, string>,
		isAuth: boolean = false
	): Promise<T> {
		try {
			const headers: Record<string, string> = {
				'Content-Type': 'application/json',
				...this.defaultHeaders,
				...customHeaders
			}

			if (isAuth) {
				const token = localStorage.getItem('token')
				if (token) {
					headers['Authorization'] = `Bearer ${token}`
				}
			}

			// console.log('headers')
			// console.log(headers)

			const response = await fetch(`${this.API_URL}${endpoint}`, {
				method,
				headers,
				credentials: 'include',
				body: body ? JSON.stringify(body) : undefined
			})

			const data = await response.json()

			// console.log('const data = await response.json()')
			// console.log(data)

			if (data.errors) {
				console.error('Fetch errors:', data.errors)
				throw new Error('Fetch errors:' + JSON.stringify(data.errors))
			} else {
				return data
			}
		} catch (error) {
			console.error('Fetch error:', error)
			throw error
		}
	}

	async get<T>(
		endpoint: string,
		customHeaders?: Record<string, string>,
		isAuth: boolean = false
	): Promise<T> {
		return this.performFetch<T>(
			endpoint,
			'GET',
			undefined,
			customHeaders,
			isAuth
		)
	}

	async post<T>(
		endpoint: string,
		body?: Record<string, any>,
		customHeaders?: Record<string, string>,
		isAuth: boolean = false
	): Promise<T> {
		return this.performFetch<T>(endpoint, 'POST', body, customHeaders, isAuth)
	}
}

export const fetchClient = new FetchClient()
