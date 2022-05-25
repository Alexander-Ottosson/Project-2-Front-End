async function loadMech() {
    let pageUrl = new URL(location.href);
    
    mechId = pageUrl.searchParams.get("mechId");

    const url = `http://localhost:5000/mech/${mechId}`;

    const httpResponse = await fetch(url);
    const body = await httpResponse.json();

    document.getElementById('modelDisplay').innerHTML = body.model;

    document.getElementById('makeDisplay').innerHTML = body.make;

    document.getElementById('yearDisplay').innerHTML = body.year;

    document.getElementById('colorDisplay').innerHTML = body.color;

    document.getElementById('speedDisplay').innerHTML = `${body.maxSpeed} km/h`

    document.getElementById('weightDisplay').innerHTML = `${body.weight} kg`

    document.getElementById('heightDisplay').innerHTML = `${body.height} m`

    document.getElementById('descriptionDisplay').innerHTML = body.description

    const userUrl = 'http://localhost:5000/current_user';
    const userResponse = await fetch(userUrl);
    
    if (userResponse.status = 200) {
        const userBody = await userResponse.json();

        if (userBody.isAdmin) {
            console.log(body);
            document.getElementById('buttonDisplay').innerHTML = `<a href="edit_mech.html?mechId=${body.id}" class="btn btn-primary">Edit Mech</a>`;
        }
    }

}