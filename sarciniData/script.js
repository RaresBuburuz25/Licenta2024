document.addEventListener('DOMContentLoaded', function () {
    sessionStorage.setItem('loggedIn', 'false');
    Auth.createLogin();

    document.querySelector('.buttons').style.display = 'none';

    document.querySelector('.profile').addEventListener('click', function () {
        var buttons = document.querySelector('.buttons');

        if (buttons.style.display == 'none') {
            buttons.style.display = 'flex';
        } else {
            buttons.style.display = 'none';
        }
    });
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        var overlay = document.querySelector('.overlay');
        overlay.innerHTML = '';
        overlay.style.display = 'none';
    }
});


class Auth {
    static async createLogin() {
        var main = document.querySelector('main');
        main.innerHTML = '';
        main.style.height = '100%';

        var pp = document.createElement('div');
        pp.className = 'row';
        pp.style.height = '100%';
        main.appendChild(pp);

        var p = document.createElement('div');
        p.className = 'column';
        p.style.flex = '1';
        pp.appendChild(p);

        var div = document.createElement('div');
        div.className = 'column';
        div.style.height = '100%';
        div.style.justifyContent = 'center';
        div.style.flex = '1';
        pp.appendChild(div);

        var img = document.createElement('img');
        img.src = 'img/task2.png';
        img.style.height = '90%';
        div.appendChild(img);

        var button2 = document.createElement('button');
        button2.innerHTML = 'Nu am cont';
        button2.onclick = function () {
            Auth.createRegister();
        }
        button2.className = 'no-auth-button';

        var form = document.createElement('div');
        form.className = 'form';
        p.appendChild(form);

        var span = document.createElement('span');
        span.innerHTML = 'Autentificare';
        form.appendChild(span);

        var label = document.createElement('label');
        label.innerHTML = 'Email';
        form.appendChild(label);

        var input = document.createElement('input');
        input.id = 'email';
        input.type = 'email';
        form.appendChild(input);

        label = document.createElement('label');
        label.innerHTML = 'Parola';
        form.appendChild(label);

        input = document.createElement('input');
        input.id = 'password';
        input.type = 'password';
        form.appendChild(input);

        span = document.createElement('span');
        span.innerHTML = '';
        span.id = 'error';
        span.style.color = 'red';
        form.appendChild(span);

        var button = document.createElement('button');
        button.innerHTML = 'Autentificare';
        button.className = 'button';
        button.onclick = function () {
            Auth.login();
        }
        form.appendChild(button);

        p.appendChild(button2);

    }

    static async createRegister() {
        var main = document.querySelector('main');
        main.innerHTML = '';

        var p = document.createElement('div');
        p.className = 'column';
        main.appendChild(p);

        var button2 = document.createElement('button');
        button2.innerHTML = 'Am cont';
        button2.onclick = function () {
            Auth.createLogin();
        }
        button2.className = 'no-auth-button';

        var form = document.createElement('div');
        form.className = 'form';
        p.appendChild(form);

        var span = document.createElement('span');
        span.innerHTML = 'Inregistrare';
        form.appendChild(span);

        var label = document.createElement('label');
        label.innerHTML = 'Email';
        form.appendChild(label);

        var input = document.createElement('input');
        input.id = 'email';
        input.type = 'email';
        form.appendChild(input);

        label = document.createElement('label');
        label.innerHTML = 'Nume';
        form.appendChild(label);

        input = document.createElement('input');
        input.id = 'lastName';
        input.type = 'text';
        form.appendChild(input);

        label = document.createElement('label');
        label.innerHTML = 'Prenume';
        form.appendChild(label);

        input = document.createElement('input');
        input.id = 'firstName';
        input.type = 'text';
        form.appendChild(input);

        label = document.createElement('label');
        label.innerHTML = 'Parola';
        form.appendChild(label);

        input = document.createElement('input');
        input.id = 'password';
        input.type = 'password';
        form.appendChild(input);

        label = document.createElement('label');
        label.innerHTML = 'Confirmare parola';
        form.appendChild(label);

        input = document.createElement('input');
        input.id = 'confirmPassword';
        input.type = 'password';
        form.appendChild(input);

        span = document.createElement('span');
        span.innerHTML = '';
        span.id = 'error';
        span.style.color = 'red';
        form.appendChild(span);

        var button = document.createElement('button');
        button.innerHTML = 'Inregistrare';
        button.className = 'button';
        button.onclick = function () {
            Auth.register();
        }
        form.appendChild(button);

        p.appendChild(button2);

    }

