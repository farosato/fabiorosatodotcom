/** @type {import('./__types/items').RequestHandler} */
export async function post({ request }) {
	const REVUE_API_KEY = process.env['REVUE_API_KEY'];
	const requestData = await request.json();

	try {
		const res = await fetch('https://www.getrevue.co/api/v2/subscribers', {
			method: 'POST',
			headers: {
				Authorization: `Token ${REVUE_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: requestData.email,
				double_opt_in: true
			})
		});
		if (res.ok) {
			return {
				status: 200
			};
		} else {
			return {
				status: 400,
				body: await res.json()
			};
		}
	} catch (error) {
		return {
			status: 500,
			body: JSON.stringify({
				error: 'Something went wrong with the email submit.'
			})
		};
	}
}
