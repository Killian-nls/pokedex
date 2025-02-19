const trainerCreateContainer = document.querySelector('.create-trainer-container');
const trainerEditContainer = document.querySelector('.trainer-container');
const trainerCreateForm = document.getElementById('create-trainer-form');
const trainerEditForm = document.getElementById('update-trainer-form');

trainerCreateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = localStorage.getItem('username');
    const trainerName = trainerCreateForm.querySelector('input[name="trainerName"]').value;
    const imgUrl = trainerCreateForm.querySelector('input[name="imgUrl"]').value;
    if (isValidImageUrl(imgUrl)) {
        const response = await fetch(`${baseUrl}/api/trainers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                username,
                trainerName,
                imgUrl
            })
        });
        if (response.status === 201) {
            window.location.href = '/trainers';
        } else {
            alert('Failed to create trainer.');
        }
    } else {
        alert('Please enter a valid image URL.');
    }

    function isValidImageUrl(url) {
        return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }
});

trainerEditForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = localStorage.getItem('username');
    const trainer = await fetchTrainerByUsername(username);
    const trainerId = trainer.data._id;
    const trainerName = trainerEditForm.querySelector('.updateTrainerName').value;
    const imgUrl = trainerEditForm.querySelector('.updateTrainerImgUrl').value;
    const response = await fetch(`${baseUrl}/api/trainers/${trainerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            trainerName,
            imgUrl
        })
    });
    if (response.status === 200) {
        window.location.href = '/';
    } else {
        alert('Failed to update trainer.');
    }
});

async function fetchTrainerByUsername(username) {
    const response = await fetch(`${baseUrl}/api/trainers/search?username=${username}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    if (response.status === 200) {
        console.log(response);
        const result = await response.json();
        return await result;
    } else {
        return null;
    }
}

async function main() {
    if (!localStorage.getItem('token')) {
        window.location.href = '/login';
        return;
    }
    console.log(localStorage.getItem('username'));
    const trainers = await fetchTrainerByUsername(localStorage.getItem('username'));
    console.log(trainers);
    if (trainers.data) {
        trainerCreateContainer.classList.add('hidden');
        const pokemonSeen = document.querySelector('.pokemon-seen');
        const pokemonCaptured = document.querySelector('.pokemon-captured');
        const trainerSince = document.querySelector('.trainer-since');
        pokemonSeen.textContent = trainers.data.pokemonSeen.length;
        pokemonCaptured.textContent = trainers.data.pokemonCaptured.length;
        const dateSince = new Date(trainers.data.creationDate).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        trainerSince.textContent = dateSince;
        const trainerNameElement = document.querySelector('.updateTrainerName');
        trainerNameElement.value = trainers.data.trainerName;
    } else {
        trainerEditContainer.classList.add('hidden');
    }
};

main()