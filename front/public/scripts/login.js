document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.auth-container');
    const panelButton = document.querySelector('.panel button');
    const panelTitle = document.querySelector('.panel h3');
    const panelContent = document.querySelector('.panel p');

    const loginTitle = 'Nouveau dresseur ?';
    const loginContent = 'Créez votre compte pour commencer l\'aventure'

    const registerTitle = 'Déjà un membre ?';
    const registerContent = 'Connectez-vous pour accéder à votre Pokédex';
  
    panelButton.addEventListener('click', () => {
        console.log('register');
        container.classList.toggle('register-mode');
        if (container.classList.contains('register-mode')) {
            panelButton.textContent = 'Se connecter';
            panelTitle.textContent = registerTitle;
            panelContent.textContent = registerContent;
        } else {
            panelButton.textContent = 'Créer un compte';
            panelTitle.textContent = loginTitle;
            panelContent.textContent = loginContent;
        }
    });

    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const body = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        fetch(`${baseUrl}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then((response) => {
            if (response.status === 200) {
                response.json().then(async (data) => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    await getUserInformations();
                    window.location.href = `/trainers`;
                });
            } else {
                response.json().then((data) => {
                    alert(data.error);
                });
            }
        });
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const body = {
            firstname: e.target.firstname.value,
            lastname: e.target.lastname.value,
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value
        }
        fetch(`${baseUrl}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then((response) => {
            if (response.status === 201) {
                fetch(`${baseUrl}/users/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: e.target.email.value,
                        password: e.target.password.value
                    })
                }).then((response) => {
                    if (response.status === 200) {
                        response.json().then((data) => {
                            localStorage.setItem('token', data.token);
                            localStorage.setItem('userId', data.userId);
                            window.location.href = `/trainers`;
                        });
                    } else {
                        response.json().then((data) => {
                            alert(data.error);
                        });
                    }
                });
            } else {
                response.json().then((data) => {
                    alert(data.error);
                });
            }
        });
    });
});