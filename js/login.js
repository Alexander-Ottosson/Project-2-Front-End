async function login() {
    let username = document.getElementById('usernameInput').value;
    let password = document.getElementById('passwordInput').value;
    const data = {
        "username": username,
        "password": password
    }
    const url = 'http://localhost:5000/login'
    const httpResponse = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const body = await httpResponse.json()
    if (body['status'] = 200) {
        console.log('Successfully Logged In')
        location.href='mechs.html'
    } else if (body['status'] = 403) {
        alert('Invalid Username or Password')
    } else {
        alert('Unable to Log In')
    }
};