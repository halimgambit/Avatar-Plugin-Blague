exports.action = function(data, callback){

	let client = setClient(data);
	info("Blague from:", data.client, "To:", client);
	blague (data, client);
	callback();
}

function blague (data, client) {

	fetch('https://blague.xyz/api/joke/random')
	.then(response => {
	if (response.status !== 200) {
	throw new Error(`La connexion à échoué, code erreur: ${response.status}`);
	}
	return response.json();
	})
	.then(response2 => {
        info(`${response2.joke.question}! ${response2.joke.answer}!`);
	Avatar.speak(`${response2.joke.question} ! ${response2.joke.answer}!`, data.client, () => { 
	Avatar.Speech.end(data.client);
	});
    })
	.catch(err => {
	info(`Je n'arrive pas accéder au site de blague, ${err.message}`);
	Avatar.speak(`Je n'arrive pas accéder au site de blague, ${err}`, data.client, () => { 
	Avatar.Speech.end(data.client);
	});
	});

}

function setClient (data) {
	var client = data.client;
	if (data.action.room)
	client = (data.action.room != 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
    if (data.action.setRoom)
	client = data.action.setRoom;
	return client;
}
