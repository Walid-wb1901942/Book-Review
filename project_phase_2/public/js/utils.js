const getUUID = () =>
	Math.random().toString(36).substring(2) + Date.now().toString(36);

const getRandomNumber = max => {
	return Math.floor(1 + Math.random() * max);
};
