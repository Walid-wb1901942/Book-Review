const authorize = role => {
	const user = JSON.parse(localStorage.getItem('user'));
	if (!user || user.role !== role) location.href = '/';
};
