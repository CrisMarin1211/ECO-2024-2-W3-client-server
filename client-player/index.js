document.querySelectorAll('img[data-move]').forEach((img) => {
	img.addEventListener('click', (event) => {
		const playerName = document.getElementById('player-name').value;
		const playerMove = event.target.getAttribute('data-move');

		if (playerName) {
			createUser(playerName, playerMove);
		} else {
			alert('Por favor ingresa tu nombre antes de seleccionar un movimiento.');
		}
	});
});

async function createUser(name, move) {
	renderLoadingState();
	try {
		const player = {
			name: name,
			move: move,
			profilePicture: 'https://avatar.iran.liara.run/public/13',
		};
		const response = await fetch('http://localhost:5050/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(player),
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		renderData(player);
	} catch (error) {
		renderErrorState();
	}
}

function renderErrorState() {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Clear previous data
	container.innerHTML = '<p>Failed to load data</p>';
	console.log('Failed to load data');
}

function renderLoadingState() {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Clear previous data
	container.innerHTML = '<p>Loading...</p>';
	console.log('Loading...');
}

function renderData(player) {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Clear previous data
	const div = document.createElement('div');
	div.className = 'item';
	div.innerHTML = `Player ${player.name} chose ${player.move}`;
	container.appendChild(div);
}
