const pokemonContainer = document.querySelector('.pokemon-list');
const pokemonSearch = document.querySelector('.pokemon-search');
const typeOneContainer = document.querySelector('.type-one');
const typeTwoContainer = document.querySelector('.type-two');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const pageDisplay = document.querySelector('.page');
const pokemonPanel = document.querySelector('.pokemon-panel');
let partialName = '';
const size = 10;
let pageIndex = 1;

async function getPokemon(partialName, typeOne, typeTwo, size, page) {
    const response = await fetch(`${baseUrl}/api/pkmn/search?partialName=${partialName}&typeOne=${typeOne}&typeTwo=${typeTwo}&size=${size}&page=${page}`);
    const pokemons = await response.json();
    let trainer = null
    if (localStorage.getItem('username')) {
        trainer = await fetchTrainerByUsername(localStorage.getItem('username'));
    }
    pokemons.data.forEach(pokemon => {
        const pokemonCard = document.createElement('pokemon-card');
        const pokemonName = document.createElement('h3');
        const pokemonSprite = document.createElement('img');
        pokemonName.textContent = pokemon.name;
        pokemonSprite.src = pokemon.imagePath;
        pokemonCard.appendChild(pokemonName);
        pokemonCard.appendChild(pokemonSprite);
        pokemon.types.forEach(type => {
            const pokemonType = document.createElement('img');
            pokemonType.src = `../assets/types/${type}.png`;
            pokemonType.classList.add('type-icon');
            pokemonType.addEventListener('click', async (event) => {
                if (!typeOneContainer.classList.contains('active') && typeTwoContainer.alt !== type) {
                    typeOneContainer.src = `../assets/types/min/${type}.png`;
                    typeOneContainer.alt = type;
                    typeOneContainer.classList.add('active');
                } else if (!typeTwoContainer.classList.contains('active') && typeOneContainer.alt !== type) {
                    typeTwoContainer.classList.add('active');
                    typeTwoContainer.src = `../assets/types/min/${type}.png`;
                    typeTwoContainer.alt = type;
                }
                pokemonContainer.innerHTML = '';
                getPokemon('', typeOneContainer.alt, typeTwoContainer.alt, size, 1);
            });
            pokemonCard.appendChild(pokemonType);
        });
        if (trainer) {
            if (trainer.pokemonCaptured.some(capturedPokemon => capturedPokemon.name === pokemon.name)) {
                pokemonCard.classList.add('captured');
                const capturedBadge = document.createElement('img');
                capturedBadge.src = '../assets/icons/pokeball.svg';
                capturedBadge.classList.add('capture-badge');
                pokemonCard.appendChild(capturedBadge);
            } else {
                pokemonCard.classList.add('uncaptured');
                const captureButton = document.createElement('img');
                captureButton.src = '../assets/icons/pokeball.svg';
                captureButton.classList.add('capture-button');
                captureButton.addEventListener('click', async (event) => {
                    const response = await fetch(`${baseUrl}/api/trainers/mark`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({ idTrainer: trainer._id, idPokemon: pokemon._id })
                    });
                    if (response.status === 200) {
                        pokemonCard.classList.remove('uncaptured');
                        pokemonCard.classList.remove('unseen');
                        pokemonName.textContent = pokemon.name;
                        captureButton.remove();
                        const capturedBadge = document.createElement('img');
                        capturedBadge.src = '../assets/icons/pokeball.svg';
                        capturedBadge.classList.add('capture-badge');
                        capturedBadge.classList.add('capturing');
                        pokemonCard.appendChild(capturedBadge);
                        const seenButton = pokemonCard.querySelector('.seen-button');
                        if (seenButton) {
                            seenButton.remove();
                        }
                        const seenBadge = pokemonCard.querySelector('.seen-badge');
                        if (seenBadge) {
                            seenBadge.remove();
                        }
                    }
                });
                pokemonCard.appendChild(captureButton);
                if (trainer.pokemonSeen.some(seenPokemon => seenPokemon.name === pokemon.name)) {
                    pokemonCard.classList.add('seen');
                    const seenBadge = document.createElement('img');
                    seenBadge.src = '../assets/icons/telescope.png';
                    seenBadge.classList.add('seen-badge');
                    pokemonCard.appendChild(seenBadge);
                } else {
                    pokemonCard.classList.add('unseen');
                    pokemonName.textContent = '???';
                    const seenButton = document.createElement('img');
                    seenButton.src = '../assets/icons/telescope.png';
                    seenButton.classList.add('seen-button');
                    seenButton.addEventListener('click', async (event) => {
                        const response = await fetch(`${baseUrl}/api/trainers/see`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            },
                            body: JSON.stringify({ idTrainer: trainer._id, idPokemon: pokemon._id })
                        });
                        if (response.status === 200) {
                            pokemonCard.classList.remove('unseen');
                            pokemonName.textContent = pokemon.name;
                            seenButton.remove();
                            const seenBadge = document.createElement('img');
                            seenBadge.src = '../assets/icons/telescope.png';
                            seenBadge.classList.add('seen-badge');
                            seenBadge.classList.add('seeing');
                            pokemonCard.appendChild(seenBadge);
                        }
                    });
                    pokemonCard.appendChild(seenButton);
                }
            }
        }
        pokemonSprite.addEventListener('click', async (event) => {
            let flag = 'captured';
            if (pokemonCard.classList.contains('uncaptured')) flag = 'uncaptured';
            if (pokemonCard.classList.contains('unseen')) flag = 'unseen';
            showPokemonDetails(pokemon, flag);
        });
        pokemonContainer.appendChild(pokemonCard);
    });
}

