if (localStorage.getItem('token') && localStorage.getItem('username')) {
    const username = localStorage.getItem('username');
    const ws = new WebSocket(wsBaseUrl);
    const chatContainer = document.createElement('div');
    chatContainer.classList.add('chat-container');
    const header = document.createElement('div');
    header.classList.add('header');
    header.textContent = 'Chat';
    header.addEventListener('click', () => {
        chatContainer.classList.toggle('open');
    });
    chatContainer.appendChild(header);
    const messages = document.createElement('div');
    messages.classList.add('messages');
    const messageForm = document.createElement('form');
    const messageInput = document.createElement('input');
    const messageButton = document.createElement('button');
    messageForm.appendChild(messageInput);
    messageForm.appendChild(messageButton);
    chatContainer.appendChild(messages);
    chatContainer.appendChild(messageForm);
    document.body.appendChild(chatContainer);
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value;
        ws.send(username + ": " + message);
        messageInput.value = '';
    });
    ws.onopen = () => {
        const message = document.createElement('div');
        message.textContent = `${username} connected`;
        messages.appendChild(message);
    };
    ws.onmessage = (event) => {
        const message = document.createElement('div');
        message.textContent = event.data;
        messages.appendChild(message);
    };
    ws.onerror = (error) => {
        console.error('WS Error: ', error);
    };
    ws.onclose = () => {
        console.log('Disconnected from server');
    };
        
}

