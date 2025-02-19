document.addEventListener('DOMContentLoaded', async function() {
    console.log("haha");
    const nav = document.querySelector('nav');
    if (localStorage.getItem('token')) {
        if (!localStorage.getItem('username')) {
            await getUserInformations();
        }
        const username = localStorage.getItem('username');
        const usernameElement = document.createElement('span');
        usernameElement.classList.add('username');
        usernameElement.textContent = username;
        const logoutButton = document.createElement('button');
        const trainerImg = await getTrainer(username);
        if (trainerImg) {
            const trainerImgElement = document.createElement('img');
            trainerImgElement.src = trainerImg;
            trainerImgElement.classList.add('trainer-img');
            trainerImgElement.addEventListener('click', function() {
                window.location.href = '/trainers';
            });
            nav.appendChild(trainerImgElement);
        } else {
            if (window.location.pathname !== '/trainers') {
                window.location.href = '/trainers';
            }
        }
        logoutButton.id = 'logout';
        logoutButton.textContent = 'Déconnexion';
        nav.appendChild(usernameElement);
        nav.appendChild(logoutButton);
    } else {
        const loginButton = document.createElement('button');
        loginButton.id = 'login';
        loginButton.textContent = 'Connexion';
        nav.appendChild(loginButton);
    }
});

document.addEventListener('click', function(e) {
    if (e.target.id === 'login') {
        window.location.href = '/login';
    } else if (e.target.id === 'logout') {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        window.location.href = '/';
    }
});

async function getUserInformations() {
    if (!localStorage.getItem('token') || !localStorage.getItem('userId')) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        return;
    }
    const response = await fetch(`${baseUrl}/users/${localStorage.getItem('userId')}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    if (response.status === 200) {
        const user = await response.json();
        console.log(user);
        localStorage.setItem('username', user.username);
    } else {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
    }
}

async function getTrainer(username) {
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
        return trainer.data.imgUrl;
    } else {
        return '';
    }
}