typeOneContainer.addEventListener('click', async (event) => {
    typeOneContainer.src = '';
    typeOneContainer.alt = '';
    typeOneContainer.classList.remove('active');
    pokemonContainer.innerHTML = '';
    pageIndex = 1;
    pageDisplay.textContent = 1;
    getPokemon(partialName, '', typeTwoContainer.alt, size, pageIndex);
});

typeTwoContainer.addEventListener('click', async (event) => {
    typeTwoContainer.src = '';
    typeTwoContainer.alt = '';
    typeTwoContainer.classList.remove('active');
    pokemonContainer.innerHTML = '';
    pageIndex = 1;
    pageDisplay.textContent = 1;
    getPokemon(partialName, typeOneContainer.alt, '', size, pageIndex);
});

pokemonSearch.addEventListener('input', async (event) => {
    partialName = event.target.value;
    pokemonContainer.innerHTML = '';
    pageIndex = 1
    pageDisplay.textContent = pageIndex;
    getPokemon(partialName, typeOneContainer.alt, typeTwoContainer.alt, size, pageIndex);
});

nextButton.addEventListener('click', async (event) => {
    pokemonContainer.innerHTML = '';
    pageIndex++;
    getPokemon(partialName, typeOneContainer.alt, typeTwoContainer.alt, size, pageIndex);
    pageDisplay.textContent = pageIndex;
});

previousButton.addEventListener('click', async (event) => {
    if (pageIndex > 1) {
        pokemonContainer.innerHTML = '';
        pageIndex--;
        getPokemon(partialName, typeOneContainer.alt, typeTwoContainer.alt, size, pageIndex);
        pageDisplay.textContent = pageIndex;
    }
});

async function fetchTrainerByUsername(username) {
    const response = await fetch(`${baseUrl}/api/trainers/search?username=${username}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    if (response.status === 200) {
        const trainer = await response.json();
        if (!trainer.data) {
            return null;
        }
        return trainer.data;
    } else {
        return '';
    }
}

async function showPokemonDetails(pokemon, flag) {
    console.log(flag);
    const pokemonDescription = document.createElement('p');
    pokemonDescription.classList.add('description');
    pokemonDescription.textContent = pokemon.description;
    if (flag != 'captured') pokemonDescription.textContent = '???';
    const pokemonInfo = document.createElement('div');
    pokemonInfo.classList.add('info');
    const pokemonHeight = document.createElement('p');
    pokemonHeight.classList.add('height');
    pokemonHeight.textContent = `Taille: ${pokemon.height/10}m`;
    if (flag == 'unseen') pokemonHeight.textContent = '???';
    const pokemonWeight = document.createElement('p');
    pokemonWeight.classList.add('weight');
    pokemonWeight.textContent = `Poids: ${pokemon.weight/10}kg`;
    pokemonInfo.appendChild(pokemonHeight);
    pokemonInfo.appendChild(pokemonWeight);
    if (flag == 'unseen') pokemonWeight.textContent = '???';
    const pokemonName = document.createElement('h3');
    pokemonName.textContent = pokemon.name;
    if (flag == 'unseen') pokemonName.textContent = '???';
    const pokemonSprite = document.createElement('img');
    pokemonSprite.classList.add('sprite');
    pokemonSprite.src = pokemon.imagePath;
    pokemonSprite.classList.add(flag);
    pokemonSprite.addEventListener('animationend', () => {
        pokemonSprite.classList.remove('screaming');
    });
    const pokemonTypesContainer = document.createElement('div');
    pokemonTypesContainer.classList.add('types-container');
    pokemon.types.forEach(type => {
        const pokemonType = document.createElement('img');
        pokemonType.src = `../assets/types/${type}.png`;
        pokemonType.classList.add('type-icon');
        if (flag != 'unseen') pokemonTypesContainer.appendChild(pokemonType);
    });
    const pokemonScreamButton = document.createElement('img');
    pokemonScreamButton.classList.add('scream-button');
    pokemonScreamButton.src = '../assets/icons/sound.png';
    pokemonScreamButton.addEventListener('click', () => {
        pokemonSprite.classList.add('screaming');
        const pokemonScream = new Audio(pokemon.soundPath);
        pokemonScream.play();
    });
    const pokemonRegionContainer = document.createElement('div');
    pokemonRegionContainer.classList.add('regions-container');
    pokemon.regions.forEach(region => {
        if (!(region.regionName == 'National')) {
            const pokemonRegion = document.createElement('p');
            pokemonRegion.textContent = region.regionName;
            pokemonRegion.classList.add('region');
            pokemonRegionContainer.appendChild(pokemonRegion);
        }
    });
    const closePanel = document.createElement('img');
    closePanel.src = '../assets/icons/close.png';
    closePanel.classList.add('close-panel');
    closePanel.addEventListener('click', () => {
        pokemonPanel.classList.remove('active');
    });
    pokemonPanel.innerHTML = '';
    const pokemonDetailsContainer = document.createElement('div');
    pokemonDetailsContainer.classList.add('pokemon-details');
    pokemonDetailsContainer.appendChild(pokemonName);
    pokemonDetailsContainer.appendChild(pokemonSprite);
    pokemonDetailsContainer.appendChild(pokemonDescription);
    pokemonDetailsContainer.appendChild(pokemonInfo);
    pokemonDetailsContainer.appendChild(pokemonTypesContainer);
    if (flag != 'unseen') pokemonDetailsContainer.appendChild(pokemonScreamButton);
    pokemonDetailsContainer.appendChild(pokemonRegionContainer);
    pokemonDetailsContainer.appendChild(closePanel);
    pokemonPanel.appendChild(pokemonDetailsContainer);
    pokemonPanel.classList.add('active');
}

async function main () {
    getPokemon(partialName, '', '', size, pageIndex);
}

main();