    static async register() {
        var email = document.getElementById('email').value;
        var lastName = document.getElementById('lastName').value;
        var firstName = document.getElementById('firstName').value;
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirmPassword').value;
        var err = document.getElementById('error');

        if (email === '' || lastName === '' || firstName === '' || password === '' || confirmPassword === '') {
            err.innerHTML = 'Toate campurile sunt obligatorii';
            return;
        }

        if (email.includes('@') === false || email.includes('.') === false) {
            err.innerHTML = 'Email invalid';
            return;
        }

        var xhr = new XMLHttpRequest();
        xhr.open('GET', '../sarciniData/api/auth/checkEmail.php?email=' + email, false);
        var toReturn = false;
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                if (data.exists) {
                    err.innerHTML = 'Email-ul exista deja';
                    toReturn = true;
                    return;
                }
            }
        }
        xhr.send();

        if (toReturn) {
            return;
        }

        if (password.length < 6) {
            err.innerHTML = 'Parola trebuie sa aiba minim 6 caractere';
            return;
        }

        if (/[A-Z]/.test(password) === false || /[0-9]/.test(password) === false || /[a-z]/.test(password) === false || /[^A-Za-z0-9]/.test(password) === false) {
            err.innerHTML = 'Parola trebuie sa contina cel putin o <br>litera mare, o litera mica, o cifra <br>si un caracter special';
            return;
        }

        if (password !== confirmPassword) {
            err.innerHTML = 'Parolele nu coincid';
            return;
        }

        var formData = new FormData();
        formData.append('email', email);
        formData.append('lastName', lastName);
        formData.append('firstName', firstName);
        formData.append('password', password);

        xhr = new XMLHttpRequest();
        xhr.open('POST', '../sarciniData/api/auth/register.php', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                if (data.success) {
                    err.innerHTML = 'Inregistrare cu succes';
                    err.style.color = 'green';
                    setTimeout(function () {
                        Auth.createLogin();
                    }, 2000);
                } else {
                    err.innerHTML = 'Eroare la inregistrare';
                }
            }
        }
        xhr.send(formData);
    }

    static async login() {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var err = document.getElementById('error');

        if (email === '' || password === '') {
            err.innerHTML = 'Toate campurile sunt obligatorii';
            return;
        }

        var formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../sarciniData/api/auth/login.php', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                if (data.success) {
                    sessionStorage.setItem('loggedIn', 'true');
                    sessionStorage.setItem('id', data.id);
                    House.myHouses();
                    var p = document.querySelector('.profile');
                    p.innerHTML = data.firstName[0].toUpperCase() + ' ' + data.lastName[0].toUpperCase();
                    p.style.display = 'flex';
                } else {
                    err.innerHTML = 'Email sau parola gresite';
                }
            }
        }
        xhr.send(formData);
    }

    static async logout() {
        sessionStorage.clear();
        sessionStorage.setItem('loggedIn', 'false');
        Auth.createLogin();
        var p = document.querySelector('.profile');
        p.innerHTML = '';
        p.style.display = 'none';
        var buttons = document.querySelector('.buttons');
        buttons.style.display = 'none';

        var xhr = new XMLHttpRequest();
        xhr.open('GET', '../sarciniData/api/auth/logout.php', true);
        xhr.send();
    }
}

