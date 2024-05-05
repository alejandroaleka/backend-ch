const socket = io();

let user;
let data;
let logs = document.getElementById('chatLogs');
let chatBox = document.getElementById('chatBox');



socket.on('message', msg => {
    data = msg;
})

socket.on('chatLogs', data => {
    renderChat(msgs);
});

const renderChat = (msgs) => {
    let messages = '';

    msgs.array.forEach(message => {
        const isCurrentUser = message.user === user;
        const messageClass = isCurrentUser ? 'my-message' : 'other-message';
        messages = messages + `<div class="${messageClass}">${message.user}: ${message.message}</div>`
    });

    logs.innerHTML = messages;

    chatBox.scrollIntoView(false);
};

Swal.fire({
    title: 'Identificacion',
    input: 'email',
    text: 'Ingresa tu email para acceder',
    emailValidator: (value) => {
        if (!value) {
            return 'Debe ingresar un email para acceder';
        }

        const emailRegex =
            new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");

        if(!emailRegex.test(value)){
            return 'Ingrese un formatio de email válido';
        }

        return null;
    },
    allowOutsideClick: false
}).then(result => {
    if (result.isConfirmed) {
        user = result.value;
        renderChat(data);
    };
});

chatBox.addEventListener('keyup', evnt => {
    if (evnt.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            const message = chatBox.value;
            socket.emit('message', { user, message });
            chatBox.value = '';
        };
    };
});

socket.on('new_user', () => {
    Swal.fire({
        text: 'Se ha conectado un nuevo usuario',
        toast: true,
        position: 'top-right'
    });
});