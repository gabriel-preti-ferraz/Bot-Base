
module.exports = async (client) => {
    const status = [
		'Base para criação de BOTS.js',
	];
	i = 0;
	client.user.setActivity(status[0]);
	client.user.setStatus('online');
	console.log('🪐 ' + client.user.username + ' online!');
};

