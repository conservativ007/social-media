import type { Config } from 'tailwindcss'

const config: Config = {
	important: true,
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				white: '#efeff3',
				border: 'rgba( 255, 255, 255,.12)',
				primary: '#6f3aff'
			},
			padding: {
				layout: '1.25rem'
			},
			transitionDuration: {
				DEFAULT: '444ms'
			},
			transitionTimingFunction: {
				DEFAULT: 'ease-linear'
			}
		},
		screens: {
			xl: { max: '1279px' },
			// => @media (max-width: 1279px) { ... }

			lg: { max: '1023px' },
			// => @media (max-width: 1023px) { ... }

			md: { max: '767px' },
			// => @media (max-width: 767px) { ... }

			sm: { max: '639px' }
			// => @media (max-width: 639px) { ... }
		}
	},
	plugins: []
}
export default config
