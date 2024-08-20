let timeLeft = 10; // Tiempo en segundos

function startTimer() {
	timeLeft = 10; // Reiniciar el tiempo a 10 segundos
	document.getElementById('timer').textContent = `Tiempo restante: ${timeLeft}s`;

	intervalId = setInterval(() => {
		timeLeft--;
		document.getElementById('timer').textContent = `Tiempo restante: ${timeLeft}s`;

		if (timeLeft <= 0) {
			clearInterval(intervalId); // Detener el contador cuando llegue a 0
			fetchData(); // Llamar a fetchData para actualizar la pantalla con las nuevas jugadas
		}
	}, 1000); // Actualizar cada segundo
}

async function fetchData() {
	renderLoadingState();
	try {
		const response = await fetch('http://localhost:5050/users');
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		renderData(data);
		startTimer(); // Reiniciar el contador después de actualizar los datos
	} catch (error) {
		console.error(error);
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

function renderData(data) {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Clear previous data

	if (data.players.length > 0) {
		data.players.forEach((player) => {
			const div = document.createElement('div');
			div.className = 'item';

			let moveImage = '';
			if (player.move === 'Piedra') {
				moveImage =
					'https://static.vecteezy.com/system/resources/previews/012/896/738/original/stone-transparent-background-free-png.png';
			} else if (player.move === 'Papel') {
				moveImage =
					'https://png.pngtree.com/png-clipart/20231004/original/pngtree-crumpled-paper-isolated-png-image_13098065.png';
			} else if (player.move === 'Tijera') {
				moveImage =
					'https://static.vecteezy.com/system/resources/previews/009/664/151/non_2x/scissor-icon-transparent-free-png.png';
			}

			div.innerHTML = `
        <p><strong>${player.name}</strong></p>
        <img src="${moveImage}" alt="${player.move}" />
      `;
			container.appendChild(div);
		});
	} else {
		container.innerHTML = '<p>No hay jugadores registrados aún.</p>';
	}
}

// Iniciar la primera vez
startTimer();
