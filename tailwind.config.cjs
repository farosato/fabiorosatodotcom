module.exports = {
	content: [
		'./src/**/*.svelte',
		// may also want to include HTML files
		'./src/**/*.html'
	],
	darkMode: 'class',
	theme: {
		extend: {
			typography: (theme) => ({
				DEFAULT: {
					css: {
						'--tw-prose-bullets': theme('colors.black'),
						// these customizations are explained here https://youtu.be/-FzemNMcOGs
						blockquote: {
							borderLeft: '3px solid red',
							fontSize: 'inherit',
							fontStyle: 'inherit',
							fontWeight: 'medium'
						},
						'blockquote p:first-of-type::before': {
							content: ''
						},
						'blockquote p:last-of-type::after': {
							content: ''
						},

						'code::before': false,
						'code::after': false,
						code: {
							'border-radius': '0.25rem',
							padding: '0.15rem 0.3rem',
							borderWidth: '2px',
							borderColor: 'rgba(0,0,0,0.1)'
						},
						'a code': {
							color: 'unset'
						},
						'li, ul, ol': {
							marginTop: 10,
							marginBottom: 10
						},
						'p + ul, p + ol': {
							marginTop: -10
						},
						'li > img': {
							margin: 0,
							display: 'inline'
						},
						'ol > li::marker': {
							color: 'var(--tw-prose-body)'
						},
						'ul > li::marker': {
							color: 'var(--tw-prose-body)'
						},
						img: {
							marginLeft: 'auto',
							marginRight: 'auto'
						},
						// style img in table + caption hack
						'thead img': {
							marginTop: 0,
							marginBottom: 8
						},
						// style image caption with ![image] + em hack
						'p > img + em': {
							display: 'block',
							textAlign: 'center',
							marginTop: '-1rem',
							fontSize: '0.875rem' /* 14px */,
							lineHeight: '1.25rem' /* 20px */
						}
					}
				}
			})
		}
	},
	variants: {},
	plugins: [require('@tailwindcss/typography')]
};
