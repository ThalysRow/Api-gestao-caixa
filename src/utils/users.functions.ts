export const formateData = (data: string) => {
	const formated = data.trim().toLowerCase().split(' ')

	for (let i = 0; i < formated.length; i++) {
		formated[i] =
			formated[i][0].toUpperCase() + formated[i].slice(1).toLowerCase()
	}

	return formated.join(' ')
}
