async function setNav() {
    const url = 'http://localhost:5000/current_user';
    const httpResponse = await fetch(url);
    const body = await httpResponse.json();
    console.log(body)

    if(body.id) {
        // USER IS LOGGED IN
        if (body.isAdmin) {
            document.getElementById('regMech').classList.remove('d-none')
        }

        document.getElementById('loginBtn').classList.add('d-none');
        document.getElementById('logoutBtn').classList.remove('d-none');
    }
}

async function logout() {
    const url = 'http://localhost:5000/logout';
    const httpResponse = await fetch(url, {method: 'POST'});

    if (httpResponse.status == 200) {
        location.href = 'login.html'
    } else {
        alert("Could not log out")
    }
}