class House {
    static async myHouses() {
        var main = document.querySelector('main');
        main.innerHTML = '';

        var p = document.createElement('div');
        p.style.display = 'flex';
        p.style.flexDirection = 'row';
        p.style.flexWrap = 'wrap';
        p.style.justifyContent = 'space-evenly';
        main.appendChild(p);

        var xhr = new XMLHttpRequest();
        xhr.open('GET', '../sarciniData/api/house/myHouses.php', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);

                data.forEach(e => {
                    var card = document.createElement('div');
                    card.className = 'house-card';
                    card.style.position = 'relative';
                    p.appendChild(card);

                    var img = document.createElement('img');
                    img.src = 'img/task.png';
                    img.style.position = 'absolute';
                    img.style.width = '15rem';
                    img.style.bottom = '0';
                    img.style.right = '0.5rem';
                    card.appendChild(img);

                    var row = document.createElement('div');
                    row.className = 'row';
                    card.appendChild(row);

                    var span = document.createElement('span');
                    span.innerHTML = e.name;
                    span.style.fontWeight = 'bold';
                    span.style.fontSize = '1.5rem';
                    span.style.color = 'var(--sec-color)';
                    row.appendChild(span);

                    if (e.master == sessionStorage.getItem('id')) {
                        var img = document.createElement('img');
                        img.src = 'img/delete.png';
                        img.style.height = '1.25rem';
                        img.style.width = '1.25rem';
                        img.style.marginLeft = '1rem';
                        img.onclick = function () {
                            House.deleteHouse(e.id);
                        }
                        row.appendChild(img);
                    }

                    row = document.createElement('div');
                    row.className = 'row';
                    row.style.marginTop = '1rem';
                    card.appendChild(row);

                    span = document.createElement('span');
                    span.innerHTML = "Administrator: ";
                    span.style.fontWeight = 'bold';
                    span.style.fontSize = '1.2rem';
                    span.style.color = 'lightgray';
                    row.appendChild(span);

                    span = document.createElement('span');
                    span.innerHTML = e.firstName + ' ' + e.lastName;
                    span.style.fontWeight = 'bold';
                    span.style.fontSize = '1.2rem';
                    span.style.color = 'var(--sec-color)';
                    span.style.marginLeft = '0.5rem';
                    row.appendChild(span);

                    row = document.createElement('div');
                    row.className = 'row';
                    row.style.marginTop = '1rem';
                    card.appendChild(row);

                    span = document.createElement('span');
                    span.innerHTML = "Task-uri: ";
                    span.style.fontWeight = 'bold';
                    span.style.fontSize = '1.2rem';
                    span.style.color = 'lightgray';
                    row.appendChild(span);

                    span = document.createElement('span');
                    span.innerHTML = e.tasks;
                    span.style.fontWeight = 'bold';
                    span.style.fontSize = '1.2rem';
                    span.style.color = 'var(--sec-color)';
                    span.style.marginLeft = '0.5rem';
                    row.appendChild(span);

                    row = document.createElement('div');
                    row.className = 'column';
                    row.style.alignItems = 'flex-start';
                    row.style.marginTop = '1rem';
                    card.appendChild(row);

                    var rr = document.createElement('div');
                    rr.className = 'row';
                    row.appendChild(rr);

                    span = document.createElement('span');
                    span.innerHTML = "Camere: ";
                    span.style.fontWeight = 'bold';
                    span.style.fontSize = '1.2rem';
                    span.style.color = 'lightgray';
                    rr.appendChild(span);

                    if (e.master == sessionStorage.getItem('id')) {
                        var img = document.createElement('img');
                        img.src = 'img/add.png';
                        img.style.height = '1rem';
                        img.style.width = '1rem';
                        img.style.marginLeft = '1rem';
                        img.onclick = function () {
                            House.addRoomPage(e.id);
                        }
                        rr.appendChild(img);
                    }

                    if (e.rooms.length != 0) {
                        var ul = document.createElement('ul');
                        ul.style.color = 'var(--sec-color)';
                        ul.style.fontWeight = 'bold';
                        row.appendChild(ul);

                        e.rooms.forEach(r => {
                            var li = document.createElement('li');
                            ul.appendChild(li);

                            span = document.createElement('span');
                            span.innerHTML = r.name;
                            span.style.fontSize = '1.2rem';
                            li.appendChild(span);

                            if (e.master == sessionStorage.getItem('id')) {
                                var img = document.createElement('img');
                                img.src = 'img/delete.png';
                                img.style.height = '1rem';
                                img.style.width = '1rem';
                                img.style.marginLeft = '1rem';
                                img.onclick = function () {
                                    House.deleteRoom(r.id);
                                }
                                li.appendChild(img);
                            }
                        });

                    } else {
                        span = document.createElement('span');
                        span.innerHTML = 'Nicio camera';
                        span.style.fontWeight = 'bold';
                        span.style.fontSize = '1.2rem';
                        span.style.color = 'var(--sec-color)';
                        row.appendChild(span);
                    }

                    row = document.createElement('div');
                    row.className = 'column';
                    row.style.alignItems = 'flex-start';
                    row.style.marginTop = '1rem';
                    card.appendChild(row);

                    rr = document.createElement('div');
                    rr.className = 'row';
                    row.appendChild(rr);

                    span = document.createElement('span');
                    span.innerHTML = "Membri: ";
                    span.style.fontWeight = 'bold';
                    span.style.fontSize = '1.2rem';
                    span.style.color = 'lightgray';
                    rr.appendChild(span);

                    if (e.master == sessionStorage.getItem('id')) {
                        var img = document.createElement('img');
                        img.src = 'img/add.png';
                        img.style.height = '1rem';
                        img.style.width = '1rem';
                        img.style.marginLeft = '1rem';
                        img.onclick = function () {
                            House.addMemberPage(e.id);
                        }
                        rr.appendChild(img);
                    }

                    if (e.members.length != 0) {
                        var ul = document.createElement('ul');
                        ul.style.color = 'var(--sec-color)';
                        ul.style.fontWeight = 'bold';
                        row.appendChild(ul);

                        e.members.forEach(m => {
                            var li = document.createElement('li');
                            ul.appendChild(li);

                            span = document.createElement('span');
                            span.innerHTML = m.firstName + ' ' + m.lastName;
                            span.style.fontSize = '1.2rem';
                            li.appendChild(span);

                            if (e.master == sessionStorage.getItem('id')) {
                                var img = document.createElement('img');
                                img.src = 'img/delete.png';
                                img.style.height = '1rem';
                                img.style.width = '1rem';
                                img.style.marginLeft = '1rem';
                                img.onclick = function () {
                                    House.deleteMember(e.id, m.id);
                                }
                                li.appendChild(img);
                            }
                        });

                    } else {
                        span = document.createElement('span');
                        span.innerHTML = 'Niciun membru';
                        span.style.fontWeight = 'bold';
                        span.style.fontSize = '1.2rem';
                        span.style.color = 'var(--sec-color)';
                        row.appendChild(span);
                    }
                });
            }
        }
        xhr.send();
    }

    static async addHousePage() {
        var overlay = document.querySelector('.overlay');
        overlay.innerHTML = '';
        overlay.style.display = 'flex';

        var form = document.createElement('div');
        form.className = 'form';
        overlay.appendChild(form);

        var span = document.createElement('span');
        span.innerHTML = 'Adauga casa';
        form.appendChild(span);

        var label = document.createElement('label');
        label.innerHTML = 'Nume';
        form.appendChild(label);

        var input = document.createElement('input');
        input.id = 'houseName';
        input.type = 'text';
        form.appendChild(input);

        var button = document.createElement('button');
        button.innerHTML = 'Adauga';
        button.className = 'button';
        button.onclick = function () {
            House.addHouse();
        }
        form.appendChild(button);
    }

    static async addHouse() {
        var name = document.getElementById('houseName').value;

        if (name === '') {
            return;
        }

        var formData = new FormData();
        formData.append('name', name);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../sarciniData/api/house/addHouse.php', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                if (data.success) {
                    House.myHouses();
                    var overlay = document.querySelector('.overlay');
                    overlay.innerHTML = '';
                    overlay.style.display = 'none';
                }
            }
        }
        xhr.send(formData);
    }

    static async deleteHouse(id) {
        var r = window.confirm('Doriti sa stergeti aceasta casa?');

        if (r == false) {
            return;
        }

        var xhr = new XMLHttpRequest();
        xhr.open('GET', '../sarciniData/api/house/deleteHouse.php?id=' + id, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                if (data.success) {
                    House.myHouses();
                }
            }
        }
        xhr.send();
    }

    static async addMemberPage(id) {
        var overlay = document.querySelector('.overlay');
        overlay.innerHTML = '';
        overlay.style.display = 'flex';

        var form = document.createElement('div');
        form.className = 'form';
        overlay.appendChild(form);

        var span = document.createElement('span');
        span.innerHTML = 'Adauga membru';
        form.appendChild(span);

        var label = document.createElement('label');
        label.innerHTML = 'Email';
        form.appendChild(label);

        var input = document.createElement('input');
        input.id = 'email';
        input.type = 'email';
        form.appendChild(input);

        var button = document.createElement('button');
        button.innerHTML = 'Adauga';
        button.className = 'button';
        button.onclick = function () {
            House.addMember(id);
        }
        form.appendChild(button);
    }

    static async addMember(id) {
        var email = document.getElementById('email').value;

        if (email === '') {
            return;
        }

        var formData = new FormData();
        formData.append('email', email);
        formData.append('id', id);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../sarciniData/api/house/addMember.php', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                if (data.success) {
                    House.myHouses();
                    var overlay = document.querySelector('.overlay');
                    overlay.innerHTML = '';
                    overlay.style.display = 'none';
                }
                else {
                    alert('Acest email nu exista');
                }
            }
        }
        xhr.send(formData);
    }

    static async deleteMember(id, memberId) {
        var r = window.confirm('Doriti sa stergeti acest membru?');

        if (r == false) {
            return;
        }

        var formData = new FormData();
        formData.append('idhouse', id);
        formData.append('iduser', memberId);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../sarciniData/api/house/deleteMember.php', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                if (data.success) {
                    House.myHouses();
                }
            }
        }
        xhr.send(formData);
    }

    static async addRoomPage(id) {
        var overlay = document.querySelector('.overlay');
        overlay.innerHTML = '';
        overlay.style.display = 'flex';

        var form = document.createElement('div');
        form.className = 'form';
        overlay.appendChild(form);

        var span = document.createElement('span');
        span.innerHTML = 'Adauga camera';
        form.appendChild(span);

        var label = document.createElement('label');
        label.innerHTML = 'Nume';
        form.appendChild(label);

        var input = document.createElement('input');
        input.id = 'roomName';
        input.type = 'text';
        form.appendChild(input);

        var button = document.createElement('button');
        button.innerHTML = 'Adauga';
        button.className = 'button';
        button.onclick = function () {
            House.addRoom(id);
        }
        form.appendChild(button);
    }

    static async addRoom(id) {
        var name = document.getElementById('roomName').value;

        if (name === '') {
            return;
        }

        var formData = new FormData();
        formData.append('name', name);
        formData.append('id', id);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../sarciniData/api/house/addRoom.php', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                if (data.success) {
                    House.myHouses();
                    var overlay = document.querySelector('.overlay');
                    overlay.innerHTML = '';
                    overlay.style.display = 'none';
                }
            }
        }
        xhr.send(formData);
    }

    static async deleteRoom(id) {
        var r = window.confirm('Doriti sa stergeti aceasta camera?');

        if (r == false) {
            return;
        }

        var xhr = new XMLHttpRequest();
        xhr.open('GET', '../sarciniData/api/house/deleteRoom.php?id=' + id, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                if (data.success) {
                    House.myHouses();
                }
            }
        }
        xhr.send();
    }
}

