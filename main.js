async function getPokemon() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        const data = await response.json();

        const pokemonPromises = data.results.map(pokemon =>
            fetch(pokemon.url).then(res => res.json())
        );
        const pokemonDataList = await Promise.all(pokemonPromises);

        const container = document.getElementById('pokemon-container');

        pokemonDataList.forEach(pokemonData => {
            const card = document.createElement('div');
            card.classList.add('pokemon-card');

            card.innerHTML = `
                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                <h2>${pokemonData.name}</h2>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error:', error);

        const container = document.getElementById('pokemon-container');
        container.innerHTML = '<p>Ocurrió un error al cargar los datos.</p>';
    }
}

getPokemon();
