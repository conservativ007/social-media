export const generateRandomName = () => {
	const adjectives = ['Red', 'Blue', 'Green', 'Happy', 'Funny', 'Fast', 'Brave']
	const nouns = ['Dog', 'Cat', 'Bird', 'Elephant', 'Lion', 'Monkey', 'Tiger']

	const randomAdjective =
		adjectives[Math.floor(Math.random() * adjectives.length)]
	const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]

	const randomName = `${randomAdjective} ${randomNoun}`
	return randomName
}