class Tasks {
    static async myTasks() {
        var main = document.querySelector('main');
        main.innerHTML = '';

        var p = document.createElement('div');
        p.className = 'column';
        main.appendChild(p);

        var table = document.createElement('table');
        table.id = "overdue";
        table.style.marginTop = '2rem';
        p.appendChild(table);

        var row = document.createElement('div');
        row.className = 'column';
        row.id = "addTask";
        row.style.marginTop = '2rem';
        row.style.width = '80%';
        row.style.boxShadow = '0 0 0.5rem 0.5rem lightgray';
        row.style.paddingTop = '1rem';
        row.style.paddingBottom = '1rem';
        row.style.borderRadius = '1rem';
        p.appendChild(row);

        Tasks.populateAddTask();

        table = document.createElement('table');
        table.id = "today";
        p.appendChild(table);

        table = document.createElement('table');
        table.id = "future";
        p.appendChild(table);

        Tasks.populateOverdue();
        Tasks.populateToday();
        Tasks.populateFuture();
    }

    static async populateOverdue() {
        var table = document.getElementById('overdue');
        table.innerHTML = '';

        var tr = document.createElement('tr');
        table.appendChild(tr);

        var th = document.createElement('th');
        th.innerHTML = 'Task-uri depasite';
        th.colSpan = 6;
        th.style.backgroundColor = 'rgba(143, 43, 66, 1)';
        tr.appendChild(th);

        tr = document.createElement('tr');
        table.appendChild(tr);

        th = document.createElement('th');
        th.innerHTML = 'Casa';
        th.style.backgroundColor = 'rgba(143, 43, 66, 1)';
        tr.appendChild(th);

        th = document.createElement('th');
        th.innerHTML = 'Camera';
        th.style.backgroundColor = 'rgba(143, 43, 66, 1)';
        tr.appendChild(th);

        th = document.createElement('th');
        th.innerHTML = 'Task';
        th.style.backgroundColor = 'rgba(143, 43, 66, 1)';
        tr.appendChild(th);

        th = document.createElement('th');
        th.innerHTML = 'Data';
        th.style.backgroundColor = 'rgba(143, 43, 66, 1)';
        tr.appendChild(th);

        th = document.createElement('th');
        th.innerHTML = 'Urmatoarea data';
        th.style.backgroundColor = 'rgba(143, 43, 66, 1)';
        tr.appendChild(th);

        th = document.createElement('th');
        th.innerHTML = 'Status';
        th.style.backgroundColor = 'rgba(143, 43, 66, 1)';
        tr.appendChild(th);

        var xhr = new XMLHttpRequest();
        xhr.open('GET', '../sarciniData/api/tasks/getOverdueTasks.php', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);

                data.forEach(e => {
                    tr = document.createElement('tr');
                    table.appendChild(tr);

                    var td = document.createElement('td');
                    if (e.house == '' || e.house == null)
                        td.innerHTML = e.houseNameForRoom;
                    else
                        td.innerHTML = e.house;
                    tr.appendChild(td);

                    td = document.createElement('td');
                    if (e.room == '' || e.room == null)
                        td.innerHTML = 'N/A';
                    else
                        td.innerHTML = e.room;
                    tr.appendChild(td);

                    td = document.createElement('td');
                    td.innerHTML = e.name;
                    tr.appendChild(td);

                    td = document.createElement('td');
                    var date = new Date(e.time_start * 1000);
                    td.innerHTML = date.getDate().toString().padStart(2, '0') + '.' + (date.getMonth() + 1).toString().padStart(2, '0') + '.' + date.getFullYear();
                    tr.appendChild(td);

                    td = document.createElement('td');
                    date = new Date((parseFloat(e.time_start) + parseFloat(e.inter)) * 1000);
                    td.innerHTML = date.getDate().toString().padStart(2, '0') + '.' + (date.getMonth() + 1).toString().padStart(2, '0') + '.' + date.getFullYear();
                    tr.appendChild(td);

                    td = document.createElement('td');
                    tr.appendChild(td);

                    var input = document.createElement('input');
                    input.type = 'checkbox';
                    input.onchange = function () {
                        var xhr = new XMLHttpRequest();
                        xhr.open('GET', '../sarciniData/api/tasks/changeStatus.php?id=' + e.id, true);
                        xhr.onload = function () {
                            if (xhr.status === 200) {
                                var data = JSON.parse(xhr.responseText);
                                if (data.success) {
                                    Tasks.myTasks();
                                }
                                else {
                                    console.log(data);
                                }
                            }
                        }
                        xhr.send();
                    }
                    td.appendChild(input);
                });
            }
        }
        xhr.send();
    }

    static async populateToday() {
        var table = document.getElementById('today');
        table.innerHTML = '';
        table.style.marginTop = '2rem';

        var tr = document.createElement('tr');
        table.appendChild(tr);

        var th = document.createElement('th');
        th.innerHTML = 'Task-uri azi';
        th.colSpan = 6;
        tr.appendChild(th);

        tr = document.createElement('tr');
        table.appendChild(tr);

        th = document.createElement('th');
        th.innerHTML = 'Casa';
        tr.appendChild(th);

        th = document.createElement('th');
        th.innerHTML = 'Camera';
        tr.appendChild(th);

        th = document.createElement('th');
        th.innerHTML = 'Task';
        tr.appendChild(th);

        th = document.createElement('th');
        th.innerHTML = 'Data';
        tr.appendChild(th);

        th = document.createElement('th');
        th.innerHTML = 'Urmatoarea data';
        tr.appendChild(th);

        th = document.createElement('th');
        th.innerHTML = 'Status';
        tr.appendChild(th);

        var xhr = new XMLHttpRequest();
        xhr.open('GET', '../sarciniData/api/tasks/getTodayTasks.php', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);

                data.forEach(e => {
                    tr = document.createElement('tr');
                    table.appendChild(tr);

                    var td = document.createElement('td');
                    if (e.house == '' || e.house == null)
                        td.innerHTML = e.houseNameForRoom;
                    else
                        td.innerHTML = e.house;
                    tr.appendChild(td);

                    td = document.createElement('td');
                    if (e.room == '' || e.room == null)
                        td.innerHTML = 'N/A';
                    else
                        td.innerHTML = e.room;
                    tr.appendChild(td);

                    td = document.createElement('td');
                    td.innerHTML = e.name;
                    tr.appendChild(td);

                    td = document.createElement('td');
                    var date = new Date(e.time_start * 1000);
                    td.innerHTML = date.getDate().toString().padStart(2, '0') + '.' + (date.getMonth() + 1).toString().padStart(2, '0') + '.' + date.getFullYear();
                    tr.appendChild(td);

                    td = document.createElement('td');
                    date = new Date((parseFloat(e.time_start) + parseFloat(e.inter)) * 1000);
                    td.innerHTML = date.getDate().toString().padStart(2, '0') + '.' + (date.getMonth() + 1).toString().padStart(2, '0') + '.' + date.getFullYear();
                    tr.appendChild(td);

                    td = document.createElement('td');
                    tr.appendChild(td);

                    var input = document.createElement('input');
                    input.type = 'checkbox';
                    input.onchange = function () {
                        var xhr = new XMLHttpRequest();
                        xhr.open('GET', '../sarciniData/api/tasks/changeStatus.php?id=' + e.id, true);
                        xhr.onload = function () {
                            if (xhr.status === 200) {
                                var data = JSON.parse(xhr.responseText);
                                if (data.success) {
                                    Tasks.myTasks();
                                }
                            }
                        }
                        xhr.send();
                    }
                    td.appendChild(input);
                });
            }
        }
        xhr.send();
    }

    static async populateFuture() {
        var table = document.getElementById('future');
        table.innerHTML = '';
        table.style.marginTop = '2rem';

        var tr = document.createElement('tr');
        table.appendChild(tr);

        var th = document.createElement('th');
        th.innerHTML = 'Task-uri viitoare';
        th.colSpan = 6;
        th.style.backgroundColor = 'green';
        tr.appendChild(th);

        tr = document.createElement('tr');
        table.appendChild(tr);

        th = document.createElement('th');
        th.innerHTML = 'Casa';
        th.style.backgroundColor = 'green';
        tr.appendChild(th);

        th = document.createElement('th');
        th.innerHTML = 'Camera';
        th.style.backgroundColor = 'green';
        tr.appendChild(th);

        th = document.createElement('th');
        th.innerHTML = 'Task';
        th.style.backgroundColor = 'green';
        tr.appendChild(th);

        th = document.createElement('th');
        th.innerHTML = 'Data';
        th.style.backgroundColor = 'green';
        tr.appendChild(th);

        th = document.createElement('th');
        th.innerHTML = 'Urmatoarea data';
        th.style.backgroundColor = 'green';
        tr.appendChild(th);

        th = document.createElement('th');
        th.innerHTML = 'Status';
        th.style.backgroundColor = 'green';
        tr.appendChild(th);

        var xhr = new XMLHttpRequest();
        xhr.open('GET', '../sarciniData/api/tasks/getFutureTasks.php', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);

                data.forEach(e => {
                    tr = document.createElement('tr');
                    table.appendChild(tr);

                    var td = document.createElement('td');
                    if (e.house == '' || e.house == null)
                        td.innerHTML = e.houseNameForRoom;
                    else
                        td.innerHTML = e.house;
                    tr.appendChild(td);

                    td = document.createElement('td');
                    if (e.room == '' || e.room == null)
                        td.innerHTML = 'N/A';
                    else
                        td.innerHTML = e.room;
                    tr.appendChild(td);

                    td = document.createElement('td');
                    td.innerHTML = e.name;
                    tr.appendChild(td);

                    td = document.createElement('td');
                    var date = new Date(e.time_start * 1000);
                    td.innerHTML = date.getDate().toString().padStart(2, '0') + '.' + (date.getMonth() + 1).toString().padStart(2, '0') + '.' + date.getFullYear();
                    tr.appendChild(td);

                    td = document.createElement('td');
                    date = new Date((parseFloat(e.time_start) + parseFloat(e.inter)) * 1000);
                    td.innerHTML = date.getDate().toString().padStart(2, '0') + '.' + (date.getMonth() + 1).toString().padStart(2, '0') + '.' + date.getFullYear();
                    tr.appendChild(td);

                    td = document.createElement('td');
                    tr.appendChild(td);

                    var input = document.createElement('input');
                    input.type = 'checkbox';
                    input.onchange = function () {
                        var xhr = new XMLHttpRequest();
                        xhr.open('GET', '../sarciniData/api/tasks/changeStatus.php?id=' + e.id, true);
                        xhr.onload = function () {
                            if (xhr.status === 200) {
                                var data = JSON.parse(xhr.responseText);
                                if (data.success) {
                                    Tasks.myTasks();
                                }
                            }
                        }
                        xhr.send();
                    }
                    td.appendChild(input);
                });
            }
        }
        xhr.send();
    }

    static async populateAddTask() {
        var dest = document.getElementById('addTask');
        dest.innerHTML = '';

        var span = document.createElement('span');
        span.innerHTML = 'Adauga task';
        span.style.fontWeight = 'bold';
        span.style.fontSize = '1.5rem';
        span.style.color = 'var(--primary-color)';
        dest.appendChild(span);

        var row = document.createElement('div');
        row.className = 'row';
        row.style.width = '100%';
        dest.appendChild(row);

        var col = document.createElement('div');
        col.className = 'column';
        col.style.flex = '1';
        col.style.marginRight = '1rem';
        col.style.height = '100%';
        col.style.justifyContent = 'space-between';
        row.appendChild(col);

        span = document.createElement('span');
        span.innerHTML = 'Destinatie';
        span.style.fontWeight = 'bold';
        span.style.fontSize = '1.5rem';
        span.style.color = 'var(--primary-color)';
        col.appendChild(span);

        var select = document.createElement('select');
        select.id = 'houses';
        select.style.marginTop = '1rem';
        select.onchange = function () {
            var id = document.getElementById('houses').value;

            if (id === 'N/A') {
                var rooms = document.getElementById('rooms');
                rooms.innerHTML = '';

                var option = document.createElement('option');
                option.value = 'N/A';
                option.innerHTML = 'Alege camera';
                rooms.appendChild(option);

                return;
            }

            var rooms = document.getElementById('rooms');
            rooms.innerHTML = '';

            var option = document.createElement('option');
            option.value = 'N/A';
            option.innerHTML = 'Alege camera';
            rooms.appendChild(option);

            var xhr = new XMLHttpRequest();
            xhr.open('GET', '../sarciniData/api/house/getRooms.php?id=' + id, false);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);

                    data.forEach(e => {
                        var option = document.createElement('option');
                        option.value = e.id;
                        option.innerHTML = e.name;
                        rooms.appendChild(option);
                    });
                }
            }
            xhr.send();

        }
        col.appendChild(select);

        var option = document.createElement('option');
        option.value = 'N/A';
        option.innerHTML = 'Alege casa';
        select.appendChild(option);

        var xhr = new XMLHttpRequest();
        xhr.open('GET', '../sarciniData/api/house/getAllHouses.php', false);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);

                data.forEach(e => {
                    var option = document.createElement('option');
                    option.value = e.id;
                    option.innerHTML = e.name;
                    select.appendChild(option);
                });
            }
        }
        xhr.send();

        select = document.createElement('select');
        select.id = 'rooms';
        select.style.marginTop = '1rem';
        col.appendChild(select);

        var option = document.createElement('option');
        option.value = 'N/A';
        option.innerHTML = 'Alege camera';
        select.appendChild(option);

        col = document.createElement('div');
        col.className = 'column';
        col.style.flex = '1';
        col.style.marginRight = '1rem';
        col.style.height = '100%';
        col.style.justifyContent = 'space-between';
        row.appendChild(col);

        span = document.createElement('span');
        span.innerHTML = 'Task';
        span.style.fontWeight = 'bold';
        span.style.fontSize = '1.5rem';
        span.style.color = 'var(--primary-color)';
        col.appendChild(span);

        select = document.createElement('select');
        select.id = 'task';
        select.style.marginTop = '1rem';
        col.appendChild(select);

        option = document.createElement('option');
        option.value = 'N/A';
        option.innerHTML = 'Alege predefinit';
        select.appendChild(option);

        xhr = new XMLHttpRequest();
        xhr.open('GET', '../sarciniData/api/tasks/getPredefinedTasks.php', false);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);

                data.forEach(e => {
                    var option = document.createElement('option');
                    option.value = e.name;
                    option.innerHTML = e.name;
                    select.appendChild(option);
                });
            }
        }
        xhr.send();

        var input = document.createElement('input');
        input.id = 'customTask';
        input.type = 'text';
        input.placeholder = 'Personalizat';
        input.style.marginTop = '1rem';
        col.appendChild(input);

        col = document.createElement('div');
        col.className = 'column';
        col.style.flex = '1';
        col.style.height = '100%';
        col.style.justifyContent = 'space-between';
        col.style.marginRight = '1rem';
        row.appendChild(col);

        span = document.createElement('span');
        span.innerHTML = 'Data de incepere';
        span.style.fontWeight = 'bold';
        span.style.fontSize = '1.5rem';
        span.style.color = 'var(--primary-color)';
        col.appendChild(span);

        input = document.createElement('input');
        input.id = 'date';
        input.type = 'date';
        input.style.marginTop = '1rem';
        col.appendChild(input);

        span = document.createElement('span');
        span.innerHTML = 'Interval';
        span.style.fontWeight = 'bold';
        span.style.fontSize = '1.5rem';
        span.style.color = 'var(--primary-color)';
        span.style.marginTop = '1rem';
        col.appendChild(span);

        var row2 = document.createElement('div');
        row2.className = 'row';
        row2.style.marginTop = '1rem';
        col.appendChild(row2);

        input = document.createElement('input');
        input.id = 'X';
        input.type = 'number';
        input.min = '0';
        input.style.width = '3rem';
        row2.appendChild(input);

        select = document.createElement('select');
        select.id = 'interval';
        select.style.marginLeft = '0.5rem';
        row2.appendChild(select);

        option = document.createElement('option');
        option.value = '86400';
        option.innerHTML = 'Zile';
        select.appendChild(option);

        option = document.createElement('option');
        option.value = '640800';
        option.innerHTML = 'Saptamani';
        select.appendChild(option);

        option = document.createElement('option');
        option.value = '2629743';
        option.innerHTML = 'Luni';
        select.appendChild(option);

        option = document.createElement('option');
        option.value = '31556926';
        option.innerHTML = 'Ani';
        select.appendChild(option);

        col = document.createElement('div');
        col.className = 'column';
        col.style.flex = '1';
        col.style.height = '100%';
        col.style.justifyContent = 'space-between';
        row.appendChild(col);

        span = document.createElement('span');
        span.innerHTML = 'Scorul tau';
        span.style.fontWeight = 'bold';
        span.style.fontSize = '1.5rem';
        span.style.color = 'var(--primary-color)';
        col.appendChild(span);

        span = document.createElement('span');
        span.innerHTML = '0';
        span.id = 'score';
        span.style.fontWeight = 'bold';
        span.style.fontSize = '1.5rem';
        span.style.color = 'var(--primary-color)';
        span.style.marginTop = '1rem';
        col.appendChild(span);

        var xhr = new XMLHttpRequest();
        xhr.open('GET', '../sarciniData/api/tasks/getScore.php', false);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                span.innerHTML = data.score.toFixed(2);
            }
        }
        xhr.send();

        var button = document.createElement('button');
        button.innerHTML = 'Adauga';
        button.className = 'button';
        button.onclick = function () {
            Tasks.addTask();
        }
        col.appendChild(button);
    }

    static async addTask() {
        var house = document.getElementById('houses').value;
        var room = document.getElementById('rooms').value;
        var task = document.getElementById('task').value;
        var customTask = document.getElementById('customTask').value;
        var date = document.getElementById('date').value;
        var X = document.getElementById('X').value;
        var interval = document.getElementById('interval').value;

        if (house == 'N/A') {
            alert('Selectati o casa');
            return;
        }
        else {
            if (room == 'N/A') {
                room = '';
            }
        }

        if (room != '' && room != 'N/A') {
            house = '';
        }

        if (task == 'N/A') {
            if (customTask == '') {
                alert('Introduceti un task');
                return;
            }
            else {
                task = '';

                var r = window.confirm('Doriti sa adaugati task-ul personalizat?');

                if (r == true) {
                    var formData2 = new FormData();
                    formData2.append('name', customTask);

                    var xhr2 = new XMLHttpRequest();
                    xhr2.open('POST', '../sarciniData/api/tasks/addPredefinedTask.php', true);
                    xhr2.send(formData2);
                }
            }
        }
        else {
            customTask = '';
        }

        if (date == '') {
            alert('Introduceti o data');
            return;
        }

        if (X == '') {
            alert('Introduceti un interval');
            return;
        }

        if (Math.floor(Date.now(date) / 1000) < Math.floor(Date.now() / 1000)) {
            alert('Data trebuie sa fie in viitor');
            return;
        }

        var date = new Date(date);
        date.setHours(0, 0, 0, 0);
        date = Math.floor(date.getTime() / 1000);

        var formData = new FormData();
        formData.append('house', house);
        formData.append('room', room);
        formData.append('task', task);
        formData.append('customTask', customTask);
        formData.append('date', date);
        formData.append('interval', X * interval);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../sarciniData/api/tasks/addTask.php', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                if (data.success) {
                    Tasks.myTasks();
                }
            }
        }
        xhr.send(formData);
    }

    static async stats() {
        var main = document.querySelector('main');
        main.innerHTML = '';

        var p = document.createElement('div');
        p.className = 'column';
        main.appendChild(p);

        var table = document.createElement('table');
        table.style.marginTop = '2rem';
        p.appendChild(table);

        var tr = document.createElement('tr');
        table.appendChild(tr);

        var th = document.createElement('th');
        th.innerHTML = 'Istoric';
        th.colSpan = 5;
        tr.appendChild(th);

        tr = document.createElement('tr');
        table.appendChild(tr);

        th = document.createElement('th');
        th.innerHTML = 'Casa';
        tr.appendChild(th);

        th = document.createElement('th');
        th.innerHTML = 'Camera';
        tr.appendChild(th);

        th = document.createElement('th');
        th.innerHTML = 'Task';
        tr.appendChild(th);

        th = document.createElement('th');
        th.innerHTML = 'Data';
        tr.appendChild(th);

        th = document.createElement('th');
        th.innerHTML = 'Status';
        tr.appendChild(th);

        var xhr = new XMLHttpRequest();
        xhr.open('GET', '../sarciniData/api/tasks/getPastTasks.php', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);

                data.forEach(e => {
                    tr = document.createElement('tr');
                    table.appendChild(tr);

                    var td = document.createElement('td');
                    if (e.house == '' || e.house == null)
                        td.innerHTML = e.houseNameForRoom;
                    else
                        td.innerHTML = e.house;
                    tr.appendChild(td);

                    td = document.createElement('td');
                    if (e.room == '' || e.room == null)
                        td.innerHTML = 'N/A';
                    else
                        td.innerHTML = e.room;
                    tr.appendChild(td);

                    td = document.createElement('td');
                    td.innerHTML = e.name;
                    tr.appendChild(td);

                    td = document.createElement('td');
                    var date = new Date(e.time_start * 1000);
                    td.innerHTML = date.getDate().toString().padStart(2, '0') + '.' + (date.getMonth() + 1).toString().padStart(2, '0') + '.' + date.getFullYear();
                    tr.appendChild(td);

                    td = document.createElement('td');
                    tr.appendChild(td);

                    var days = e.dif / 86400;

                    if (days >= 1) {
                        td.innerHTML = 'Depasit cu ' + Math.floor(days) + ' zile';
                        td.style.color = 'red';
                    }
                    else {
                        td.innerHTML = 'La timp';
                        td.style.color = 'green';
                    }
                });
            }
        }
        xhr.send();
    }
}